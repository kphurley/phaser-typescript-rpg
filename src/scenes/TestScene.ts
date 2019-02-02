import {RegularHexagonTesselation} from '../util/RegularHexagonTesselation';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];
  text!: Phaser.GameObjects.Text;

  constructor() {
    super({key: 'TestScene'});
  }

  preload() {
    this.load.image('hexagon', 'assets/sprites/Hexagon_64_55.png');
    this.load.image('test_kenney', 'assets/sprites/hexagon-pack/PNG/Tiles/Terrain/Stone/stone_10.png');
  }

  create() {
    this.text =
        this.add.text(100, 600, '', {fontSize: '20px', fill: '#000000'});

    const updateText = (pointer: Phaser.Input.Pointer) => {
      this.text.setText('Pointer is at: (' + pointer.x + ',' + pointer.y + ')');
    };

    this.input.on('pointermove', updateText);

    const height = 4;
    const width = 8;
    const sideLength = 69;  // Constant. based on image size
    const sideLengthRoot3 = Math.floor(sideLength * Math.sqrt(3));  // Constant

    // Start position of tesselation, assumes start at top left (probably should
    // refactor to center)
    const x = 100;
    const y = 100;

    // "Even rows"
    for (let yDelta = 0; yDelta < height * 2 * sideLength;
          yDelta += 3 * sideLength) {
      for (let xDelta = 0; xDelta < width * sideLengthRoot3;
            xDelta += sideLengthRoot3) {
        const hexagon = this.add.sprite(x + xDelta, y + yDelta, 'test_kenney');
        hexagon.setInteractive();
        hexagon.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
          console.log('clicked polygon', hexagon.x, hexagon.y);
          console.log('pointer', hexagon.x, hexagon.y);
        });
      }
    }

    // Thought - provide accessor methods for coordinates instead of a
    // hard-coded index?
    const nextRowStartCoords = [x + sideLengthRoot3 / 2, y + sideLengthRoot3 - 14];

    // "Odd rows"
    for (let yDelta = 0; yDelta < height * 2 * sideLength;
        yDelta += 3 * sideLength) {
      for (let xDelta = 0; xDelta < width * sideLengthRoot3;
          xDelta += sideLengthRoot3) {
        const hexagon = this.add.sprite(
            nextRowStartCoords[0] + xDelta, nextRowStartCoords[1] + yDelta,
            'test_kenney');
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
