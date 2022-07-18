import { State, GirlOptions } from "./state";

export class Girl extends State {
	constructor(scene: Phaser.Scene, girlOptions: GirlOptions, private girlEmotions: string[]) {
		super(scene);
		State.girlOptions = girlOptions;
	}

	public place() {
		State.girlOptionsCurrent.push(
			`${State.girlOptions[0]}`,
			this.girlEmotions[0],
			this.girlEmotions[1],
			this.girlEmotions[2],
			`${State.girlOptions[1]}`,
			`${State.girlOptions[3]}`,
		);
		State.girlOptionsCurrent.map(option => {
			const girlOptionSprite = this.scene.add.sprite(0, 0, "sprite", `${option}.png`);
			this.girlEmotions.includes(option) && girlOptionSprite.setVisible(false);
			if (option === this.girlEmotions[0] || option === this.girlEmotions[2]) {
				this.scene.time.addEvent({
					delay: option === this.girlEmotions[0] ? 0 : 750,
					callback: () => this.eventAnimation(girlOptionSprite),
				});
			}
			this.pushGirlOptionsSprite(girlOptionSprite);

			const resize = () => {
				girlOptionSprite.displayHeight = window.innerHeight * 0.95;
				girlOptionSprite.scaleX = girlOptionSprite.scaleY;
				girlOptionSprite.setPosition(window.innerWidth / 2, window.innerHeight - girlOptionSprite.displayHeight / 2);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});

		this.scene.time.addEvent({
			delay: 1500,
			callback: () => this.moveLower(),
		});
	}

	public placeNext(textureOn: string): void {
		State.girlOptionsCurrent.includes(`${State.girlOptions[1]}`)
			? State.girlOptionsCurrent.splice(-2, 1, textureOn)
			: State.girlOptionsCurrent.splice(-1, 0, textureOn);

		State.girlOptionsCurrent.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			this.girlEmotions.includes(texture) && (girlTexture.visible = false);
			this.pushGirlOptionsSprite(girlTexture);
			const resize = () => {
				girlTexture.displayHeight = window.innerHeight * 1.07;
				girlTexture.scaleX = girlTexture.scaleY;
				girlTexture.setPosition(window.innerWidth / 2, window.innerHeight - girlTexture.displayHeight / 3.132);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});
	}

	private moveLower(): void {
		State.girlOptionsSprite.map(girlTexture => {
			this.scene.tweens.add({
				targets: girlTexture,
				displayHeight: window.innerHeight * 1.07,
				displayWidth: window.innerHeight * 0.714875,
				y: window.innerHeight - girlTexture.displayHeight / 2.7,
				duration: 100,
				onComplete: () => this.placeLower(),
			});
		});
	}

	private placeLower(): void {
		State.girlOptionsSprite.map(girlTexture => {
			const resize = () => {
				girlTexture.displayHeight = window.innerHeight * 1.07;
				girlTexture.scaleX = girlTexture.scaleY;
				girlTexture.setPosition(window.innerWidth / 2, window.innerHeight - girlTexture.displayHeight / 3.132);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});
	}

	private eventAnimation(animation: Phaser.GameObjects.Sprite) {
		let x = 0;
		const intervalID = setInterval(() => {
			if (++x === 6) {
				window.clearInterval(intervalID);
			}
			animation.visible ? (animation.visible = false) : (animation.visible = true);
		}, 125);
	}

	public lastScene(girlOptionsPrevious: string[]): void {
		girlOptionsPrevious.splice(1, 2, "animationSad");
		this.man();
		girlOptionsPrevious.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			if (texture === "animationSad" || texture === "animationJoy") {
				girlTexture.visible = false;
				if (girlOptionsPrevious.includes("Dress") && texture === "animationJoy") {
					this.scene.time.addEvent({
						delay: 300,
						callback: () => {
							girlTexture.setVisible(true);
						},
					});
				} else if (girlOptionsPrevious.includes("Costume") && texture === "animationSad") {
					this.scene.time.addEvent({
						delay: 300,
						callback: () => {
							girlTexture.setVisible(true);
						},
					});
				}
			}
			this.pushGirlOptionsSprite(girlTexture);

			const resize = () => {
				girlTexture.displayHeight = window.innerHeight * 0.9;
				girlTexture.scaleX = girlTexture.scaleY;
				girlTexture.setPosition(
					window.innerWidth / 2 - girlTexture.displayWidth / 5,
					window.innerHeight - girlTexture.displayHeight / 2.5,
				);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});
		this.moveRight();
		this.manText(girlOptionsPrevious);
	}

