import {GridScene} from '../scenes/GridScene';

import {Entity} from './Entity';

export abstract class GridEntity extends Entity {
  scene: GridScene;

  constructor(scene: GridScene, name: string) {
    super(name);
    this.scene = scene;
  }
}