import {EmptyEntity} from '../entities/EmptyEntity';
import {Entity} from '../entities/Entity';
import {GridScene} from '../scenes/GridScene';

import {HexagonGridCell} from './HexagonGridCell';
import config from './hexagonGridConfig.json';

// NOTE:  This is the motherlode for what we're trying to accomplish here:
// https://www.redblobgames.com/grids/hexagons/

const SIDE_LENGTH = config.sideLength;
const SIDE_LENGTH_ROOT_3 = SIDE_LENGTH * Math.sqrt(3);

export class HexagonGrid {
  scene!: GridScene;
  options: {x: number, y: number, height: number; width: number;};

  // Storage of the cells - Key is the axial coordinates of the cell
  cellMap: Map<string, HexagonGridCell>;

  constructor(scene: GridScene, options: {
    x: number, y: number, height: number; width: number;
  }) {
    this.options = options;
    this.cellMap = new Map();
    this.createGrid(scene);
  }

  // Create a grid for parameter scene.  Start position of grid is (x, y) in
  // pixels Assumes start at center of top left hex, pointy hexes, rectangular
  // layout
  createGrid(scene: GridScene): void {
    const {height, width} = this.options;

    for (let yIdx = 0; yIdx < height; yIdx++) {
      for (let xIdx = 0; xIdx < width; xIdx++) {
        const [axialQ, _, axialR] = HexagonGrid.offsetToCube(xIdx, yIdx);
        const hexagonGridCell = new HexagonGridCell(
            {q: axialQ, r: axialR}, {col: xIdx, row: yIdx},
            HexagonGrid.offsetToPixel(xIdx, yIdx, this.options),
            'test_kenney',  // TODO - Extract to config
            this, new EmptyEntity(scene));

        this.cellMap.set(hexagonGridCell.asAxialString(), hexagonGridCell);
      }
    }
  }

  assignEntityToGridLocation(entity: Entity, location: string): void {
    if (!this.cellMap.get(location)) {
      return;
    }

    const gridCell = this.cellMap.get(location) as HexagonGridCell;
    gridCell.setContents(entity);
  }

  axialStringToPixelLocation(axialString: string): {x: number, y: number} {
    const desiredCell = this.cellMap.get(axialString) as HexagonGridCell;
    return desiredCell.pixelLocation;
  }

  isCellWithinRangeOf(center: string, destination: string, range: number):
      boolean {
    // Implement me

    return false;
  }

  static offsetToPixel(xCoord: number, yCoord: number, options: {
    x: number, y: number, height: number; width: number;
  }): {x: number, y: number} {
    const {x, y} = options;
    const isEven = (y: number) => y % 2 === 0;

    return {
      // TODO - Clean these calculations up
      x: isEven(yCoord) ?
          x + xCoord * SIDE_LENGTH_ROOT_3 :
          x + SIDE_LENGTH_ROOT_3 / 2 + xCoord * SIDE_LENGTH_ROOT_3,
      y: y + yCoord * 2 * SIDE_LENGTH - (yCoord * SIDE_LENGTH / 2)
    };
  }

  static offsetToCube(xCoord: number, yCoord: number):
      [number, number, number] {
    const x = xCoord - (yCoord - (yCoord & 1)) / 2;
    const z = yCoord;
    const y = -x - z;

    return [x, y, z];
  }
}