// TODO:  Use this to give the created action states unique IDs
import uuidv4 from 'uuid/v4'; // tslint:disable-line

import {Action} from '../actions/Action';
import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridScene} from '../scenes/GridScene';

import {ActionGridSceneState} from './ActionGridSceneState';
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
    this.stateIDs = ['planning'];
    this.stateMap = new Map<string, GridSceneState>();
    this.activeState = 'planning';
  }

  init() {
    // Create starting state
    this.stateMap.set('planning', new PlanningGridSceneState(this.scene));
    this.createInitialEventHandlers();
    (this.stateMap.get('planning') as GridSceneState).entry();
  }

  invokeUpdate(time: number, delta: number) {
    (this.stateMap.get(this.activeState) as GridSceneState).update(time, delta);
  }

  generateActionStatesFrom(planningState: PlanningGridSceneState) {
    const actions = planningState.getActions();

    actions.sort((actionA, actionB) => {
      return (actionB as Action).config.initiative -
          (actionA as Action).config.initiative;
    });

    return actions.map(
        (action) =>
            new ActionGridSceneState(this.scene, action as Action, uuidv4()));
  }

  configureHandlersAndStateMapFor(actionStates: ActionGridSceneState[]) {
    this.stateIDs =
        this.stateIDs.concat(actionStates.map((state) => state.guid));

    actionStates.forEach((state) => {
      this.stateMap.set(state.guid, state);
    });

    this.stateIDs.forEach((guid, index) => {
      if (index === 0) return;

      this.scene.events.on(guid, () => {
        const nextState = this.stateIDs[index + 1] || 'resolveCombat';
        this.activeState = nextState;
        (this.stateMap.get(nextState) as GridSceneState).entry();
      });
    });
  }

  configureResolveCombatState() {
    this.stateIDs.push('resolveCombat');
    this.stateMap.set(
        'resolveCombat', new ResolveCombatGridSceneState(this.scene));

    this.scene.events.on('resolveCombat', () => {
      if (this.activeState !== 'resolveCombat') return;

      // TODO:
      // If combat should be resolved
      // resolve the combat and end scene
      // else go back to planning

      this.stateIDs = ['planning'];
      this.stateMap = new Map<string, GridSceneState>();
      this.activeState = 'planning';
      this.init();
    });
  }

  createInitialEventHandlers() {
    const planningState = this.stateMap.get('planning');

    this.scene.events.on('planning', () => {
      if (this.activeState !== 'planning') return;

      const actionStates = this.generateActionStatesFrom(
          planningState as PlanningGridSceneState);
      this.configureHandlersAndStateMapFor(actionStates);
      this.configureResolveCombatState();

      this.activeState = this.stateIDs[1];
      (this.stateMap.get(this.activeState) as GridSceneState).entry();
    });
  }
}
