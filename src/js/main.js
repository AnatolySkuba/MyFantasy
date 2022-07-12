import {game} from '../index';

export class MyPrototypes extends Phaser.Scene {

    configText() {
        return {
            fontFamily: "Nunito Sans",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 30,
            lineHeight: 33,
            align: "center",
            letterSpacing: -0.05,
            color: "#303052"
        };
    };

    configTextOverlay() {
        return {
            fontFamily: 'Nunito Sans',
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 33,
            align: "center",
            letterSpacing: -0.05,
            color: "#FFFFFF"
        };
    };

    // add background
    background(image) {
        if (game.config.inputGamepadEventTarget.innerHeight / game.config.inputGamepadEventTarget.innerWidth > image.height / image.width) {
            image.displayHeight = game.config.inputGamepadEventTarget.innerHeight;
            image.scaleX = image.scaleY;            
        } else {
            image.displayWidth = game.config.inputGamepadEventTarget.innerWidth;
            image.scaleY = image.scaleX;
        };

        image.y = game.config.inputGamepadEventTarget.innerHeight/2;
        image.x = game.config.inputGamepadEventTarget.innerWidth/2;           
    };

    blackout(shadow) {
        shadow.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 2;
        shadow.displayWidth = game.config.inputGamepadEventTarget.innerWidth * 2; 
    };

    disappearance(image, delay) {
        this.tweens.add({
            targets: image,
            alpha: 0,
            delay: delay,
            duration: 200
        });
    };

