import {Action} from '../actions/Action';
import {GridScene} from '../scenes/GridScene';
import {GridSceneState} from './GridSceneState';

export class ActionGridSceneState extends GridSceneState {
  action: Action;

  constructor(scene: GridScene, action: Action, guid: string) {
    super(scene, guid);
    this.action = action;
  }

  // entry() {}

  exit() {}
}