import {Action} from '../actions/Action';
import {ActionFactory} from '../actions/ActionFactory';
import {Entity} from '../entities/Entity';
import {PlayerEntity} from '../entities/player/PlayerEntity';
import {GridScene} from '../scenes/GridScene';

import {GridSceneState} from './GridSceneState';

export class PlanningGridSceneState extends GridSceneState {
  confirmUIContainer: Phaser.GameObjects.Container;
  playerEntities: Entity[];
  selectedEntity?: Entity;
  selectedSkillName?: string;

  constructor(scene: GridScene) {
    super(scene, 'planning');
    this.playerEntities = this.scene.hexagonGrid.getPlayerEntities();
    this.confirmUIContainer = this.addConfirmUIContainer();
  }

  entry() {
    this.playerEntities.forEach((entity) => {
      const pe = entity as PlayerEntity;
      pe.sprite.setInteractive();
      pe.sprite.on('pointerdown', () => {
        this.selectEntity(pe);
      });
    });

    this.scene.events.on(
        'skillSelected', (entity: PlayerEntity, skillName: string) => {
          this.confirmUIContainer.setVisible(true);
          this.selectedSkillName = skillName;
        });
  }

  exit() {
    // TODO - Cleanup the inputs/events/containers
  }

  getActions(): Array<Action|undefined> {
    return this.playerEntities.map(
        (entity) => (entity as PlayerEntity).queuedAction);
  }

  selectEntity(playerEntity: PlayerEntity) {
    if (playerEntity.hasConfirmedSkillSelection()) return;

    this.hideAllActionBars();
    this.confirmUIContainer.setVisible(false);
    playerEntity.setActionBarVisible(true);
    this.selectedEntity = playerEntity;
  }

  hideAllActionBars() {
    this.playerEntities.forEach((entity) => {
      (entity as PlayerEntity).setActionBarVisible(false);
    });
  }

  addConfirmUIContainer() {
    const confirmUIContainer = this.scene.add.container(800, 650);
    const confirmButton = this.scene.add.sprite(10, 10, 'confirm');
    confirmButton.setInteractive();
    confirmButton.on('pointerdown', this.handleSkillConfirmation.bind(this));

    confirmUIContainer.add(confirmButton);
    confirmUIContainer.setVisible(false);

    return confirmUIContainer;
  }

  handleSkillConfirmation() {
    const selectedPlayerEntity = this.selectedEntity as PlayerEntity;
    selectedPlayerEntity.confirmSkillSelection();

    const actionInstance =
        new ActionFactory(
            selectedPlayerEntity, this.selectedSkillName as string)
            .getInstance();
    selectedPlayerEntity.queueAction(actionInstance);

    const unconfirmedEntities =
        this.playerEntitiesWithUnconfirmedSkillSelection();
    if (unconfirmedEntities.length) {
      // if there's an available entity with an unconfirmed choice, select it
      this.selectEntity(unconfirmedEntities[0] as PlayerEntity);
    } else {
      // Otherwise, call exit() and emit the 'planning' event with the selected
      // actions, signifying this state should transition
      this.exit();
      this.scene.events.emit('planning');
    }
  }

  playerEntitiesWithUnconfirmedSkillSelection(): Entity[] {
    return this.playerEntities.filter(
        (entity) => (entity as PlayerEntity).hasUnconfirmedSkillSelection());
  }
}