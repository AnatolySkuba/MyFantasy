import { Scene } from "phaser";

export class LoadingScene extends Scene {
	constructor() {
		super("loading-scene");
	}
	preload(): void {
		// if (window.innerHeight > 768) {
		// 	this.load.atlas("sprite", "/MyFantasy/assets/spriteDesktop.png", "/MyFantasy/assets/spriteDesktop.json");
		// } else {
		// 	this.load.atlas("sprite", "/MyFantasy/assets/spriteMobile.png", "/MyFantasy/assets/spriteMobile.json");
		// }
		if (window.innerHeight > 768) {
			this.load.atlas("sprite", "/assets/spriteDesktop.png", "/assets/spriteDesktop.json");
		} else {
			this.load.atlas("sprite", "/assets/spriteMobile.png", "/assets/spriteMobile.json");
		}
	}
	create(): void {
		this.scene.start("intro-scene");
	}
}
