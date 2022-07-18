import { Physics } from "phaser";

export class State extends Physics.Arcade.Sprite {
	protected static girlOptionsSprite: Phaser.GameObjects.Sprite[] = [];
	protected static girlOptionsPrevious: string[];
	protected static girlOptions: GirlOptions;
	protected static girlOptionsCurrent: string[] = [];
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "");
	}

	protected pushGirlOptionsSprite(girlOptionSprite: Phaser.GameObjects.Sprite): void {
		State.girlOptionsSprite.push(girlOptionSprite);
	}

	protected removeGirlOptions(): void {
		State.girlOptionsPrevious = [];
		State.girlOptionsSprite.map(girlTexture => {
			State.girlOptionsPrevious.push(girlTexture.frame.name.slice(0, -4));
			girlTexture.visible = false;
		});
		State.girlOptionsSprite = [];
	}
}

export type GirlOptions = (string | (string | (string | (string | string[])[])[])[])[];
