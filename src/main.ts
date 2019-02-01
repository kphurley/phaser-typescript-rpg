import 'phaser';

import TestScene from './scenes/TestScene';

const config:GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  resolution: 1, 
  backgroundColor: "#EDEEC9",
  scene: [
    TestScene
  ]
};

new Phaser.Game(config);
