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
			],
			girlEmotions = ["animationSurprised", "animationShy", "animationJoy", "animationSad"],
			tooltips = ["Choose your appearance", "Choose your bag", "Choose your accessory", "Choose your place"],
			progressAll = ["progress0", "progress1", "progress2", "progress3"];

		this.background = new Background(this);
		this.girl = new Girl(this, girlOptions, girlEmotions);
		const textBlok = new TextBlock(this);
		this.tooltip = new Tooltip(this, tooltips);
		this.progress = new Progress(this, progressAll);
		this.options = new Options(this, this.clickHandler);

		this.background.place("background");
		this.girl.place();
		textBlok.start();
		this.progress.place();
		this.tooltip.place();
		this.options.place();
	}

	public clickHandler = (optionSpriteOn: string, girlOptionsPrevious: string[]): void => {
		this.girl.placeNext(optionSpriteOn);
		this.tooltip.hideTooltip();
		if (["Club", "NightClub"].includes(optionSpriteOn)) {
			this.background.place(optionSpriteOn);
			this.girl.lastScene(girlOptionsPrevious);
			this.background.button();
		} else {
			this.progress.placeNext();
			this.tooltip.placeNext();
			this.options.place();
		}
	};
}
