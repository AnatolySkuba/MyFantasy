import { State } from "./state";

export class Options extends State {
	private static handPointer: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
	private static textures: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[] = [];
	private static Tween;
	constructor(scene: Phaser.Scene, private clickHandler: Function) {
		super(scene);
	}

	public place(options: string[]): void {
		this.showHandPointer();
		options.map((option, index) => {
			const textureLight = this.scene.physics.add.sprite(0, 0, "sprite", "optionLight.png").setDebug(false, false, 0),
				texture = this.scene.physics.add
					.sprite(0, 0, "sprite", `${option}.${option === "Club" || option === "NightClub" ? "jpg" : "png"}`)
					.setInteractive()
					.setDebug(false, false, 0);

			this.showTextureLight(texture, textureLight);

			texture.on("pointerdown", () => {
				this.animation("animationJoy");
				this.hideHandPointer();
				this.hideOptions(texture);
				this.scene.time.addEvent({
					delay: 500,
					callback: () => {
						this.removeGirlState();
						this.clickHandler(texture.frame.name.slice(6, -4), this.getGirlTextures());
					},
				});
			});

			[texture, textureLight].map(e => {
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
	}

	private showOption(option: Phaser.GameObjects.Sprite): void {
		option.displayWidth = 0;
		option.displayHeight = 0;

		this.scene.tweens.add({
			targets: option,
			displayHeight: window.innerHeight * 0.27,
			displayWidth: window.innerHeight * 0.236842105,
			delay: this.getGirlTextures()?.includes("tShirt") ?? (option.frame.name === "optionLight.png" ? 1600 : 1500),
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
			delay: !this.getGirlTextures() ? 3500 : 2000,
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
			delay: !this.getGirlTextures() ? 3800 : 2300,
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
}
