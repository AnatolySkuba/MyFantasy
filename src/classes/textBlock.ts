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

export class TextBlock extends Physics.Arcade.Sprite {
	constructor(scene: Phaser.Scene) {
		super(scene, 0, 0, "");
	}

	public start() {
		const textBlock = this.scene.add.sprite(0, 0, "sprite", "textBlock.png"),
			text = this.scene.add.text(0, 0, `I received an invitation\nto the party!`, this.configText());

		const resize = () => {
			textBlock.displayHeight = window.innerHeight * 0.17;
			textBlock.scaleX = textBlock.scaleY;
			textBlock.setPosition(window.innerWidth / 2, window.innerHeight / 2.1);
			text.displayHeight = window.innerHeight * 0.08;
			text.scaleX = text.scaleY;
			text.setPosition(window.innerWidth / 2 - text.displayWidth / 2, window.innerHeight / 2.2);
		};
		resize();
		this.scene.scale.on("resize", resize, this);

		this.showTextBlock([textBlock, text]);

		this.scene.time.addEvent({
			delay: 750,
			callback: () => {
				text.text = " I need to prepare my\nappearance";
			},
		});
	}

	private showTextBlock(textBlocks: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[]) {
		textBlocks.map(textBlock => {
			textBlock.displayWidth = 0;
			textBlock.displayHeight = 0;
			this.scene.tweens.add({
				targets: textBlock,
				displayHeight: window.innerHeight * (textBlock.type === "Sprite" ? 0.17 : 0.08),
				displayWidth: window.innerHeight * (textBlock.type === "Sprite" ? 0.51548387 : 0.336),
				duration: 100,
			});
		});

		this.hideTextBlock(textBlocks);
	}

	private hideTextBlock(textBlocks: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[]) {
		this.scene.tweens.add({
			targets: textBlocks,
			displayWidth: 0,
			displayHeight: 0,
			delay: 1500,
			duration: 100,
			onComplete: () => {
				this.scene.tweens.add({
					targets: textBlocks,
					alpha: 0,
				});
			},
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
