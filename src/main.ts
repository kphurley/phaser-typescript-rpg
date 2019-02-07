import 'phaser';

import {GridScene} from './scenes/GridScene';

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  resolution: 1,
  backgroundColor: '#EDEEC9',
  scene: [GridScene]
};

const game = new Phaser.Game(config);
