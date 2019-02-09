import {MoveAction} from '../actions/MoveAction';
import {SpriteEntity} from '../entities/SpriteEntity';
import {HexagonGrid} from '../util/HexagonGrid';
import {HexagonGridCell} from '../util/HexagonGridCell';

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
    this.load.image('test_kenney', 'assets/sprites/dirt_08_60x70.png');
    this.load.image('slime', 'assets/sprites/slime_64.png');
    this.load.image('warrior', 'assets/sprites/warrior_64.png');
  }

  create() {
    let isMoving = false;
    let moveAction: MoveAction;

    // These are really just for debugging, we can remove when we're confident
    // this all works
    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        if (isMoving) {
          moveAction.setMoveDestination(
              sprite.getData('cellData').asAxialString());

          if (moveAction.isValid()) {
            moveAction.execute();
          }
        }
      });
    };

    for (const [_, hexagonGridCell] of this.hexagonGrid.cellMap) {
      const {pixelLocation, spriteKey} = hexagonGridCell;
      const sprite =
          this.add.sprite(pixelLocation.x, pixelLocation.y, spriteKey);
      sprite.setData('cellData', hexagonGridCell);

      // TODO - Do we need this now?
      addInteractions(sprite);
    }

    const movingEntity = new SpriteEntity(this, 'mover', 'warrior', `3,2`);
    moveAction = new MoveAction(movingEntity, 'quickMove');

    movingEntity.sprite.setInteractive();
    movingEntity.sprite.on('pointerdown', () => {
      isMoving = !isMoving;
      if (isMoving) {
        console.log('initiating move');
      } else {
        console.log('turning move state off');
      }
    });
  }

  update(time: number, delta: number) {}
}
