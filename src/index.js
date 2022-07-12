import Phaser from "phaser";
import { SceneIntro } from "./js/sceneIntro";
import { SceneTutorial } from "./js/sceneTutorial";
import { SceneGamePlay } from "./js/SceneGamePlay";
import { SceneLoseScreen } from "./js/SceneLoseScreen";
import { SceneAmazingScreen } from "./js/SceneAmazingScreen";

let game;

window.onload = function () {
	const config = {
		type: Phaser.AUTO,
		width: window.outerWidth,
		height: window.outerHeight,
		backgroundColor: "rgba(6, 6, 6, 0.8)",
		scale: {
			mode: Phaser.Scale.RESIZE,
		},
		parent: "My-fantasy",
		physics: {
			default: "arcade",
			arcade: { debug: true },
		},
		scene: [SceneIntro, SceneTutorial, SceneGamePlay, SceneAmazingScreen, SceneLoseScreen],
	};

	game = new Phaser.Game(config);
};

export { game };
