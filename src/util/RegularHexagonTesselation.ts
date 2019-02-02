import {RegularHexagon} from './RegularHexagon';

// NOTE:  This is the motherlode for what we're trying to accomplish here:
// https://www.redblobgames.com/grids/hexagons/
export class RegularHexagonTesselation {
  size: number;

  constructor(size: number) {
    this.size = size;
  }

  createPolygons(x: number, y: number, sideLength: number, color: number):
      RegularHexagon[] {
    const polygons = [];
    const sideLengthRoot3 = sideLength * Math.sqrt(3);

    for (let yDelta = 0; yDelta < this.size * sideLengthRoot3;
         yDelta += sideLengthRoot3) {
      for (let xDelta = 0; xDelta < this.size / 2 * 3 * sideLength;
           xDelta += 3 * sideLength) {
        polygons.push(
            new RegularHexagon(x + xDelta, y + yDelta, sideLength, color));
      }
    }

    // Thought - provide accessor methods for coordinates instead of a
    // hard-coded index?
    const nextRowStartCoords =
        RegularHexagon.calculateVertices(x, y, sideLength)[2];

    for (let yDelta = 0; yDelta < this.size * sideLengthRoot3;
         yDelta += sideLengthRoot3) {
      for (let xDelta = 0; xDelta < this.size / 2 * 3 * sideLength;
           xDelta += 3 * sideLength) {
        polygons.push(new RegularHexagon(
            nextRowStartCoords[0] + xDelta, nextRowStartCoords[1] + yDelta,
            sideLength, color));
      }
    }

    return polygons;
  }

  addToScene(scene: Phaser.Scene, polygons: RegularHexagon[]):
      Phaser.GameObjects.Sprite[] {
    return polygons.map((polygon) => {
      return polygon.addToScene(scene);
    });
  }
}