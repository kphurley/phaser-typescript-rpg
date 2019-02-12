import {Action} from '../actions/Action';
import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class ActionGridSceneState extends GridSceneState {
  action: Action;

  constructor(scene: GridScene, action: Action, guid: string) {
    super(scene, guid);
    this.action = action;
  }

  // This is next:  configure to prompt either the player or AI
  // to complete the Action

  // When complete emit the guid
  entry() {
    console.log(
        `entry called for state with guid: ${this.guid} and `, this.action);
    setTimeout(() => {
      this.exit();
      this.scene.events.emit(this.guid);
    }, 1000);
  }

  // ---- Old code that probably applies here somehow ----
  // const movingEntity = new SpriteEntity(this, 'mover', 'warrior', `3,2`);
  // moveAction = new MoveAction(movingEntity, 'quickMove');

  // movingEntity.sprite.setInteractive();
  // movingEntity.sprite.on('pointerdown', () => {
  //   isMoving = !isMoving;
  //   if (isMoving) {
  //     console.log('initiating move');
  //   } else {
  //     console.log('turning move state off');
  //   }
  // });

  // const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
  //   sprite.setInteractive();
  //   sprite.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
  //     if (isMoving) {
  //       moveAction.setMoveDestination(
  //           sprite.getData('cellData').asAxialString());

  //       if (moveAction.isValid()) {
  //         moveAction.execute();
  //       }
  //     }
  //   });
  // };

  // At this point, execute should have been called.
  // Therefore, we should clear the status of the action's entity here
  exit() {
    const entity =
        (this.action.entity as PlayerEntity);  // TODO:  Support AI entities
    entity.queuedAction = undefined;
    entity.selectedSkill = undefined;
    entity.skillConfirmed = false;
  }
}