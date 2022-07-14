import { Scene, GameObjects } from "phaser";
import { Background, Girl } from "../../classes";

export class Intro extends Scene {
	private background!: GameObjects.Image;
	private girl!: GameObjects.Image;
	constructor() {
		super("intro-scene");
	}
	create(): void {
		this.background = new Background(this, "background");
		const girl = new Girl(this);
		girl.placing(this, ["body", "tShirt", "hair"]);
	}
}
