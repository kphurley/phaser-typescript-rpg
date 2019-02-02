import {RegularHexagonTesselation} from '../util/RegularHexagonTesselation';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'TestScene'});
  }

  preload() {
    this.load.image('hexagon', 'assets/sprites/Hexagon_64_55.png');
  }

  create() {
    this.text =
        this.add.text(100, 600, '', {fontSize: '20px', fill: '#000000'});

    const updateText = (pointer: Phaser.Input.Pointer) => {
      this.text.setText('Pointer is at: (' + pointer.x + ',' + pointer.y + ')');
    };

    this.input.on('pointermove', updateText);

    const size = 10;
    const sideLength = 31;  // Constant. based on image size
    const sideLengthRoot3 = Math.floor(sideLength * Math.sqrt(3));  // Constant

    // Start position of tesselation, assumes start at top left (probably should
    // refactor to center)
    const x = 50;
    const y = 50;

    for (let yDelta = 0; yDelta < size * sideLengthRoot3;
         yDelta += sideLengthRoot3) {
      for (let xDelta = 0; xDelta < size / 2 * 3 * sideLength;
           xDelta += 3 * sideLength) {
        const hexagon = this.add.sprite(x + xDelta, y + yDelta, 'hexagon');
        hexagon.setInteractive();
        hexagon.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          console.log('clicked polygon', hexagon.x, hexagon.y);
          console.log('pointer', hexagon.x, hexagon.y);
        });
      }
    }

    // Thought - provide accessor methods for coordinates instead of a
    // hard-coded index?
    const nextRowStartCoords = [x + 46, y + 26];

    for (let yDelta = 0; yDelta < size * sideLengthRoot3;
         yDelta += sideLengthRoot3) {
      for (let xDelta = 0; xDelta < size / 2 * 3 * sideLength;
           xDelta += 3 * sideLength) {
        const hexagon = this.add.sprite(
            nextRowStartCoords[0] + xDelta, nextRowStartCoords[1] + yDelta,
            'hexagon');
        hexagon.setInteractive();
        hexagon.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          console.log('clicked polygon', hexagon.x, hexagon.y);
          console.log('pointer', hexagon.x, hexagon.y);
        });
      }
    }
  }

  update(time: number, delta: number) {}
}
