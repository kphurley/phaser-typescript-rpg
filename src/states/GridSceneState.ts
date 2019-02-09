import {GridScene} from '../scenes/GridScene';

export abstract class GridSceneState implements State {
  guid: string;
  scene: GridScene;

  constructor(scene: GridScene, guid: string) {
    this.scene = scene;
    this.guid = guid;
  }

  // abstract entry() : void;
  entry() {
    console.log(`${this.guid} state entered at ${Date.now()}`);
  }

  abstract exit(): void;
}
