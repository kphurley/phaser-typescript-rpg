export abstract class Entity {
  name: string;
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, name: string) {
    this.name = name;
    this.scene = scene;
  }

  abstract isEmpty(): boolean;
}
