import {HexagonGridCell} from './HexagonGridCell';

import config from './hexagonGridConfig.json';

// NOTE:  This is the motherlode for what we're trying to accomplish here:
// https://www.redblobgames.com/grids/hexagons/

const SIDE_LENGTH = config.sideLength;
const SIDE_LENGTH_ROOT_3 = SIDE_LENGTH * Math.sqrt(3);

export class HexagonGrid {
  options: {x: number, y: number, height: number; width: number;};

  // Storage of the cells - Key is the axial coordinates of the cell
  cellMap: Map<[number, number], HexagonGridCell>;

  constructor(options: {x: number, y: number, height: number; width: number;}) {
    this.options = options;
    this.cellMap = new Map();
    this.createGrid();
  }

  // Start position of grid is (x, y) in pixels
  // assumes start at center of top left hex, pointy hexes, rectangular layout
  createGrid(): void {
    const {height, width} = this.options;

    for (let yIdx = 0; yIdx < height; yIdx++) {
      for (let xIdx = 0; xIdx < width; xIdx++) {
        const [ axialQ, _, axialR ] = this.offsetToCube(xIdx, yIdx);
        this.cellMap.set([ axialQ, axialR ], new HexagonGridCell(
          {q: axialQ, r: axialR},
          {col: xIdx, row: yIdx},
          this.offsetToPixel(xIdx, yIdx), 
          'test_kenney',  // TODO - Extract to config
          undefined));
      }
    }
  }

  offsetToPixel(xCoord: number, yCoord: number): {x: number, y: number} {
    const {x, y} = this.options;
    const isEven = (y: number) => y % 2 === 0;

    return {
      // TODO - Clean these calculations up
      x: isEven(yCoord) ?
          x + xCoord * SIDE_LENGTH_ROOT_3 :
          x + SIDE_LENGTH_ROOT_3 / 2 + xCoord * SIDE_LENGTH_ROOT_3,
      y: y + yCoord * 2 * SIDE_LENGTH - (yCoord * SIDE_LENGTH / 2)
    };
  }

  offsetToCube(xCoord: number, yCoord: number): [number, number, number] {
    const x = xCoord - (yCoord - (yCoord & 1)) / 2;
    const z = yCoord;
    const y = -x - z;

    return [x, y, z];
  }
}