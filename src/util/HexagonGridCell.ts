import {HexagonGrid} from './HexagonGrid';

export class HexagonGridCell {
  axialLocation: {q: number, r: number};
  offsetLocation: {col: number, row: number};
  pixelLocation: {x: number, y: number};
  spriteKey: string;
  grid: HexagonGrid;
  contents?: Entity;

  constructor(
      axialLocation: {q: number, r: number},
      offsetLocation: {col: number, row: number},
      pixelLocation: {x: number, y: number}, spriteKey: string,
      grid: HexagonGrid, contents?: Entity) {
    this.axialLocation = axialLocation;
    this.offsetLocation = offsetLocation;
    this.pixelLocation = pixelLocation;
    this.spriteKey = spriteKey;
    this.grid = grid;
    this.contents = contents;
  }

  getNeighbors(): HexagonGridCell[] {
    const neighbors: HexagonGridCell[] = [];

    const DIRECTIONS: Array<[number, number]> =
        [[+1, 0], [+1, -1], [0, -1], [-1, 0], [-1, +1], [0, +1]];

    const hexNeighbor = (dir: [number, number]): HexagonGridCell|undefined => {
      const {q, r} = this.axialLocation;
      return this.grid.cellMap.get(`${q + dir[0]},${r + dir[1]}`);
    };

    DIRECTIONS.forEach((dir) => {
      const possibleCell = hexNeighbor(dir);
      if (possibleCell) {
        neighbors.push(possibleCell);
      }
    });

    return neighbors;
  }
}
