import { SceneGamePlay } from './SceneGamePlay';
let transmitData;

export const SceneLoseScreen = new Phaser.Class({

    Extends: SceneGamePlay,
    
    initialize:    
    function SceneLoseScreen() {
        Phaser.Scene.call(this, { key: 'SceneLoseScreen' });
    },
    
    init: function (data) { transmitData = data },

    create() {
        const bg = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[7]}`),
            man = this.add.sprite(0, 0, "sprite", "man.png"),
            body = this.add.sprite(0, 0, "sprite", "body.png"),
            animationSad = this.add.sprite(0, 0, "sprite", "animationSad.png"),
            clothes = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[4]}`),
            bag = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[5]}`),
            accessory = this.add.sprite(0, 0, "sprite", `${transmitData.girlAppearance[6]}`),
            hair = this.add.sprite(0, 0, "sprite", "hair.png"),
            textBlockMan = this.add.sprite(0, 0, "sprite", "textBlockMan.png"),
            textMan = this.add.text(0, 0, `What a weird appearance!`, this.configText()),
            layer = this.add.layer(0, 0),
            button = this.add.sprite(0, 0, "sprite", "button.png"),
            arrow = this.add.sprite(0, 0, "sprite", "arrow.png"),
            textButton = this.add.text(0, 0, `Retry!`, this.configTextOverlay());
        
        button.visible = false;
        arrow.visible = false;
        animationSad.visible = false;
        textButton.visible = false;

        const placing = () => {
            this.background(bg);
            this.placingDownFinallyMan(man);
            this.placingDownFinally(body, animationSad, clothes, bag, accessory, hair);
            this.placingTextBlockMan(textBlockMan);
            this.placingCenterTextMan(textMan);
            this.placingButton(button);
            this.placingArrow(arrow);
            this.placingTextButton(textButton);
        };

        placing();

        this.scale.on('resize', placing, this);

        this.appearanceGirl(body, animationSad, clothes, bag, accessory, hair);
        this.appearanceMan(man);
        this.appearanceTextBlockMan(textBlockMan, animationSad);
        this.appearanceTextMan(textMan);

        this.theEnd(button, arrow, textButton, layer);        
    }
});