import { Physics } from "phaser";

export class Background extends Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene, texture: string) {
		super(scene, 0, 0, "");
		const background = scene.add.sprite(0, 0, "sprite", `${texture}.jpg`);
		const placing = () => {
			if (window.innerHeight / window.innerWidth > background.height / background.width) {
				background.displayHeight = window.innerHeight;
				background.scaleX = background.scaleY;
			} else {
				background.displayWidth = window.innerWidth;
				background.scaleY = background.scaleX;
			}

			background.y = window.innerHeight / 2;
			background.x = window.innerWidth / 2;
		};
		placing();
		scene.scale.on("resize", placing, this);
	}
}
