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
    const isMoving = false;

    // These are really just for debugging, we can remove when we're confident
    // this all works
    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on(
          'pointerdown',
          (pointer: Phaser.Input.Pointer) => {
              // Set destination and execute move if valid
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

    // Create entity and move action
  }

  update(time: number, delta: number) {}
}
