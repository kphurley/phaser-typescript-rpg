import {Entity} from './Entity';

export class EmptyEntity extends Entity {
  constructor(scene: Phaser.Scene) {
    super(scene, 'empty');
  }

  isEmpty(): boolean {
    return true;
  }
}
