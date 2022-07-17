import { State } from "./state";

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

export class Tooltip extends State {
	private tooltipsArray: string[];
	private tooltips: (Phaser.GameObjects.Sprite | Phaser.GameObjects.Text)[] = [];
	constructor(scene: Phaser.Scene) {
		super(scene);
	}

	public place(tooltipsArray: string[]): void {
		this.tooltipsArray = tooltipsArray;
		const tooltip = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
			tooltipText = this.scene.add.text(0, 0, `${tooltipsArray[0]}`, this.configText());
		this.showTooltip(tooltip, tooltipText);
	}

	public placeNext(): void {
		const tooltip = this.scene.add.sprite(0, 0, "sprite", "overlay.png"),
			tooltipText = this.scene.add.text(
				0,
				0,
				`${this.tooltipsArray[this.getGirlState().length - 4]}`,
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
			this.tooltips.push(tooltip);
			tooltip.y = -tooltip.displayHeight;
			this.scene.tweens.add({
				targets: tooltip,
				y: tooltip.displayHeight * (tooltip.type === "Sprite" ? 1 : 1.1),
				delay: tooltipText.text === "Choose your appearance" ? 3500 : 2000,
				duration: 100,
			});
		});
	}

	public hideTooltip(): void {
		this.tooltips.map(tooltip => {
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
