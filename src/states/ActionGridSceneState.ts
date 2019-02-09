import {Action} from '../actions/Action';
import {GridScene} from '../scenes/GridScene';
import {GridSceneState} from './GridSceneState';

// TODO - EXTEND EVENT EMITTER?
export class ActionGridSceneState extends GridSceneState {
  action: Action;

  constructor(scene: GridScene, action: Action, guid: string) {
    super(scene, guid);
    this.action = action;
  }

  // entry() {
  // Do all modifications on scene here
  // Note that the action will have a reference to the entity performing the
  // action
  //}

  exit() {
    // if (this.action.isValid()) {
    //   this.action.execute();

    // emit a notification that this state has completed
    // this.emit(guid);
  }
}