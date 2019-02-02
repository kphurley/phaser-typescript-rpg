export class RegularHexagon {
  color: number;
  points: number[][];
  x!: number;
  y!: number;

  constructor(x: number, y: number, sideLength: number, color: number) {
    this.color = color;
    this.points = RegularHexagon.calculateVertices(x, y, sideLength);
  }

  static calculateVertices(x: number, y: number, sideLength: number):
      number[][] {
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

  createPolygon() : Phaser.Geom.Polygon {
    const geomPoints = this.points.map((p) => new Phaser.Geom.Point(p[0], p[1]));
    return new Phaser.Geom.Polygon(geomPoints);
  }

  createHexagonTexture(scene: Phaser.Scene) : void {
    const polygon = this.createPolygon();
    const graphics = scene.add.graphics({ x: 0, y: 0 });
    graphics.lineStyle(2, 0x00aa00);
    graphics.beginPath();
    graphics.moveTo(polygon.points[0].x, polygon.points[0].y);
    for (let i = 1; i < polygon.points.length; i++)
    {
        graphics.lineTo(polygon.points[i].x, polygon.points[i].y);
    }

    graphics.closePath();
    graphics.strokePath();
    graphics.generateTexture('hexagon');
    graphics.destroy();
  }

  addToScene(scene: Phaser.Scene): Phaser.GameObjects.Sprite {
    if (!scene.textures.exists('hexagon')) {
      this.createHexagonTexture(scene);
    }
    
    return scene.add.sprite(400 + this.points[0][0], 100 + this.points[0][1], 'hexagon');
  }
}
