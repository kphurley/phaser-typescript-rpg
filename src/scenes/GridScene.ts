import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridSceneStateManager} from '../states/GridSceneStateManager';
import {HexagonGrid} from '../util/HexagonGrid';

export class GridScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;
  hexagonGrid: HexagonGrid;

  constructor() {
    super({key: 'TestScene'});
    this.hexagonGrid =
        new HexagonGrid(this, {x: 200, y: 100, height: 10, width: 15});
  }

  preload() {
    // TODO - Extract to config or preload helper
    this.load.image('test_kenney', 'assets/sprites/dirt_08_60x70.png');
    this.load.image('slime', 'assets/sprites/slime_64.png');
    this.load.image('ranger', 'assets/sprites/ranger.png');
    this.load.image('warrior', 'assets/sprites/warrior.png');
    this.load.image('wizzard', 'assets/sprites/wizzard.png');
    this.load.image('quickMove', 'assets/sprites/icons/fire-dash.png');
    this.load.image('move', 'assets/sprites/icons/run.png');
    this.load.image('confirm', 'assets/sprites/icons/play-button.png');
  }

  create() {
    this.hexagonGrid.renderGrid(this);
    const stateManager = new GridSceneStateManager(this);

    // TODO - Is this the best place to create the entities?
    // TODO - Extract the 'skills' config someplace else, maybe its own class?
    const playerWarrior = new PlayerEntity(
        this, 'playerWarrior', 'warrior', `3,2`, {skills: ['quickMove']});
    const playerWizard = new PlayerEntity(
        this, 'playerWizard', 'wizzard', `4,2`, {skills: ['move']});
    const playerRanger = new PlayerEntity(
        this, 'playerRanger', 'ranger', `5,2`, {skills: ['quickMove']});

    // TODO:  Place enemies on the grid

    stateManager.init();
  }

  update(time: number, delta: number) {}
}
