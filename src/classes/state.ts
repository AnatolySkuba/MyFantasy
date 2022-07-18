import { Physics } from "phaser";

export class State extends Physics.Arcade.Sprite {
	private static girlState: Phaser.GameObjects.Sprite[] = [];
	private static girlTextures: string[];
	protected static girlOptions: GirlOptions;
	protected static girlEmotions: string[];
	protected static girlOptionsCurrent: string[] = [];
	protected static newgirlOptions: string[] = [];
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "");
	}

	protected setGirlState(newGirlState: Phaser.GameObjects.Sprite[]): void {
		State.girlState = newGirlState;
	}

	protected pushGirlState(newState: Phaser.GameObjects.Sprite): void {
		State.girlState.push(newState);
	}

	protected removeGirlState(): void {
		State.girlTextures = [];
		State.girlState.map(girlTexture => {
			State.girlTextures.push(girlTexture.frame.name.slice(0, -4));
			girlTexture.visible = false;
		});
		State.girlState = [];
	}

	protected animation(animation: string): void {
		State.girlState.map(girlTexture => {
			if (girlTexture.frame.name === `${animation}.png`) {
				girlTexture.setVisible(true);
			}
		});
	}

	public getGirlState(): Phaser.GameObjects.Sprite[] {
		return State.girlState;
	}

	public getGirlTextures(): string[] {
		return State.girlTextures;
	}
}

export type GirlOptions = (string | (string | (string | (string | string[])[])[])[])[];
