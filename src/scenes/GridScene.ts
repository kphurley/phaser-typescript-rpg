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
    this.load.image('warrior', 'assets/sprites/warrior_64.png');
    this.load.image('wizzard', 'assets/sprites/wizzard_64.png');
    this.load.image('quickMove', 'assets/sprites/icons/fire-dash.png');
    this.load.image('move', 'assets/sprites/icons/run.png');
  }

  create() {
    // const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
    //   sprite.setInteractive();
    //   sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
    //     if (isMoving) {
    //       moveAction.setMoveDestination(
    //           sprite.getData('cellData').asAxialString());

    //       if (moveAction.isValid()) {
    //         moveAction.execute();
    //       }
    //     }
    //   });
    // };


    this.hexagonGrid.renderGrid(this);
    const stateManager = new GridSceneStateManager(this);

    // Place players on the grid
    // The scene should probably know about the players somehow,
    // maybe from some global game state, for now just place them
    // here to test this structure works
    // TODO - Extract the 'skills' config someplace else, maybe its own class?
    const playerWarrior = new PlayerEntity(
        this, 'playerWarrior', 'warrior', `3,2`, {skills: ['quickMove']});
    const playerWizard = new PlayerEntity(
        this, 'playerWizard', 'wizzard', `4,2`, {skills: ['move']});

    // const movingEntity = new SpriteEntity(this, 'mover', 'warrior', `3,2`);
    // moveAction = new MoveAction(movingEntity, 'quickMove');

    // movingEntity.sprite.setInteractive();
    // movingEntity.sprite.on('pointerdown', () => {
    //   isMoving = !isMoving;
    //   if (isMoving) {
    //     console.log('initiating move');
    //   } else {
    //     console.log('turning move state off');
    //   }
    // });


    // const uiContainer = this.add.container(100, 650);
    // const moveButton = this.add.sprite(10, 10, 'moveButton');
    // uiContainer.add(moveButton)

    // this.input.keyboard.on('keydown', (keyboardEvent: KeyboardEvent) => {
    //   switch (keyboardEvent.key) {
    //     case 'p':
    //       setTimeout(() => {
    //         this.events.emit('planning');
    //       }, 1000);
    //       break;
    //     case 'r':
    //       setTimeout(() => {
    //         this.events.emit('resolveCombat');
    //       }, 1000);
    //       break;
    //     case 'u':
    //       uiVisible = !uiVisible;
    //       uiContainer.setVisible(uiVisible);
    //       break;
    //     default:
    //       return;
    //   }
    // });

    stateManager.init();
  }

  update(time: number, delta: number) {}
}
