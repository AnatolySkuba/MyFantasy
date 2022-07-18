import { State } from "./state";

export class Tooltip extends State {
	private tooltipsSprite: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[] = [];
	constructor(scene: Phaser.Scene, private tooltips: string[]) {
		super(scene);
	}

	public place(): void {
		const tooltip = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
			tooltipText = this.scene.add.text(0, 0, `${this.tooltips[0]}`, this.configText());
		this.showTooltip(tooltip, tooltipText);
	}

	public placeNext(): void {
		const tooltip = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
			tooltipText = this.scene.add.text(
				0,
				0,
				`${this.tooltips[State.girlOptionsSprite.length - 5]}`,
				this.configText(),
			);
		this.showTooltip(tooltip, tooltipText);
	}

	private showTooltip(tooltip: Phaser.GameObjects.Sprite, tooltipText: Phaser.GameObjects.Text): void {
		const resize = () => {
			tooltip.displayHeight = window.innerHeight * 0.047;
			tooltip.scaleX = tooltip.scaleY;
			tooltip.setPosition(window.innerWidth / 2, tooltip.displayHeight);
			tooltipText.displayHeight = window.innerHeight * 0.03;
			tooltipText.scaleX = tooltipText.scaleY;
			tooltipText.setPosition(window.innerWidth / 2 - tooltipText.displayWidth / 2, tooltipText.displayHeight * 1.1);
		};
		resize();
		this.scene.scale.on("resize", resize, this);

		[tooltip, tooltipText].map(tooltip => {
			this.tooltipsSprite.push(tooltip);
			tooltip.y = -tooltip.displayHeight;
			this.scene.tweens.add({
				targets: tooltip,
				y: tooltip.displayHeight * (tooltip.type === "Sprite" ? 1 : 1.1),
				delay: tooltipText.text === this.tooltips[0] ? 3500 : 2000,
				duration: 100,
			});
		});
	}

	public hideTooltip(): void {
		this.tooltipsSprite.map(tooltip => {
			const hideTooltipCheck = (tooltip: Phaser.GameObjects.Sprite | Phaser.GameObjects.Text) => {
				if (tooltip.y === tooltip.displayHeight * (tooltip.type === "Sprite" ? 1 : 1.1)) {
					tooltip.y = tooltip.displayHeight * (tooltip.type === "Sprite" ? 1 : 1.1);
					this.scene.tweens.add({
						targets: tooltip,
						y: -tooltip.displayHeight,
						duration: 100,
						onComplete: () => {
							tooltip.visible = false;
						},
					});
				} else {
					this.scene.time.addEvent({
						delay: 100,
						callback: () => {
							hideTooltipCheck(tooltip);
						},
					});
				}
			};
			hideTooltipCheck(tooltip);
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
