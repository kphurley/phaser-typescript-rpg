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
    let isPathfinding = false;
    let startOfPath: HexagonGridCell;
    let pathSprites: Phaser.GameObjects.Sprite[] = [];

    const createOrRemoveStartOfPath = (sprite: Phaser.GameObjects.Sprite) => {
      isPathfinding = !isPathfinding;
      if (isPathfinding) {
        startOfPath = sprite.getData('cellData');
      }
    };

    const handlePathfinding = (sprite: Phaser.GameObjects.Sprite) => {
      if (isPathfinding) {
        pathSprites.forEach(
            (sprite: Phaser.GameObjects.Sprite) => sprite.destroy());
        pathSprites = [];

        const path = startOfPath.findPathToCell(sprite.getData('cellData'));
        path.forEach((cell: HexagonGridCell) => {
          pathSprites.push(this.add.sprite(
              cell.pixelLocation.x, cell.pixelLocation.y, 'slime'));
        });
      }
    };

    // These are really just for debugging, we can remove when we're confident
    // this all works
    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        createOrRemoveStartOfPath(sprite);
      });
    };

    this.input.on(
        'gameobjectover',
        (pointer: Phaser.Input.Pointer, sprite: Phaser.GameObjects.Sprite) => {
          if (sprite.getData('blocker')) {
            return;
          }
          handlePathfinding(sprite);
        });


    for (const [_, hexagonGridCell] of this.hexagonGrid.cellMap) {
      const {pixelLocation, spriteKey} = hexagonGridCell;
      const sprite =
          this.add.sprite(pixelLocation.x, pixelLocation.y, spriteKey);
      sprite.setData('cellData', hexagonGridCell);

      // TODO - Do we need this now?
      addInteractions(sprite);
    }
  }

  update(time: number, delta: number) {}
}
