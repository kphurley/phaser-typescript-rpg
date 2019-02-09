import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class PlanningGridSceneState extends GridSceneState {
  constructor(scene: GridScene) {
    super(scene, 'planning');
  }

  // entry() {}

  exit() {}
}