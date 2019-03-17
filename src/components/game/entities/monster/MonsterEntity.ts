import {GridScene} from '../../scenes/GridScene';
import {SpriteEntity} from '../SpriteEntity';

export class MonsterEntity extends SpriteEntity {
  constructor(
      scene: GridScene, name: string, spriteRef: string, location: string) {
    super(scene, name, spriteRef, location);
  }
}
