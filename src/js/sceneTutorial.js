import { SceneIntro } from './sceneIntro';

export const SceneTutorial = new Phaser.Class({

    Extends: SceneIntro,
    
    initialize:    
    function SceneTutorial() {
        Phaser.Scene.call(this, { key: 'SceneTutorial' });
    },
    
    create() {
        const bg = this.add.sprite(0, 0, "sprite", "background.jpg"),
            backgroundBlackout = this.add.sprite(0, 0, "sprite", "backgroundOverlay.png"),
            body = this.add.sprite(0, 0, "sprite", "body.png"),
            animationShy = this.add.sprite(0, 0, "sprite", "animationShy.png"),        
            animationJoy = this.add.sprite(0, 0, "sprite", "animationJoy.png"),        
            tShirt = this.add.sprite(0, 0, "sprite", "tShirt.png"),
            hair = this.add.sprite(0, 0, "sprite", "hair.png"),
            textBlock = this.add.sprite(0, 0, "sprite", "textBlock.png"),
            text = this.add.text(0, 0, `I received an invitation\nto the party!`, this.configText()),
            rectangleOverlay = this.add.sprite(0, 0, "sprite", "rectangleOverlay.png"),
            progress0 = this.add.sprite(0, 0, "sprite", "progress0.jpg"),
            textOverlay = this.add.text(0, 0, `Choose your appearance`, this.configTextOverlay()),
            rectangleLightRight = this.physics.add.sprite(0, 0, "sprite", "rectangleLight.png").setDebug(false),
            rectangleLightLeft = this.physics.add.sprite(0, 0, "sprite", "rectangleLight.png").setDebug(false),
            rectangleDress = this.physics.add.sprite(0, 0, "sprite", "rectangleDress.png").setInteractive().setDebug(false),
            rectangleCostume = this.physics.add.sprite(0, 0, "sprite", "rectangleCostume.png").setInteractive().setDebug(false),
            handPointer = this.physics.add.sprite(0, 0, "sprite", "hand.png");
        
        animationShy.visible = false;
        animationJoy.visible = false;
                    
        const placing = () => {
            this.background(bg);
            this.blackout(backgroundBlackout)
            this.placingDownMore([body, animationShy, animationJoy, tShirt, hair]);
            this.placingRectangleProgress(progress0);
            this.placingRectangleOverlay(rectangleOverlay);
            this.placingTextOverlay(textOverlay);
            this.placingDownRightIcon(rectangleLightRight);
            this.placingDownRightIcon(rectangleDress);
            this.placingDownLeftIcon(rectangleLightLeft);
            this.placingDownLeftIcon(rectangleCostume);
            this.placingHandPointer(handPointer);
        };

        placing();

        this.scale.on('resize', placing, this);
        
        this.placingTextBlock(textBlock);
        this.placingCenterText(text);
        this.disappearanceCenter(textBlock, 0);
        this.disappearanceCenter(text, 0);

        this.moveDown(body, animationShy, animationJoy, tShirt, hair);
        this.appearance(progress0);
        this.disappearance(progress0, 1500);
        this.moveDownRectangleOverlay(rectangleOverlay);
        this.moveDownTextOverlay(textOverlay);
        this.moveUpHandPointer(handPointer);
        handPointer.setSize(1, 1).setOffset(0);
        this.appearanceIcon(rectangleDress, 100);
        this.appearanceIcon(rectangleCostume, 0);
        this.appearanceIcon(rectangleLightRight, 100);
        this.appearanceIcon(rectangleLightLeft, 0);
        this.disappearance(backgroundBlackout, 0);

        this.time.addEvent({ delay: 2000, callback: () => { animationShy.visible = true } });

        this.physics.add.overlap(handPointer, rectangleCostume, () => {
            this.appearanceIconLight(rectangleLightRight);
            this.disappearanceIconLight(rectangleLightLeft);
        });

        this.physics.add.overlap(handPointer, rectangleDress, () => {
            this.appearanceIconLight(rectangleLightLeft);
            this.disappearanceIconLight(rectangleLightRight);
        });

        rectangleCostume.on('pointerdown', () => {
            this.touchIcon(rectangleCostume, rectangleDress);
            rectangleLightRight.visible = false;
            rectangleLightLeft.visible = false;
            this.moveDownHandPointer(handPointer);
            this.moveUpRectangleOverlay(rectangleOverlay);
            this.moveUpTextOverlay(textOverlay);
            animationJoy.visible = true;

            this.time.addEvent({ delay: 500, callback: () => { this.scene.start("SceneGamePlay", {clothes: "costume"}) } });
        });

        rectangleDress.on('pointerdown', () => {
            this.touchIcon(rectangleDress, rectangleCostume);
            rectangleLightRight.visible = false;
            rectangleLightLeft.visible = false;
            this.moveDownHandPointer(handPointer);
            this.moveUpRectangleOverlay(rectangleOverlay);
            this.moveUpTextOverlay(textOverlay);
            animationJoy.visible = true;

            this.time.addEvent({ delay: 500, callback: () => { this.scene.start("SceneGamePlay", {clothes: "dress"}) } });
        });
    }
});