// TODO:  Use this to give the created action states unique IDs
import uuidv4 from 'uuid/v4'; // tslint:disable-line

import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';
import {PlanningGridSceneState} from './PlanningGridSceneState';
import {ResolveCombatGridSceneState} from './ResolveCombatGridSceneState';

export class GridSceneStateManager extends Phaser.Events.EventEmitter {
  activeState: string;
  scene: GridScene;
  stateIDs: string[];
  stateMap: Map<string, GridSceneState>;

  constructor(scene: GridScene) {
    super();

    this.scene = scene;
    this.stateIDs = ['planning', 'resolveCombat'];
    this.stateMap = new Map<string, GridSceneState>();
    this.activeState = 'planning';
  }

  init() {
    // TODO - Place enemies on the grid

    // Create starting states
    this.stateMap.set('planning', new PlanningGridSceneState(this.scene));
    this.stateMap.set(
        'resolveCombat', new ResolveCombatGridSceneState(this.scene));

    this.createInitialEventHandlers();

    (this.stateMap.get('planning') as GridSceneState).entry();
  }

  createInitialEventHandlers() {
    const planningState = this.stateMap.get('planning');

    this.scene.events.on('planning', () => {
      if (this.activeState !== 'planning') return;

      // TODO:
      // This is important - we'll be iterating over these and they'll
      // encapsulate a lot of stuff const actions = planningState.getActions();

      // Sort the actions by initiative

      // Create action states for each action in actions

      // Modify stateIDs
      // Modify stateMap

      // Register complete handlers for newly obtained actions
      // Ensure each handler selects the next in the list
      // And tha last one selects resolveCombat

      // Temporary - this should instead select the first action from the sorted
      // list
      this.activeState = 'resolveCombat';
      (this.stateMap.get('resolveCombat') as GridSceneState).entry();
    });

    this.scene.events.on('resolveCombat', () => {
      if (this.activeState !== 'resolveCombat') return;

      // TODO:
      // If combat should be resolved
      // resolve the combat and end scene
      // else go back to planning

      this.activeState = 'planning';
      const newPlanningState = new PlanningGridSceneState(this.scene);
      this.stateMap.set('planning', newPlanningState);
      newPlanningState.entry();
    });
  }
}
