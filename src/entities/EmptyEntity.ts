import {GridScene} from '../scenes/GridScene';

import {GridEntity} from './GridEntity';

export class EmptyEntity extends GridEntity {
  constructor(scene: GridScene) {
    super(scene, 'empty');
  }

  isEmpty(): boolean {
    return true;
  }
}
