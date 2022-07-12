import { SceneGamePlay } from './SceneGamePlay';
let transmitData;

export const SceneAmazingScreen = new Phaser.Class({

    Extends: SceneGamePlay,
    
    initialize:    
    function SceneAmazingScreen() {
        Phaser.Scene.call(this, { key: 'SceneAmazingScreen' });
    },

    init: function (data) { transmitData = data },

    create() {
        const bg = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[7]}`),
            man = this.add.sprite(0, 0, "sprite", "man.png"),
            body = this.add.sprite(0, 0, "sprite", "body.png"),
            animationJoy = this.add.sprite(0, 0, "sprite", "animationJoy.png"),
            clothes = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[4]}`),
            bag = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[5]}`),
            accessory = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[6]}`),
            hair = this.add.sprite(0, 0, "sprite", "hair.png"),
            textBlockMan = this.add.sprite(0, 0, "sprite", "textBlockMan.png"),
            textMan = this.add.text(0, 0, `You are beautiful!❤️`, this.configText()),
            layer = this.add.layer(0, 0),
            button = this.add.sprite(0, 0, "sprite", "button.png"),
            arrow = this.add.sprite(0, 0, "sprite", "arrow.png"),
            textButton = this.add.text(0, 0, `Swipe to play!`, this.configTextOverlay());
        
        textButton.visible = false;
        animationJoy.visible = false;
        button.visible = false;
        arrow.visible = false;

        const placing = () => {
            this.background(bg);
            this.placingDownFinallyMan(man);
            this.placingDownFinally(body, animationJoy, clothes, bag, accessory, hair);
            this.placingTextBlockMan(textBlockMan);
            this.placingCenterTextMan(textMan);
            this.placingButton(button);
            this.placingArrow(arrow);
            this.placingTextButton(textButton);
        };

        placing();

        this.scale.on('resize', placing, this);

        this.appearanceGirl(body, animationJoy, clothes, bag, accessory, hair);
        this.appearanceMan(man);
        this.appearanceTextBlockMan(textBlockMan, animationJoy);
        this.appearanceTextMan(textMan);

        this.theEnd(button, arrow, textButton, layer);
    }
});