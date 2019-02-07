import {GridScene} from '../../scenes/GridScene';
import {SpriteEntity} from '../SpriteEntity';

export class PlayerEntity extends SpriteEntity {
  constructor(
      scene: GridScene, name: string, spriteRef: string, location: string) {
    super(scene, name, spriteRef, location);
  }

  // Actions
  moveTo(location: string) {}  // location should be axialCoords as string
}
