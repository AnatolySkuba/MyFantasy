import React from 'react';
import logoImg from '../assets/logo.png';
import Phaser from 'phaser';

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
export default class App extends React.Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const game = new Phaser.Game(config);
    return;
    // <div style={{ textAlign: 'center' }}>
    //   <h1>Hello World</h1>
    // </div>
    // );
  }
}