    // add body
    placingDown(...args) {
        args.forEach(arg => {
            arg.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.95;
            arg.scaleX = arg.scaleY;
            arg.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, game.config.inputKeyboardEventTarget.innerHeight - arg.displayHeight / 2);
        });
    };

    moveDown(...args) {
        args.forEach(arg => {
            arg.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.95;
            arg.displayWidth = game.config.inputGamepadEventTarget.innerHeight * 0.63828125;
            arg.y = game.config.inputKeyboardEventTarget.innerHeight - arg.displayHeight / 2;

            this.tweens.add({
                targets: arg,
                displayHeight: game.config.inputGamepadEventTarget.innerHeight * 1.07,
                displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.714875,
                y: game.config.inputKeyboardEventTarget.innerHeight - arg.displayHeight / 2.7,
                duration: 100
            });
        });
    };

    placingDownMore(args) {
        args.forEach(arg => {
            arg.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 1.07;
            arg.scaleX = arg.scaleY;
            arg.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, game.config.inputKeyboardEventTarget.innerHeight - arg.displayHeight / 3.132);
        });
    };

    // add icons
    placingDownRightIcon(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.27;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 1.8, game.config.inputKeyboardEventTarget.innerHeight - image.displayHeight / 1.5);            
    };

    placingDownLeftIcon(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.27;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 1.8, game.config.inputKeyboardEventTarget.innerHeight - image.displayHeight / 1.5);            
    };

    appearanceIcon(image, delay) {
        image.displayWidth = 0;
        image.displayHeight = 0;

        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.27,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.236842105,
            delay: delay,
            duration: 100
        });
    };

    touchIcon(image, icon2) {
        this.tweens.add({
                targets: image,
                displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.25,
                displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.219298245,
                duration: 150
        });

        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.27,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.236842105,
            delay: 150,
            duration: 150
        });

        this.tweens.add({
            targets: image,
            displayHeight: 0,
            displayWidth: 0,
            delay: 400,
            duration: 100
        });

        this.tweens.add({
            targets: icon2,
            displayHeight: 0,
            displayWidth: 0,
            delay: 400,
            duration: 100
        });
    };

    // add icon light
    appearanceIconLight(image) {
        image.displayWidth = game.config.inputGamepadEventTarget.innerHeight * 0.236842105;
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.27;

        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.3564,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.312631579,
            duration: 100
        });
    };

    disappearanceIconLight(image) {
        image.displayWidth = game.config.inputGamepadEventTarget.innerHeight * 0.312631579;
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.3564;

        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.27,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.236842105,
            duration: 10
        });
    };

    // add hand pointer
    placingHandPointer(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.27;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 3, game.config.inputKeyboardEventTarget.innerHeight - image.displayHeight / 3.5);            
    };

    moveUpHandPointer(image) {
        image.y = game.config.inputGamepadEventTarget.innerHeight + image.displayHeight / 2.5;

        this.tweens.add({        
            targets: image,
            y: game.config.inputGamepadEventTarget.innerHeight - image.displayHeight / 3.5,
            duration: 150,
            delay: 2000,
            onComplete: movingHandPointer.call(this, image),
            onCompleteParams: [ image ]
        });
    };

    moveDownHandPointer(image) {
        image.y = game.config.inputGamepadEventTarget.innerHeight - image.displayHeight / 3.5;

        this.tweens.add({
            targets: image,
            y: game.config.inputGamepadEventTarget.innerHeight + image.displayHeight / 2.5,
            duration: 150
        });

        tween.stop()
    };

    // add rectangle progress
    placingRectangleProgress(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.01;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, image.displayHeight * 4.7);            
    };

    appearance(image) {
        image.alpha = 0;

        this.tweens.add({
            targets: image,
            alpha: 1,
            duration: 200
        });
    };

    // add rectangle overlay
    placingRectangleOverlay(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.047;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, image.displayHeight);            
    };

    moveDownRectangleOverlay(image) {
        image.y = -image.displayHeight;

        this.tweens.add({
            targets: image,
            y: image.displayHeight,
            delay: 2000,
            duration: 100
        });
    };

    moveUpRectangleOverlay(image) {        
        const moveUpRectangleOverlayCheck = (image) => {
            if (image.y === image.displayHeight) {
                image.y = image.displayHeight;

                this.tweens.add({
                    targets: image,
                    y: -image.displayHeight,
                    duration: 100
                });
            } else {
                this.time.addEvent({ delay: 100, callback: () => { moveUpRectangleOverlayCheck.call(this, image) } });
            };
        };

        moveUpRectangleOverlayCheck(image);
    };

    // add text overlay
    placingTextOverlay(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.03;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 2, image.displayHeight * 1.1);
    };

    moveDownTextOverlay(image) {
        image.y = -image.displayHeight;

        this.tweens.add({
            targets: image,
            y: image.displayHeight * 1.1,
            delay: 2000,
            duration: 100
        });
    };

    moveUpTextOverlay(image) {
        const moveUpTextOverlayCheck = (image) => {
            if (image.y === image.displayHeight * 1.1) {
                image.y = image.displayHeight * 1.1;

                this.tweens.add({
                    targets: image,
                    y: -image.displayHeight,
                    duration: 100
                });
            } else {
                this.time.addEvent({ delay: 100, callback: () => { moveUpTextOverlayCheck.call(this, image) } });
            };
        };

        moveUpTextOverlayCheck(image);
    };

    // add text block
    placingTextBlock(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.17;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 2.1);
    };

    appearanceTextBlock(image) {
        image.displayWidth = 0;
        image.displayHeight = 0;
            
        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.17,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.51548387,
            duration: 100
        });
    };

    disappearanceCenter(image) {
        this.tweens.add({
            targets: image,
            displayWidth: 0,
            displayHeight: 0,
            duration: 100
        });
    };
    
    // add text center
    placingCenterText(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.08;
        image.scaleX = image.scaleY;        
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 2.2);
    };

    appearanceText(image) {
        image.displayWidth = 0;
        image.displayHeight = 0;

        this.tweens.add({
            targets: image,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.08,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.336,
            duration: 100
        });
    };

    // add animation
    eventAnimation(animation) {
        let x = 0;  
        const intervalID = setInterval(() => {  
            if (++x === 6) {
                window.clearInterval(intervalID);
            };
            animation.visible ? animation.visible = false : animation.visible = true;
        }, 125);
    };

    // choice next scene
    placeChosen(transmitData, place) {
        const girlAppearance = transmitData.girlAppearance.map(el => el.frame.name);
        girlAppearance.push(`${place}.jpg`);

        (girlAppearance[4] === "dress.png") ?
        this.time.addEvent({ delay: 500, callback: () => { this.scene.start("SceneAmazingScreen", { girlAppearance }) } }) :
        this.time.addEvent({ delay: 500, callback: () => { this.scene.start("SceneLoseScreen", { girlAppearance }) } });
    };

    accessoryChosen(transmitData, accessoryOption, container, layer) {
        const accessory = this.add.sprite(-363, 0, "sprite", `${accessoryOption}.png`),
            progress3 = this.add.sprite(0, -12, "sprite", "progress3.jpg"),
            textOverlayPlace = this.add.text(0, -25, `Choose your place`, this.configTextOverlay()),
            rectangleNightClub = this.physics.add.sprite(0, -138, "sprite", "rectangleNightClub.png").setInteractive().setDebug(false),
            rectangleClub = this.physics.add.sprite(0, -138, "sprite", "rectangleClub.png").setInteractive().setDebug(false);
        container.add(accessory);
        layer.add([rectangleNightClub, rectangleClub]);
        transmitData.girlAppearance.push(accessory);
        transmitData.progress = progress3;
        transmitData.textOverlay = textOverlayPlace;
        transmitData.rectangleLeft = rectangleNightClub;
        transmitData.rectangleRight = rectangleClub;
    };

    bagChosen(transmitData, bagOption, rectangleOption, container, layer) {
        const bag = this.add.sprite(-363, 0, "sprite", `${bagOption}.png`),
            progress2 = this.add.sprite(0, -12, "sprite", "progress2.jpg"),
            textOverlayAccessory = this.add.text(0, -25, `Choose your accessory`, this.configTextOverlay()),
            rectangleSunglasses = this.physics.add.sprite(0, -138, "sprite", "rectangleSunglasses.png").setInteractive().setDebug(false),
            rectangleRight = this.physics.add.sprite(0, -138, "sprite", `${rectangleOption}.png`).setInteractive().setDebug(false);
        container.add(bag);
        layer.add([rectangleSunglasses, rectangleRight]);
        transmitData.girlAppearance.push(bag);
        transmitData.progress = progress2;
        transmitData.textOverlay = textOverlayAccessory;
        transmitData.rectangleLeft = rectangleSunglasses;
        transmitData.rectangleRight = rectangleRight;
    };

    // finally scenes
    placingDownFinally(...args) {
        args.forEach(arg => {
            arg.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.9;
            arg.scaleX = arg.scaleY;
            arg.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - arg.displayWidth / 5, game.config.inputKeyboardEventTarget.innerHeight - arg.displayHeight / 2.5);
        });
    };

    appearanceGirl(...args) {
        args.forEach(arg => {
            arg.x = game.config.inputGamepadEventTarget.innerWidth / 2 - arg.displayWidth / 1.2;
            
            this.tweens.add({
                targets: arg,
                x: game.config.inputGamepadEventTarget.innerWidth / 2 - arg.displayWidth / 5,
                duration: 100
            });
        });
    };
    
    placingDownFinallyMan(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.9;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 4.3, game.config.inputKeyboardEventTarget.innerHeight - image.displayHeight / 2.05);
    };

    appearanceMan(image) {
        image.x = game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 1.2;
    
        this.tweens.add({
            targets: image,
            x: game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 4.3,
            duration: 100
        });
    };

    placingTextBlockMan(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.15;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 2);
    };

    appearanceTextBlockMan(image, animation) {
        image.x = game.config.inputGamepadEventTarget.innerWidth / 1.1;
        image.displayWidth = 0;
        image.displayHeight = 0;
    
        this.tweens.add({
            targets: image,
            x: game.config.inputGamepadEventTarget.innerWidth / 2,
            displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.15,
            displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.459677419,
            delay: 200,
            duration: 100,
            onComplete: () => { animation.visible = true; }
        });
    };

    placingCenterTextMan(image) {
        if (image._text === "You are beautiful!❤️") {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.05;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 2.03);
        } else {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.038;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayHeight * 4.7, game.config.inputKeyboardEventTarget.innerHeight / 2);
        }
    };

    appearanceTextMan(image) {
        if (image._text === "You are beautiful!❤️") {
            const widthTextManRight = game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 2;
            image.x = game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 2;
            image.displayWidth = 0;
            image.displayHeight = 0;
        
            this.tweens.add({
                targets: image,
                displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.05,
                displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.4,
                x: widthTextManRight,
                delay: 200,
                duration: 100
            })
        } else {
            const widthTextManRight = game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayHeight * 4.7;
            image.x = game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth / 2;
            image.displayWidth = 0;
            image.displayHeight = 0;
        
            this.tweens.add({
                targets: image,
                displayHeight: game.config.inputGamepadEventTarget.innerHeight * 0.038,
                displayWidth: game.config.inputGamepadEventTarget.innerHeight * 0.37,
                x: widthTextManRight,
                delay: 200,
                duration: 100
            })
        };
    };

    placingButton(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.09;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 1.1);
    };

    placingArrow(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.09;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayHeight * 1.8, game.config.inputKeyboardEventTarget.innerHeight / 1.1);
        
        this.tweens.add({
            targets: image,
            ease: 'Circular',
            x: game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayHeight * 1.8,
            loop: -1,
            duration: 1000
        });
    };

    placingTextButton(image) {
        image.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 0.06;
        image.scaleX = image.scaleY;
        image.setPosition(game.config.inputGamepadEventTarget.innerWidth / 2 - image.displayWidth / 2, game.config.inputKeyboardEventTarget.innerHeight / 1.1 - image.displayHeight / 2);
    };

    theEnd(button, arrow, textButton, layer) {        
        this.time.addEvent({
            delay: 2000, callback: () => {
            const backgroundBlackout = this.add.sprite(0, 0, "sprite", "backgroundOverlay.png").setSize(200, 200);
            backgroundBlackout.displayHeight = game.config.inputGamepadEventTarget.innerHeight * 2;
            backgroundBlackout.displayWidth = game.config.inputGamepadEventTarget.innerWidth * 2; 
            layer.add(backgroundBlackout);
            button.visible = true;
            arrow.visible = true;
            textButton.visible = true;
            this.input.on('pointerdown', () => { window.location.href = 'https://apps.apple.com/us/app/id1491717191' });
            }
        });
    };
};

let tween;

function movingHandPointer(image) {
    tween = this.tweens.add({
        targets: image,
        x: game.config.inputGamepadEventTarget.innerWidth / 2 + image.displayWidth * 0.9,
        ease: 'Linear',
        delay: 2300,
        yoyo: true,
        duration: 300,
        repeat: -1,
    });
};