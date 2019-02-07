import {GridScene} from '../scenes/GridScene';

import {Entity} from './Entity';

export class SpriteEntity extends Entity {
  spriteRef: string;
  sprite: Phaser.GameObjects.Sprite;
  location: string;

  constructor(
      scene: GridScene, name: string, spriteRef: string, location: string) {
    super(scene, name);
    this.location = location;
    this.spriteRef = spriteRef;

    const {x, y} = scene.hexagonGrid.axialStringToPixelLocation(location);
    this.sprite = scene.add.sprite(x, y, spriteRef);
    scene.hexagonGrid.assignEntityToGridLocation(this, location);
    this.sprite.setData('blocker', true);  // TODO - DO WE NEED THIS?
  }

  isEmpty(): boolean {
    return false;
  }
}
