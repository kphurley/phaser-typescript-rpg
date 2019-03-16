import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class ResolveCombatGridSceneState extends GridSceneState {
  constructor(scene: GridScene) {
    super(scene, 'resolveCombat');
  }

  entry() {
    console.log('Resolving combat...');
    setTimeout(() => this.scene.events.emit(this.guid), 1000);
  }

  exit() {}
}