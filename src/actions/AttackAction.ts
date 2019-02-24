import attackActionsConfig from '../config/attackActionsConfig.json';
import {MonsterEntity} from '../entities/monster/MonsterEntity.js';
import {SpriteEntity} from '../entities/SpriteEntity';
import {HexagonGridCell} from '../util/HexagonGridCell';

import {Action, ActionConfig} from './Action';

export class AttackAction implements Action {
  entity: SpriteEntity;
  targetEntity?: SpriteEntity;
  name: string;
  config?: ActionConfig;

  error?: string;

  complete: () => void;

  constructor(sourceEntity: SpriteEntity, name: string) {
    this.entity = sourceEntity;
    this.targetEntity = undefined;
    this.name = name;

    this.config = attackActionsConfig.find(
        (config: ActionConfig) => config.id === this.name);

    // For bubbling up messages to UI
    this.error = undefined;

    // By default, the complete callback is a no-op
    // Unless explicitly set to do otherwise by
    // onExecuteComplete
    this.complete = () => {};
  }

  onExecuteComplete(complete: () => void) {
    this.complete = complete;
  }

  // TODO - Right now, we're only registering interactions on the enemy
  // If we choose an attack, and there are no eligible targets, we should just
  // execute and be done.
  configureInputs() {
    const grid = this.entity.scene.hexagonGrid;

    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on('pointerdown', () => {
        this.selectTargetEntityFromSprite(sprite);

        if (this.isValid()) {
          console.log('valid!');
          this.execute();
        }
      });
    };

    grid.getMonsterEntities().forEach((monsterEntity) => {
      addInteractions((monsterEntity as MonsterEntity).sprite);
    });
  }

  // Refactor/confirm AI can use this
  selectTargetEntityFromSprite(sprite: Phaser.GameObjects.Sprite) {
    const cellData: HexagonGridCell = sprite.getData('cellData');
    this.targetEntity = cellData.contents as SpriteEntity;
  }

  isValid(): boolean {
    if (!this.targetEntity) {
      this.error = 'No target selected';
      return false;
    }

    const grid = this.entity.scene.hexagonGrid;
    const sourceLocation = this.entity.location;
    const targetLocation = (this.targetEntity as SpriteEntity).location;

    if (grid.isCellWithinRangeOf(
            sourceLocation, targetLocation,
            (this.config as ActionConfig).range)) {
      this.error = undefined;
      return true;
    } else {
      this.error = 'Target is out of range';
      return false;
    }
  }

  execute() {
    const {scene} = this.entity;

    scene.hexagonGrid.getMonsterEntities().forEach((monsterEntity) => {
      (monsterEntity as MonsterEntity).sprite.off('pointerdown');
    });

    console.log('attack emitting...');
    scene.events.emit('attack', this);
    this.complete();
  }

  update(time: number, delta: number) {}
}
