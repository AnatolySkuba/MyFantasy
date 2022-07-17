import { Scene, GameObjects } from "phaser";
import { Background, Girl, TextBlock, Tooltip, Progress, Options } from "../classes";

export class Main extends Scene {
	private background: Background;
	private girl: Girl;
	private tooltip: Tooltip;
	private progress: Progress;
	private options: Options;
	constructor() {
		super("intro-scene");
	}
	create(): void {
		this.background = new Background(this);
		this.girl = new Girl(this);
		const textBlok = new TextBlock(this);
		this.tooltip = new Tooltip(this);
		this.progress = new Progress(this);
		this.options = new Options(this, this.clickHandler);

		this.background.place("background");
		this.girl.placeFirst(["body", "animationSurprised", "animationShy", "animationJoy", "tShirt", "hair"]);
		textBlok.start();
		this.progress.place(["progress0", "progress1", "progress2", "progress3"]);
		this.tooltip.place(["Choose your appearance", "Choose your bag", "Choose your accessory", "Choose your place"]);
		this.options.place(["optionCostume", "optionDress"]);

		const girlOptions = {
			Dress: {
				Bag: { Sunglasses: ["Club", "NightClub"], Choker: ["Club", "NightClub"] },
				BagBlue: { Sunglasses: ["Club", "NightClub"], Choker: ["Club", "NightClub"] },
			},
			Costume: {
				Bag: { Sunglasses: ["Club", "NightClub"], Necklace: ["Club", "NightClub"] },
				BagBlue: { Sunglasses: ["Club", "NightClub"], Necklace: ["Club", "NightClub"] },
			},
		};
	}

	public clickHandler = (textureOn: string, textures: string[]): void => {
		["Club", "NightClub"].includes(textureOn) && this.background.place(textureOn);
		this.tooltip.hideTooltip();
		this.girl.placeNext(textures, textureOn);
		["Club", "NightClub"].includes(textureOn)
			? this.background.button()
			: this.progress.placeNext() && this.tooltip.placeNext();

		if (textures.includes("tShirt")) {
			this.options.place(["optionBag", "optionBagBlue"]);
		}

		if (textures.includes("Dress")) {
			if (["Sunglasses", "Choker"].includes(textureOn)) {
				this.options.place(["optionNightClub", "optionClub"]);
			} else if (["Bag", "BagBlue"].includes(textureOn)) {
				this.options.place(["optionSunglasses", "optionChoker"]);
			}
		}

		if (textures.includes("Costume")) {
			if (["Sunglasses", "Necklace"].includes(textureOn)) {
				this.options.place(["optionNightClub", "optionClub"]);
			} else if (["Bag", "BagBlue"].includes(textureOn)) {
				this.options.place(["optionSunglasses", "optionNecklace"]);
			}
		}
	};
}
