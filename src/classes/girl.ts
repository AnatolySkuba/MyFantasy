import { State, GirlOptions } from "./state";

export class Girl extends State {
	private girlEmotions: string[];
	constructor(scene: Phaser.Scene, girlOptions: GirlOptions, girlEmotions: string[]) {
		super(scene);
		State.girlOptions = girlOptions;
		State.girlEmotions = girlEmotions;
	}

	public placeNew() {
		this.girlEmotions = State.girlEmotions;
		State.girlOptionsCurrent.push(
			`${State.girlOptions[0]}`,
			this.girlEmotions[0],
			this.girlEmotions[1],
			this.girlEmotions[2],
			`${State.girlOptions[1]}`,
			`${State.girlOptions[3]}`,
		);
		State.girlOptionsCurrent.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			State.girlEmotions.includes(texture) && girlTexture.setVisible(false);
			if (texture === State.girlEmotions[0] || texture === State.girlEmotions[2]) {
				this.scene.time.addEvent({
					delay: texture === State.girlEmotions[0] ? 0 : 750,
					callback: () => this.eventAnimation(girlTexture),
				});
			}
			this.pushGirlState(girlTexture);

			const resize = () => {
				girlTexture.displayHeight = window.innerHeight * 0.95;
				girlTexture.scaleX = girlTexture.scaleY;
				girlTexture.setPosition(window.innerWidth / 2, window.innerHeight - girlTexture.displayHeight / 2);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});

		this.scene.time.addEvent({
			delay: 1500,
			callback: () => this.moveLower(),
		});
	}

	public placeNext(textures: string[], textureOn: string): void {
		if (["Club", "NightClub"].includes(textureOn)) {
			this.lastScene(textures, textureOn);
			return;
		} else if (["Dress", "Costume"].includes(textureOn)) {
			textures = ["body", "animationShy", "animationJoy", "hair"];
			textures.splice(-1, 0, `${textureOn}`);
		} else {
			textures.splice(-1, 0, `${textureOn}`);
		}

		textures.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			if (texture === "animationShy" || texture === "animationJoy") {
				girlTexture.visible = false;
			}
			this.pushGirlState(girlTexture);
			const resize = () => {
				girlTexture.displayHeight = window.innerHeight * 1.07;
				girlTexture.scaleX = girlTexture.scaleY;
				girlTexture.setPosition(window.innerWidth / 2, window.innerHeight - girlTexture.displayHeight / 3.132);
			};
			resize();
			this.scene.scale.on("resize", resize, this);
		});
	}

	public placeNewNext(textures: string[], textureOn: string): void {
		if (["Club", "NightClub"].includes(textureOn)) {
			return;
		} else if (State.girlOptionsCurrent.includes(`${State.girlOptions[1]}`)) {
			State.girlOptionsCurrent.splice(-2, 1, textureOn);
		} else {
			State.girlOptionsCurrent.splice(-1, 0, textureOn);
		}

		State.girlOptionsCurrent.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			if (State.girlEmotions.includes(texture)) {
				girlTexture.visible = false;
			}
			this.pushGirlState(girlTexture);
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
		this.getGirlState().map(girlTexture => {
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
		this.getGirlState().map(girlTexture => {
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

	public lastScene(textures: string[], textureOn: string): void {
		textures.splice(1, 2, "animationSad");
		this.man();
		textures.map(texture => {
			const girlTexture = this.scene.add.sprite(0, 0, "sprite", `${texture}.png`);
			if (texture === "animationSad" || texture === "animationJoy") {
				girlTexture.visible = false;
				if (textures.includes("Dress") && texture === "animationJoy") {
					this.scene.time.addEvent({
						delay: 300,
						callback: () => {
							girlTexture.setVisible(true);
						},
					});
				} else if (textures.includes("Costume") && texture === "animationSad") {
					this.scene.time.addEvent({
						delay: 300,
						callback: () => {
							girlTexture.setVisible(true);
						},
					});
				}
			}
			this.pushGirlState(girlTexture);

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
		this.manText(textures);
	}

	private moveRight(): void {
		console.log(163, this.getGirlState());

		this.getGirlState().map(girlTexture => {
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
