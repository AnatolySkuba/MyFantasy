import { State } from "./state";

export class Progress extends State {
	progressArray: string[];
	constructor(scene: Phaser.Scene) {
		super(scene);
	}

	public place(progressArray: string[]): void {
		this.progressArray = progressArray;
		const progress = this.scene.add.sprite(0, 0, "sprite", `${progressArray[0]}.jpg`);
		this.showProgress(progress);
	}

	public placeNext(): boolean {
		const progress = this.scene.add.sprite(0, 0, "sprite", `${this.progressArray[this.getGirlState().length - 5]}.jpg`);
		this.showProgress(progress);
		return true;
	}

	private showProgress(progress: Phaser.GameObjects.Sprite): void {
		const resize = () => {
			progress.displayHeight = window.innerHeight * 0.01;
			progress.scaleX = progress.scaleY;
			progress.setPosition(window.innerWidth / 2, progress.displayHeight * 4.7);
		};
		resize();
		this.scene.scale.on("resize", resize, this);
		progress.alpha = 0;
		this.scene.tweens.add({
			targets: progress,
			delay: progress.frame.name === this.progressArray[0] ? 1500 : 0,
			alpha: 1,
			duration: 200,
		});
		this.hideProgress(progress);
	}

	private hideProgress(progress: Phaser.GameObjects.Sprite): void {
		this.scene.tweens.add({
			targets: progress,
			delay: progress.frame.name === this.progressArray[0] ? 3000 : 1500,
			alpha: 0,
			duration: 200,
		});
	}
}
