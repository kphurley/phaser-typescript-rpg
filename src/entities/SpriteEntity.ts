import {GridScene} from '../scenes/GridScene';

import {GridEntity} from './GridEntity';

export class SpriteEntity extends GridEntity {
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

    this.configureAnimations();
  }

  isEmpty(): boolean {
    return false;
  }

  configureAnimations() {
    const idleConfig = {
      key: `${this.name}-idle`,
      frames: this.scene.anims.generateFrameNumbers(
          this.spriteRef, {start: 0, end: 1, first: 0}),
      frameRate: 6,
      repeat: -1
    };

    // TODO - get from config
    const walkConfig = {
      key: `${this.name}-walk`,
      frames: this.scene.anims.generateFrameNumbers(
          'base_walk', {start: 0, end: 3, first: 0}),
      frameRate: 6,
      repeat: -1
    };

    this.scene.anims.create(idleConfig);
    this.scene.anims.create(walkConfig);
    this.sprite.anims.play(`${this.name}-idle`);
  }

  setIdle() {
    this.sprite.anims.play(`${this.name}-idle`);
  }

  setWalking() {
    this.sprite.anims.play(`${this.name}-walk`);
  }
}
