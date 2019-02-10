import {GridScene} from '../../scenes/GridScene';
import {SpriteEntity} from '../SpriteEntity';

export class PlayerEntity extends SpriteEntity {
  characterConfig: {skills: string[]};
  // TODO - Wrap this in something better, ActionBar maybe?
  uiContainer: Phaser.GameObjects.Container;

  selectedSkill?: string;

  constructor(
      scene: GridScene, name: string, spriteRef: string, location: string,
      characterConfig: {skills: string[]}) {
    super(scene, name, spriteRef, location);
    this.characterConfig = characterConfig;
    this.uiContainer = this.createActionBar();
  }

  // Character config
  createActionBar(): Phaser.GameObjects.Container {
    // TODO:  Magic numbers, vary X in forEach loop when more skills are added
    const uiContainer = this.scene.add.container(100, 650);

    this.characterConfig.skills.forEach((skillName) => {
      const button = this.scene.add.sprite(10, 10, skillName);
      // TODO - Register input handlers on buttons, or provide a hook to do so
      button.setInteractive();
      button.on('pointerdown', () => {
        // TODO:  Highlight the button somehow?
        this.selectedSkill = skillName;
      });

      uiContainer.add(button);
    });

    uiContainer.setVisible(false);
    return uiContainer;
  }

  // UI
  setActionBarVisible(value: boolean) {
    this.uiContainer.setVisible(value);
  }

  // Sprite Actions
  moveTo(location: string) {}  // location should be axialCoords as string
}
