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
  }

  isEmpty(): boolean {
    return false;
  }

  moveAlong(path: Phaser.Curves.Path) {
    // This isn't quite there yet.  Some issues:
    // The path thing in the examples works with the update loop.  This isn't
    // ideal. Might be just as easy to forego trying to move along the path And
    // just create a seperate tween for each path segment We can see the
    // follower being logged in the update loop of GridScene to see how this
    // works Alternatively we just have some check within update for active
    // tweens
    this.scene.follower = {t: 0, vec: new Phaser.Math.Vector2()};
    const tweenOnComplete = () => {
      this.scene.follower = undefined;
    };
    const tween = this.scene.tweens.add({
      targets: this.scene.follower,
      t: 1,
      duration: 4000,
      onComplete: tweenOnComplete,
    });

    // update location
  }
}
