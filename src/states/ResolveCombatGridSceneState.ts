import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class ResolveCombatGridSceneState extends GridSceneState {
  constructor(scene: GridScene) {
    super(scene, 'resolveCombat');
  }

  // entry() {}

  exit() {}
}