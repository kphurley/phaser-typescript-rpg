import {GridScene} from '../scenes/GridScene';

export abstract class GridSceneState implements State {
  guid: string;
  scene: GridScene;

  constructor(scene: GridScene, guid: string) {
    this.scene = scene;
    this.guid = guid;
  }

  // GridScene delegates it's update to the states.
  // By default, this is a noop unless explicitly overridden
  update(time: number, delta: number) {}

  abstract entry(): void;

  abstract exit(): void;
}
