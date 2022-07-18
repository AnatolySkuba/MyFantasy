import { State } from "./state";

export class Options extends State {
	private static newGirlOptions: string[] = [];
	private static handPointer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	private static textures: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
	private static Tween: Phaser.Tweens.Tween;
	constructor(scene: Phaser.Scene, private clickHandler: Function) {
		super(scene);
	}

	public place(): void {
		const currentOptions = [];
		let optionIndex = 4;
		optionsFind(State.girlOptions, State.girlOptionsCurrent);
		Options.newGirlOptions.length
			? Options.newGirlOptions.map(option => typeof option === "string" && currentOptions.push(`option${option}`))
			: currentOptions.push(`option${State.girlOptions[2][2]}`, `option${State.girlOptions[2][0]}`);

		this.showHandPointer();
		currentOptions.map((option, index) => {
			const lightSprite = this.scene.physics.add.sprite(0, 0, "sprite", "optionLight.png").setDebug(false, false, 0),
				optionSprite = this.scene.physics.add
					.sprite(0, 0, "sprite", `${option}.${option === "Club" || option === "NightClub" ? "jpg" : "png"}`)
					.setInteractive()
					.setDebug(false, false, 0);

			this.showTextureLight(optionSprite, lightSprite);

			optionSprite.on("pointerdown", () => {
				this.animation("animationJoy");
				this.hideHandPointer();
				this.hideOptions(optionSprite);
				this.scene.time.addEvent({
					delay: 500,
					callback: () => {
						this.removeGirlOptions();
						this.clickHandler(optionSprite.frame.name.slice(6, -4), State.girlOptionsPrevious);
					},
				});
			});

			[optionSprite, lightSprite].map(e => {
				const resize = () => {
					e.displayHeight = window.innerHeight * 0.27;
					e.scaleX = e.scaleY;
					e.setPosition(
						window.innerWidth / 2 + ((index === 0 ? -1 : 1) * e.displayWidth) / 1.8,
						window.innerHeight - e.displayHeight / 1.5,
					);
				};
				resize();
				this.scene.scale.on("resize", resize, this);
				Options.textures.push(e);
				this.showOption(e);
			});
		});
		this.scene.add.layer().add(Options.handPointer);

		function optionsFind(girlOptions, girlOptionsCurrent: string[]) {
			girlOptions[2].map((option: string) => {
				if (girlOptionsCurrent[4].includes(`${option}`)) {
					Options.newGirlOptions = girlOptions[2];
					optionsNextFind(Options.newGirlOptions, girlOptionsCurrent);
					return;
				}
			});
		}

		function optionsNextFind(newGirlOptions, girlOptionsCurrent: string[]) {
			newGirlOptions.map((option: string, index: number) => {
				if (girlOptionsCurrent[optionIndex] === "hair") {
					return;
				} else if (girlOptionsCurrent[optionIndex]?.includes(`${option}`)) {
					Options.newGirlOptions = newGirlOptions[index + 1];
					optionIndex++;
					optionsNextFind(Options.newGirlOptions, girlOptionsCurrent);
					return;
				}
			});
		}
	}

	private showOption(option: Phaser.GameObjects.Sprite): void {
		option.displayWidth = 0;
		option.displayHeight = 0;

		this.scene.tweens.add({
			targets: option,
			displayHeight: window.innerHeight * 0.27,
			displayWidth: window.innerHeight * 0.236842105,
			delay: State.girlOptionsPrevious?.includes("tShirt") ?? (option.frame.name === "optionLight.png" ? 1600 : 1500),
			duration: 100,
		});
	}

	private showTextureLight(
		texture: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
		textureLight: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
	): void {
		this.scene.physics.add.overlap(Options.handPointer, texture, () => {
			this.scene.tweens.add({
				targets: textureLight,
				displayHeight: window.innerHeight * 0.3564,
				displayWidth: window.innerHeight * 0.312631579,
				duration: 50,
			});
			this.scene.tweens.add({
				targets: textureLight,
				displayHeight: window.innerHeight * 0.27,
				displayWidth: window.innerHeight * 0.236842105,
				delay: 200,
				duration: 50,
			});
		});
	}

	private showHandPointer(): void {
		const handPointer = this.scene.physics.add.sprite(0, 0, "sprite", "hand.png").setSize(1, 1).setOffset(57);

		const resize = () => {
			handPointer.displayHeight = window.innerHeight * 0.27;
			handPointer.scaleX = handPointer.scaleY;
			handPointer.setPosition(
				window.innerWidth / 2 - handPointer.displayWidth / 3,
				window.innerHeight - handPointer.displayHeight / 3.5,
			);
		};
		resize();
		this.scene.scale.on("resize", resize, this);

		handPointer.y = window.innerHeight + handPointer.displayHeight / 2.5;
		this.scene.tweens.add({
			targets: handPointer,
			y: window.innerHeight - handPointer.displayHeight / 3.5,
			duration: 150,
			delay: !State.girlOptionsPrevious ? 3500 : 2000,
			onComplete:
				this.handPointerTweens(handPointer) &&
				(() => {
					this.animation("animationShy");
				}),
			onCompleteParams: [handPointer],
		});

		Options.handPointer = handPointer;
	}

	private handPointerTweens(handPointer: Phaser.GameObjects.Sprite): boolean {
		Options.Tween = this.scene.tweens.add({
			targets: handPointer,
			x: window.innerWidth / 2 + handPointer.displayWidth * 0.9,
			ease: "Linear",
			delay: !State.girlOptionsPrevious ? 3800 : 2300,
			yoyo: true,
			duration: 300,
			repeat: -1,
		});
		return true;
	}

	private hideHandPointer() {
		Options.handPointer.y = window.innerHeight - Options.handPointer.displayHeight / 3.5;
		this.scene.tweens.add({
			targets: Options.handPointer,
			y: window.innerHeight + Options.handPointer.displayHeight / 2.5,
			duration: 150,
		});
		Options.Tween.stop();
	}

	private hideOptions(option: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
		Options.textures.map(texture => {
			if (option !== texture && texture.frame.name !== "optionLight.png") {
				this.scene.tweens.add({
					targets: option,
					displayHeight: window.innerHeight * 0.25,
					displayWidth: window.innerHeight * 0.219298245,
					duration: 150,
				});
				this.scene.tweens.add({
					targets: option,
					displayHeight: window.innerHeight * 0.27,
					displayWidth: window.innerHeight * 0.236842105,
					delay: 150,
					duration: 150,
				});
				this.scene.tweens.add({
					targets: [option, texture],
					displayHeight: 0,
					displayWidth: 0,
					delay: 400,
					duration: 100,
					onComplete: () => {
						option.visible = false;
						texture.visible = false;
					},
				});
			} else if (texture.frame.name === "optionLight.png") {
				texture.setVisible(false);
			}
		});
	}

	private animation(animation: string): void {
		State.girlOptionsSprite.map(girlTexture => {
			if (girlTexture.frame.name === `${animation}.png`) {
				girlTexture.setVisible(true);
			}
		});
	}
}
