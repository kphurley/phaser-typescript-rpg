import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class PlanningGridSceneState extends GridSceneState {
  constructor(scene: GridScene) {
    super(scene, 'planning');
  }

  // Call this to enter this state
  // entry() {
  // Do all modifications on scene here
  // console.log(`${this.guid} state entered`);
  //}

  // Call this to exit the state and trigger a transition
  exit() {
    // Do any state cleanup here
  }
}