	private moveRight(): void {
		State.girlOptionsSprite.map(girlTexture => {
			girlTexture.x = window.innerWidth / 2 - girlTexture.displayWidth / 1.2;
			this.scene.tweens.add({
				targets: girlTexture,
				x: window.innerWidth / 2 - girlTexture.displayWidth / 5,
				duration: 100,
			});
		});
	}

	private man(): void {
		const man = this.scene.add.sprite(0, 0, "sprite", "man.png");
		const resize = () => {
			man.displayHeight = window.innerHeight * 0.9;
			man.scaleX = man.scaleY;
			man.setPosition(window.innerWidth / 2 + man.displayWidth / 4.3, window.innerHeight - man.displayHeight / 2.05);
		};
		resize();
		this.scene.scale.on("resize", resize, this);
		man.x = window.innerWidth / 2 + man.displayWidth / 1.2;
		this.scene.tweens.add({
			targets: man,
			x: window.innerWidth / 2 + man.displayWidth / 4.3,
			duration: 100,
		});
	}

	private manText(textures: string[]): void {
		const textBlockMan = this.scene.add.sprite(0, 0, "sprite", "textBlockMan.png");
		const textMan = this.scene.add.text(
			0,
			0,
			textures.includes("Dress") ? "You are beautiful!❤️" : "What a weird appearance!",
			this.configText(),
		);
		// textBlockMan
		const resize = () => {
			textBlockMan.displayHeight = window.innerHeight * 0.15;
			textBlockMan.scaleX = textBlockMan.scaleY;
			textBlockMan.setPosition(window.innerWidth / 2, window.innerHeight / 2);
		};
		resize();
		this.scene.scale.on("resize", resize, this);
		textBlockMan.x = window.innerWidth / 1.1;
		textBlockMan.displayWidth = 0;
		textBlockMan.displayHeight = 0;

		this.scene.tweens.add({
			targets: textBlockMan,
			x: window.innerWidth / 2,
			displayHeight: window.innerHeight * 0.15,
			displayWidth: window.innerHeight * 0.459677419,
			delay: 200,
			duration: 100,
		});
		// textMan
		textMan.displayHeight = window.innerHeight * (textures.includes("Dress") ? 0.05 : 0.038);
		textMan.scaleX = textMan.scaleY;
		textMan.setPosition(
			window.innerWidth / 2 - (textures.includes("Dress") ? textMan.displayWidth * 0.5 : textMan.displayHeight * 4.7),
			window.innerHeight / (textures.includes("Dress") ? 2.03 : 2),
		);
		const widthTextManRight =
			window.innerWidth / 2 - (textures.includes("Dress") ? textMan.displayWidth / 2 : textMan.displayHeight * 4.7);
		textMan.x = window.innerWidth / 2 + textMan.displayWidth / 2;
		textMan.displayWidth = 0;
		textMan.displayHeight = 0;

		this.scene.tweens.add({
			targets: textMan,
			displayHeight: window.innerHeight * (textures.includes("Dress") ? 0.05 : 0.038),
			displayWidth: window.innerHeight * (textures.includes("Dress") ? 0.4 : 0.37),
			x: widthTextManRight,
			delay: 200,
			duration: 100,
		});
	}

	private configText(): Text {
		return {
			fontFamily: "Nunito Sans",
			fontStyle: "italic bold",
			fontWeight: 600,
			fontSize: "30px",
			lineHeight: "33px",
			align: "center",
			letterSpacing: "-0.05px",
			color: "#303052",
		};
	}
}

type Text = {
	fontFamily: string;
	fontStyle: string;
	fontWeight: number;
	fontSize: string;
	lineHeight: string;
	align: string;
	letterSpacing: string;
	color: string;
};
