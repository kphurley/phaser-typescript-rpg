import {Entity} from '../entities/Entity';
import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class PlanningGridSceneState extends GridSceneState {
  selected?: Entity;

  constructor(scene: GridScene) {
    super(scene, 'planning');
  }

  entry() {
    // Configure input for this state
    const playerEntities = this.scene.hexagonGrid.getPlayerEntities();

    playerEntities.forEach((entity) => {
      const pe = entity as PlayerEntity;
      pe.sprite.setInteractive();
      pe.sprite.on('pointerdown', () => {
        this.hideAllActionBars();
        pe.setActionBarVisible(true);
        this.selected = pe;
      });
    });
    /*
        - When the action is selected the confirm button appears (not sure as of
       now how to do this)
        - Selecting confirm "locks in the choice"
        - The actual instance of Action should be stored as part of the data
       saved here
        - At this time, check to see if all choices are locked, if so, fire the
       complete event

        - Nothing on the grid should be interactable
    */
  }

  exit() {
    // Clear all input handlers
  }

  getActions() {
    // Return all of the selected actions
  }

  hideAllActionBars() {
    const entities = this.scene.hexagonGrid.getPlayerEntities();
    entities.forEach((entity) => {
      (entity as PlayerEntity).setActionBarVisible(false);
    });
  }
}