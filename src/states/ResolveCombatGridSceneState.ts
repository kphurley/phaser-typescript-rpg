import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class ResolveCombatGridSceneState extends GridSceneState {
  constructor(scene: GridScene) {
    super(scene, 'resolveCombat');
  }

  // Call this to enter this state
  // entry() {
  // Do all modifications on scene here
  //}

  // Call this to exit the state and trigger a transition
  exit() {
    // Do any state cleanup here
  }
}