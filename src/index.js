import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
  },
};
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(config);
function preload() {
  this.load.image('logo', logoImg);
}
function create() {
  const logo = this.add.image(400, 150, 'logo');
  this.tweens.add({
    targets: logo,
    y: 450,
    duration: 2000,
    ease: 'Power2',
    yoyo: true,
    loop: -1,
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
