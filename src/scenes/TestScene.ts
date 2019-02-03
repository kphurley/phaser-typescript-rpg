import {HexagonGrid} from '../util/HexagonGrid';
import {HexagonGridCell} from '../util/HexagonGridCell';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'TestScene'});
  }

  preload() {
    this.load.image('test_kenney', 'assets/sprites/dirt_08.png');
  }

  create() {
    this.text =
        this.add.text(100, 600, '', {fontSize: '20px', fill: '#000000'});

    const hexagonGrid = new HexagonGrid({x: 100, y: 100, height: 5, width: 9});

    const addInteractions = (spriteCells: Phaser.GameObjects.Sprite[]) => {
      spriteCells.forEach((sprite: Phaser.GameObjects.Sprite) => {
        sprite.setInteractive();
        sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          this.text.setText([
            'Sprite pixels: (' + sprite.x + ',' + sprite.y + ')',
            'Sprite offset: ' + sprite.getData('offsetLocation')
          ]);
        });
      });
    };

    hexagonGrid.cells.forEach((cellRow: HexagonGridCell[]) => {
      const spriteCells: Phaser.GameObjects.Sprite[] = [];

      cellRow.forEach((cell: HexagonGridCell) => {
        const {offsetLocation, pixelLocation, spriteKey} = cell;
        const sprite =
            this.add.sprite(pixelLocation.x, pixelLocation.y, spriteKey);
        sprite.setData(
            'offsetLocation', `(${offsetLocation.x},${offsetLocation.y})`);
        spriteCells.push(sprite);

        addInteractions(spriteCells);
      });
    });
  }

  update(time: number, delta: number) {}
}
