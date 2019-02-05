import {HexagonGrid} from '../util/HexagonGrid';
import {HexagonGridCell} from '../util/HexagonGridCell';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'TestScene'});
  }

  preload() {
    this.load.image('test_kenney', 'assets/sprites/dirt_08_60x70.png');
  }

  create() {
    this.text =
        this.add.text(100, 600, '', {fontSize: '20px', fill: '#000000'});

    const hexagonGrid = new HexagonGrid({x: 200, y: 100, height: 10, width: 15});

    // These are really just for debugging, we can remove when we're confident this all works
    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        this.text.setText([
          'Sprite pixels: (' + sprite.x + ',' + sprite.y + ')',
          'Sprite offset: ' + sprite.getData('offsetLocation'),
          'Sprite axial: ' + sprite.getData('axialLocation')
        ]);
      });
    };

    // 
    for (const [_, hexagonGridCell] of hexagonGrid.cellMap) {
      const {axialLocation, offsetLocation, pixelLocation, spriteKey} = hexagonGridCell;
      const sprite =
          this.add.sprite(pixelLocation.x, pixelLocation.y, spriteKey);
      sprite.setData(
          'offsetLocation', `(${offsetLocation.col},${offsetLocation.row})`);
      sprite.setData(
          'axialLocation', `(q = ${axialLocation.q}, r = ${axialLocation.r})`);
      
      // TODO - Do we need this now?
      addInteractions(sprite);
    }
  }

  update(time: number, delta: number) {}
}
