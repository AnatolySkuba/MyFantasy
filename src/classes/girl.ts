import { Physics } from "phaser";

export class Girl extends Physics.Arcade.Sprite {
	// textures: string[];
	// scene: Phaser.Scene;
	newGirl: Phaser.GameObjects.Sprite[] = [];

	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "");
		// this.textures = textures;
		// this.scene = scene;
	}

	public placing(scene: Phaser.Scene, textures: string[]): void {
		textures.map(texture => {
			const girl = scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			this.newGirl?.push(girl);
			const placing = () => {
				girl.displayHeight = window.innerHeight * 0.95;
				girl.scaleX = girl.scaleY;
				girl.setPosition(window.innerWidth / 2, window.innerHeight - girl.displayHeight / 2);
			};
			placing();
			scene.scale.on("resize", placing, this);
		});

		scene.time.addEvent({
			delay: 1500,
			callback: () => this.moveLover(scene),
		});
	}

	private moveLover(scene: Phaser.Scene): void {
		this.newGirl.map(girl => {
			scene.tweens.add({
				targets: girl,
				displayHeight: window.innerHeight * 1.07,
				displayWidth: window.innerHeight * 0.714875,
				y: window.innerHeight - girl.displayHeight / 2.7,
				duration: 100,
				onComplete: () => this.placingLower(),
			});
		});
	}

	private placingLower(): void {
		this.newGirl.map(girl => {
			const placing = () => {
				girl.displayHeight = window.innerHeight * 1.07;
				girl.scaleX = girl.scaleY;
				girl.setPosition(window.innerWidth / 2, window.innerHeight - girl.displayHeight / 3.132);
			};
			placing();
			this.scene.scale.on("resize", placing, this);
		});
	}
}
