import 'phaser';

import {HexagonGridPlugin} from './plugins/HexagonGridPlugin';
import {TestScene} from './scenes/TestScene';

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1280,
  height: 720,
  resolution: 1,
  backgroundColor: '#EDEEC9',
  scene: [TestScene],
  plugins: {
    global:
        [{key: 'HexagonGridPlugin', plugin: HexagonGridPlugin, start: true}]
  }
};

const game = new Phaser.Game(config);
