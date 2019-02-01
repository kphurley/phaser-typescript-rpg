export default class RegularHexagon {
  color: number;
  points: number[][];
  x: number;
  y: number;

  constructor(x: number, y: number, sideLength: number, color: number) {
    this.color = color;
    this.points = RegularHexagon.calculateVertices(x, y, sideLength);
  }

  static calculateVertices(x: number, y: number, sideLength: number) : number[][] {
    // For now, the top left will be the "anchor point", x, y
    const vertices = [[x, y]];
    const sideLengthRoot3 = sideLength * Math.sqrt(3);

    // Then go around the polygon calculating points, clockwise
    vertices.push([x + sideLength, y]);
    vertices.push([x + 1.5 * sideLength, y + (sideLengthRoot3 / 2)]);
    vertices.push([x + sideLength, y + sideLengthRoot3]);
    vertices.push([x, y + sideLengthRoot3]);
    vertices.push([x - sideLength / 2, y + (sideLengthRoot3 / 2)]);

    return vertices;
  }

  addToScene(scene: Phaser.Scene) : Phaser.GameObjects.Polygon {
    return scene.add.polygon(this.x, this.y, this.points, this.color);
  }
}
