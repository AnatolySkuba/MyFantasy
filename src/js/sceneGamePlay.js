import { SceneTutorial } from './sceneTutorial';
let transmitClothes;

export const SceneGamePlay = new Phaser.Class({

Extends: SceneTutorial,
    
    initialize:
    function SceneGamePlay () {
        Phaser.Scene.call(this, { key: 'SceneGamePlay' });
    },
    
    init: function (data) { transmitClothes = data },
 
    create() {        
        const bg = this.add.sprite(0, 0, "sprite", "background.jpg"),
            body = this.add.sprite(-363, 0, "sprite", "body.png"),
            animationShy = this.add.sprite(-363, 0, "sprite", "animationShy.png"),
            animationJoy = this.add.sprite(-363, 0, "sprite", "animationJoy.png"),
            dress = this.add.sprite(-363, 0, "sprite", "dress.png"),
            costume = this.add.sprite(-363, 0, "sprite", "costume.png"),
            container = this.add.container(0, 0),
            hair = this.add.sprite(-363, 0, "sprite", "hair.png"),
            rectangleOverlay = this.add.sprite(0, 0, "sprite", "rectangleOverlay.png"),
            progress1 = this.add.sprite(0, -12, "sprite", "progress1.jpg"),
            rectangleLightRight = this.physics.add.sprite(0, 0, "sprite", "rectangleLight.png").setDebug(false),
            rectangleLightLeft = this.physics.add.sprite(0, 0, "sprite", "rectangleLight.png").setDebug(false),
            layer = this.add.layer(0, 0),
            rectangleBag = this.physics.add.sprite(0, -138, "sprite", "rectangleBag.png").setInteractive().setDebug(false),
            rectangleBagBlue = this.physics.add.sprite(0, -138, "sprite", "rectangleBagBlue.png").setInteractive().setDebug(false),
            handPointer = this.physics.add.sprite(0, 0, "sprite", "hand.png"),
            textOverlayBag = this.add.text(0, -25, `Choose your bag`, this.configTextOverlay());

        const main = (transmitData) => {

            animationJoy.visible = false;
            animationShy.visible = false;
            
            const placing = () => {
                this.background(bg);
                this.placingDownMore(transmitData.girlAppearance);
                this.placingRectangleProgress(transmitData.progress);
                this.placingRectangleOverlay(rectangleOverlay);
                this.placingTextOverlay(transmitData.textOverlay);
                this.placingDownRightIcon(rectangleLightRight);
                this.placingDownRightIcon(transmitData.rectangleRight);
                this.placingDownLeftIcon(rectangleLightLeft);
                this.placingDownLeftIcon(transmitData.rectangleLeft);
                this.placingHandPointer(handPointer);
            };

            placing();

            this.scale.on('resize', placing, this);
        
            this.appearance(transmitData.progress);
            this.disappearance(transmitData.progress, 1500);
            this.moveDownRectangleOverlay(rectangleOverlay);
            this.moveDownTextOverlay(transmitData.textOverlay);
            this.moveUpHandPointer(handPointer);
            this.appearanceIcon(transmitData.rectangleLeft, 0);
            this.appearanceIcon(transmitData.rectangleRight, 100);
            this.appearanceIcon(rectangleLightRight, 100);
            this.appearanceIcon(rectangleLightLeft, 0);
            handPointer.setSize(1, 1).setOffset(0);

            this.time.addEvent({ delay: 2000, callback: () => { animationShy.visible = true } });

            this.physics.add.overlap(handPointer, transmitData.rectangleLeft, () => {
                rectangleLightLeft.visible = true;
                this.appearanceIconLight(rectangleLightRight);
                this.disappearanceIconLight(rectangleLightLeft);
            });
            this.physics.add.overlap(handPointer, transmitData.rectangleRight, () => {
                rectangleLightRight.visible = true;
                this.appearanceIconLight(rectangleLightLeft);
                this.disappearanceIconLight(rectangleLightRight);
            });

            transmitData.rectangleLeft.on('pointerdown', () => {
                this.touchIcon(transmitData.rectangleLeft, transmitData.rectangleRight);
                rectangleLightRight.visible = false;
                rectangleLightLeft.visible = false;
                this.moveDownHandPointer(handPointer);
                this.moveUpRectangleOverlay(rectangleOverlay);
                this.moveUpTextOverlay(transmitData.textOverlay);
                animationJoy.visible = true;
                
                if (transmitData.rectangleLeft.frame.name === "rectangleNightClub.png") {
                    this.placeChosen(transmitData, 'nightClub');
                } if (transmitData.rectangleLeft.frame.name === "rectangleSunglasses.png") {
                    this.accessoryChosen(transmitData, 'sunglasses', container, layer);
                } if ((transmitClothes.clothes === 'dress') && (transmitData.rectangleLeft.frame.name === "rectangleBag.png")) {
                    this.bagChosen(transmitData, 'bag', 'rectangleChoker', container, layer);
                } if ((transmitClothes.clothes === 'costume') && (transmitData.rectangleLeft.frame.name === "rectangleBag.png")) {
                    this.bagChosen(transmitData, 'bag', 'rectangleNecklace', container, layer);
                };

                this.time.addEvent({ delay: 500, callback: () => { main(transmitData) } });
            });

            transmitData.rectangleRight.on('pointerdown', () => {
                this.touchIcon(transmitData.rectangleRight, transmitData.rectangleLeft);
                rectangleLightRight.visible = false;
                rectangleLightLeft.visible = false;
                this.moveDownHandPointer(handPointer);
                this.moveUpRectangleOverlay(rectangleOverlay);
                this.moveUpTextOverlay(transmitData.textOverlay);
                animationJoy.visible = true;

                if (transmitData.rectangleRight.frame.name === "rectangleClub.png") {
                    this.placeChosen(transmitData, 'club');
                } if (transmitData.rectangleRight.frame.name === "rectangleNecklace.png") {
                    this.accessoryChosen(transmitData, 'necklace', container, layer);
                } if (transmitData.rectangleRight.frame.name === "rectangleChoker.png") {
                    this.accessoryChosen(transmitData, 'choker', container, layer);
                } if ((transmitClothes.clothes === 'dress') && (transmitData.rectangleRight.frame.name === "rectangleBagBlue.png")) {
                    this.bagChosen(transmitData, 'bagBlue', 'rectangleChoker', container, layer);
                } if ((transmitClothes.clothes === 'costume') && (transmitData.rectangleRight.frame.name === "rectangleBagBlue.png")) {
                    this.bagChosen(transmitData, 'bagBlue', 'rectangleNecklace', container, layer);
                };
                    
                this.time.addEvent({ delay: 500, callback: () => { main(transmitData) } });
            });

        };

        const transmitData = {
            girlAppearance: [body, animationShy, animationJoy, hair],
            progress: progress1,
            textOverlay: textOverlayBag,
            rectangleLeft: rectangleBag,
            rectangleRight: rectangleBagBlue,
        };

        (transmitClothes.clothes === 'dress') && transmitData.girlAppearance.push(dress);
        (transmitClothes.clothes === 'costume') && transmitData.girlAppearance.push(costume);

        main(transmitData);  
    }
})