import spriteDesktop from '../assets/spriteDesktop.json';
import spriteMobile from '../assets/spriteMobile.json';
import imgMobile from '../assets/spriteMobile.png';
import imgDesktop from '../assets/spriteDesktop.png';
import { game } from '../index';
import { MyPrototypes } from './main';

export const SceneIntro = new Phaser.Class({

    Extends: MyPrototypes,
    
    initialize:    
    function SceneIntro() {
        Phaser.Scene.call(this, { key: 'SceneIntro' });
    },

    preload() {
        if (game.config.inputGamepadEventTarget.outerHeight > 768) {
            this.load.atlas("sprite", imgDesktop, spriteDesktop);
            } else {
            this.load.atlas("sprite", imgMobile, spriteMobile);  
        };
    },

    create() {
        const bg = this.add.sprite(0, 0, "sprite", "background.jpg"),
            backgroundBlackout = this.add.sprite(0, 0, "sprite", "backgroundOverlay.png"),
            body = this.add.sprite(0, 0, "sprite", "body.png"),
            animationSurprised = this.add.sprite(0, 0, "sprite", "animationSurprised.png"),
            animationJoy = this.add.sprite(0, 0, "sprite", "animationJoy.png"),
            tShirt = this.add.sprite(0, 0, "sprite", "tShirt.png"),
            hair = this.add.sprite(0, 0, "sprite", "hair.png"),
            textBlock = this.add.sprite(0, 0, "sprite", "textBlock.png"), 
            text = this.add.text(0, 0, `I received an invitation\nto the party!`, this.configText());
        
        animationSurprised.visible = false;
        animationJoy.visible = false;

        const placing = () => {
            this.background(bg);
            this.blackout(backgroundBlackout);
            this.placingDown(body, animationSurprised, animationJoy, tShirt, hair);
            this.placingTextBlock(textBlock);
            this.placingCenterText(text);            
        };

        placing();
        
        this.scale.on('resize', placing, this);  
        
        this.appearanceTextBlock(textBlock);
        this.appearanceText(text);
        this.eventAnimation(animationSurprised)

        this.time.addEvent({ delay: 750, callback: () => {
            text.text = ' I need to prepare my\nappearance';
            this.eventAnimation(animationJoy);
        } });
    
        this.time.addEvent({ delay: 1500, callback: () => {
            this.scene.start("SceneTutorial")
        } });
    }
});