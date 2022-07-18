import { Scene } from "phaser";
import { Background, Girl, GirlOptions, TextBlock, Tooltip, Progress, Options } from "../classes";

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
		const girlOptions: GirlOptions = [
			"body",
			"tShirt",
			[
				"Dress",
				[
					"Bag",
					["Sunglasses", ["Club", "NightClub"], "Choker", ["Club", "NightClub"]],
					"BagBlue",
					["Sunglasses", ["Club", "NightClub"], "Choker", ["Club", "NightClub"]],
				],
				"Costume",
				[
					"Bag",
					["Sunglasses", ["Club", "NightClub"], "Necklace", ["Club", "NightClub"]],
					"BagBlue",
					["Sunglasses", ["Club", "NightClub"], "Necklace", ["Club", "NightClub"]],
				],
			],
			"hair",
		];
		const girlEmotions = ["animationSurprised", "animationShy", "animationJoy", "animationSad"];

		this.background = new Background(this);
		this.girl = new Girl(this, girlOptions, girlEmotions);
		const textBlok = new TextBlock(this);
		this.tooltip = new Tooltip(this);
		this.progress = new Progress(this);
		this.options = new Options(this, this.clickHandler);

		this.background.place("background");

		this.girl.placeNew();
		textBlok.start();
		this.progress.place(["progress0", "progress1", "progress2", "progress3"]);
		this.tooltip.place(["Choose your appearance", "Choose your bag", "Choose your accessory", "Choose your place"]);
		this.options.place();
	}

	public clickHandler = (textureOn: string, textures: string[]): void => {
		console.log(textureOn, textures);

		this.girl.placeNewNext(textures, textureOn);
		["Club", "NightClub"].includes(textureOn) && this.background.place(textureOn);
		["Club", "NightClub"].includes(textureOn) && this.girl.lastScene(textures, textureOn);
		this.tooltip.hideTooltip();

		if (["Club", "NightClub"].includes(textureOn)) {
			this.background.button();
		} else {
			this.progress.placeNext();
			this.tooltip.placeNext();
			this.options.place();
		}
	};
}
