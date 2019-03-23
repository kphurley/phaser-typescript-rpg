import {MonsterEntity} from '../entities/monster/MonsterEntity';
import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridSceneStateManager} from '../states/GridSceneStateManager';
import {HexagonGrid} from '../util/HexagonGrid';

import { vueStore } from '../../../main';

export class GridScene extends Phaser.Scene {
  hexagonGrid: HexagonGrid;
  sceneGraphics!: Phaser.GameObjects.Graphics;
  stateManager: GridSceneStateManager;

  constructor() {
    super({key: 'TestScene'});

    this.hexagonGrid =
        new HexagonGrid(this, {x: 200, y: 100, height: 10, width: 15});

    this.stateManager = new GridSceneStateManager(this);
  }

  preload() {
    // TODO - Extract to config or preload helper
    this.load.image('test_kenney', 'assets/sprites/grass_05_60x70.png');
    this.load.image('slime', 'assets/sprites/slime_64.png');
    this.load.image('ranger', 'assets/sprites/ranger.png');
    this.load.image('warrior', 'assets/sprites/warrior.png');
    this.load.image('wizzard', 'assets/sprites/wizzard.png');

    // Skill icons
    this.load.image('quickMove', 'assets/sprites/icons/fire-dash.png');
    this.load.image('move', 'assets/sprites/icons/run.png');
    this.load.image('swing', 'assets/sprites/icons/sword-wound.png');

    // Confirm button
    this.load.image('confirm', 'assets/sprites/icons/play-button.png');

    this.load.spritesheet(
        'base_idle', 'assets/sprites/base_idle.png',
        {frameWidth: 64, frameHeight: 64, endFrame: 1});
    this.load.spritesheet(
        'base_walk', 'assets/sprites/base_walk.png',
        {frameWidth: 64, frameHeight: 64, endFrame: 2});
    this.load.spritesheet(
        'base_attack', 'assets/sprites/base_attack.png',
        {frameWidth: 64, frameHeight: 64, endFrame: 3});

    this.load.spritesheet(
        'slime_idle', 'assets/sprites/slime_idle.png',
        {frameWidth: 64, frameHeight: 64, endFrame: 1});
  }

  create() {
    this.sceneGraphics = this.add.graphics();
    this.hexagonGrid.renderGrid(this);

    console.log(vueStore.state.userModule.user); // Working!

    const player = new PlayerEntity(
        this, 'player', 'base_idle', `3,2`, {skills: ['quickMove', 'swing']});

    const slime = new MonsterEntity(this, 'slime', 'slime_idle', `7,2`);

    this.stateManager.init();
  }

  update(time: number, delta: number) {
    this.stateManager.invokeUpdate(time, delta);
  }
}
