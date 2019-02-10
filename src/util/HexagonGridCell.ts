import {Entity} from '../entities/Entity';
import {HexagonGrid} from './HexagonGrid';

export class HexagonGridCell {
  axialLocation: {q: number, r: number};
  offsetLocation: {col: number, row: number};
  pixelLocation: {x: number, y: number};
  spriteKey: string;
  grid: HexagonGrid;

  sprite!: Phaser.GameObjects.Sprite;

  contents: Entity;

  constructor(
      axialLocation: {q: number, r: number},
      offsetLocation: {col: number, row: number},
      pixelLocation: {x: number, y: number}, spriteKey: string,
      grid: HexagonGrid, contents: Entity) {
    this.axialLocation = axialLocation;
    this.offsetLocation = offsetLocation;
    this.pixelLocation = pixelLocation;
    this.spriteKey = spriteKey;
    this.grid = grid;
    this.contents = contents;
  }

  setContents(entity: Entity) {
    this.contents = entity;
  }

  setSprite(sprite: Phaser.GameObjects.Sprite) {
    this.sprite = sprite;
  }

  isEmpty() {
    return this.contents.isEmpty();
  }

  asAxialString(): string {
    return `${this.axialLocation.q},${this.axialLocation.r}`;
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
      if (possibleCell && possibleCell.isEmpty()) {
        neighbors.push(possibleCell);
      }
    });

    return neighbors;
  }

  // Build a map of cells mapping cells to the cell they came from
  buildCameFromMap(goalLoc: string): Map<string, string> {
    const startLoc = this.asAxialString();
    const cameFromMap: Map<string, string> = new Map();
    cameFromMap.set(startLoc, 'start');

    let visitedCells: string[] = [startLoc];

    // BFS for goalLoc
    while (visitedCells.length > 0) {
      const currentLoc = visitedCells[0];
      visitedCells = visitedCells.slice(1);

      const cell =
          this.grid.cellMap.get(currentLoc as string) as HexagonGridCell;

      if (currentLoc === goalLoc) {
        break;
      }

      const neighbors = cell.getNeighbors();
      for (let idx = 0; idx < neighbors.length; idx++) {
        const nextLoc = neighbors[idx].asAxialString();
        if (!cameFromMap.has(nextLoc)) {
          visitedCells.push(nextLoc);
          cameFromMap.set(nextLoc, currentLoc);
        }
      }
    }

    return cameFromMap;
  }

  // Find the sequence of cells in the grid that form a path from this cell to
  // goal
  findPathToCell(goal: HexagonGridCell): HexagonGridCell[] {
    if (!goal.isEmpty()) {
      return [];  // Cannot find path to a non-empty cell
    }

    const startLoc = this.asAxialString();
    const goalLoc = goal.asAxialString();
    const cameFromMap: Map<string, string> = this.buildCameFromMap(goalLoc);

    let currentPathLoc = goalLoc;
    const path = [];

    while (cameFromMap.get(currentPathLoc) !== 'start') {
      path.unshift(this.grid.cellMap.get(currentPathLoc));
      currentPathLoc = cameFromMap.get(currentPathLoc) as string;
    }

    path.unshift(this.grid.cellMap.get(startLoc));
    return path as HexagonGridCell[];
  }
}
