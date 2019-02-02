import {RegularHexagonTesselation} from '../util/RegularHexagonTesselation';

export class TestScene extends Phaser.Scene {
  polygons!: Phaser.GameObjects.Sprite[];

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
      polygon.on('pointerdown', () => {
        console.log('clicked', polygon.x, polygon.y);
      });
    });
  }

  update(time: number, delta: number) {}
}
