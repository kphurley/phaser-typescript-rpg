// TODO:  Use this to give the created action states unique IDs
import uuidv4 from 'uuid/v4'; // tslint:disable-line

import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';
import {PlanningGridSceneState} from './PlanningGridSceneState';
import {ResolveCombatGridSceneState} from './ResolveCombatGridSceneState';

export class GridSceneStateRouter extends Phaser.Events.EventEmitter {
  activeState: string;
  scene: GridScene;
  stateIDs: string[];
  stateMap: Map<string, GridSceneState>;

  constructor(scene: GridScene) {
    super();

    this.scene = scene;

    this.stateIDs = ['planning', 'resolveCombat'];

    this.stateMap = new Map<string, GridSceneState>();
    this.stateMap.set('planning', new PlanningGridSceneState(this.scene));
    this.stateMap.set(
        'resolveCombat', new ResolveCombatGridSceneState(this.scene));

    this.createInitialEventHandlers();

    this.activeState = 'planning';
  }

  createInitialEventHandlers() {
    const planningState = this.stateMap.get('planning');

    this.scene.events.on('planning', () => {
      if (this.activeState !== 'planning') return;

      console.log('Planning being handled');

      // TODO:
      // const actions = planningState.getActions();
      // Create action states for each action in actions
      // Modify stateIDs
      // Modify stateMap
      // Register complete handlers for newly created actions

      this.activeState = 'resolveCombat';
      (this.stateMap.get('resolveCombat') as GridSceneState).entry();
    });

    this.scene.events.on('resolveCombat', () => {
      if (this.activeState !== 'resolveCombat') return;

      console.log('Resolve combat being handled');

      // TODO:
      // If combat should be resolved
      // resolve the combat and end scene
      // else

      this.activeState = 'planning';
      (this.stateMap.get('planning') as GridSceneState).entry();
    });
  }
}
