import RegularHexagonTesselation from '../util/RegularHexagonTesselation';

class TestScene extends Phaser.Scene {
	polygons: Array<Phaser.GameObjects.Polygon>;
	cursors: any;

	constructor() {
    super({
			key: 'TestScene'
		});
	}
	
	preload() {

	}

	create() {
		const tesselation = new RegularHexagonTesselation(4);
		const regularHexagons = tesselation.createPolygons(200, 200, 60, 0xffffff);
		this.polygons = tesselation.addToScene(this, regularHexagons);

	}

	update(time: number, delta:number) {
	}
}

export default TestScene;