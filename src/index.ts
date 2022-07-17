import { Game, Types } from "phaser";
import { LoadingScene, Main } from "./scenes";
const gameConfig: Types.Core.GameConfig = {
	parent: "game",
	type: Phaser.AUTO,
	width: window.outerWidth,
	height: window.outerHeight,
	backgroundColor: "rgba(6, 6, 6, 0.8)",
	scale: {
		mode: Phaser.Scale.RESIZE,
	},
	physics: {
		default: "arcade",
		arcade: {
			debug: true,
		},
	},
	render: {
		antialiasGL: false,
		pixelArt: true,
	},
	callbacks: {
		postBoot: () => {
			window.sizeChanged();
		},
	},
	canvasStyle: `display: block; width: 100%; height: 100%;`,
	autoFocus: true,
	audio: {
		disableWebAudio: false,
	},
	scene: [LoadingScene, Main],
};

window.sizeChanged = () => {
	if (window.game.isBooted) {
		setTimeout(() => {
			window.game.scale.resize(window.innerWidth, window.innerHeight);
			window.game.canvas.setAttribute(
				"style",
				`display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
			);
		}, 100);
	}
};
window.onresize = () => window.sizeChanged();

window.game = new Game(gameConfig);

interface Window {
	sizeChanged: () => void;
	game: Phaser.Game;
}
