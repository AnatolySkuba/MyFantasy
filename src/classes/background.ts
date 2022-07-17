import { Physics } from "phaser";

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

export class Background extends Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "");
	}

	public place(texture: string) {
		const background = this.scene.add.sprite(0, 0, "sprite", `${texture}.jpg`);
		const resize = () => {
			if (window.innerHeight / window.innerWidth > background.height / background.width) {
				background.displayHeight = window.innerHeight;
				background.scaleX = background.scaleY;
			} else {
				background.displayWidth = window.innerWidth;
				background.scaleY = background.scaleX;
			}

			background.y = window.innerHeight / 2;
			background.x = window.innerWidth / 2;
		};
		resize();
		this.scene.scale.on("resize", resize, this);
		texture === "background" && this.backgroundOverlay();
	}

	private backgroundOverlay(): void {
		const backgroundOverlay = this.scene.add.sprite(0, 0, "sprite", "backgroundOverlay.png");
		const resize = () => {
			backgroundOverlay.displayHeight = window.innerHeight * 2;
			backgroundOverlay.displayWidth = window.innerWidth * 2;
		};
		resize();
		this.scene.scale.on("resize", resize, this);

		this.scene.time.addEvent({
			delay: 1500,
			callback: () => this.backgroundOverlayOff(backgroundOverlay),
		});
	}

	private backgroundOverlayOff(texture: Phaser.GameObjects.Sprite) {
		this.scene.tweens.add({
			targets: texture,
			alpha: 0,
			duration: 200,
		});
	}

	public button() {
		this.scene.time.addEvent({
			delay: 2000,
			callback: () => {
				const backgroundBlackout = this.scene.add.sprite(0, 0, "sprite", "backgroundOverlay.png").setSize(200, 200),
					button = this.scene.add.sprite(0, 0, "sprite", "button.png"),
					arrow = this.scene.add.sprite(0, 0, "sprite", "arrow.png"),
					textButton = this.scene.add.text(0, 0, `Swipe to play!`, this.configText());

				const resize = () => {
					backgroundBlackout.displayHeight = window.innerHeight * 2;
					backgroundBlackout.displayWidth = window.innerWidth * 2;

					button.displayHeight = window.innerHeight * 0.09;
					button.scaleX = button.scaleY;
					button.setPosition(window.innerWidth / 2, window.innerHeight / 1.1);

					arrow.displayHeight = window.innerHeight * 0.09;
					arrow.scaleX = arrow.scaleY;
					arrow.setPosition(window.innerWidth / 2 - arrow.displayHeight * 1.8, window.innerHeight / 1.1);
					this.scene.tweens.add({
						targets: arrow,
						ease: "Circular",
						x: window.innerWidth / 2 + arrow.displayHeight * 1.8,
						loop: -1,
						duration: 1000,
					});
					textButton.displayHeight = window.innerHeight * 0.06;
					textButton.scaleX = textButton.scaleY;
					textButton.setPosition(
						window.innerWidth / 2 - textButton.displayWidth / 2,
						window.innerHeight / 1.1 - textButton.displayHeight / 2,
					);
				};
				resize();
				this.scene.scale.on("resize", resize, this);
				this.scene.input.on("pointerdown", () => {
					window.location.href = "https://apps.apple.com/us/app/id1491717191";
				});
			},
		});
	}

	private configText(): Text {
		return {
			fontFamily: "Nunito Sans",
			fontStyle: "normal",
			fontWeight: 700,
			fontSize: "24px",
			lineHeight: "33px",
			align: "center",
			letterSpacing: "-0.05px",
			color: "#FFFFFF",
		};
	}
}
