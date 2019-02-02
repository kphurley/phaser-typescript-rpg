import {RegularHexagonTesselation} from '../util/RegularHexagonTesselation';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'TestScene'});
  }

  preload() {}

  create() {
    const tesselation = new RegularHexagonTesselation(4);
    const regularHexagons = tesselation.createPolygons(200, 200, 60, 0xffffff);
    this.polygons = tesselation.addToScene(this, regularHexagons);

    this.polygons.forEach((polygon) => {
      polygon.setInteractive();
      polygon.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
        console.log('clicked polygon', polygon.x, polygon.y);
        console.log('pointer', pointer.x, pointer.y);
      });
    });

    this.text = this.add.text(50, 100, "", {
      fontSize: '20px',
      fill: '#000000'
    });

    const updateText = (pointer: Phaser.Input.Pointer) => {
      this.text.setText('Pointer is at: (' + pointer.x + ',' + pointer.y + ')');
    }

    this.input.on('pointermove', updateText);
  }

  update(time: number, delta: number) {}
}
