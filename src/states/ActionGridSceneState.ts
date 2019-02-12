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

  entry() {
    console.log(
        `entry called for state with guid: ${this.guid} and `, this.action);

    this.action.configureInputs();

    this.action.onExecuteComplete(() => {
      this.exit();
      this.scene.events.emit(this.guid);
    });
  }

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