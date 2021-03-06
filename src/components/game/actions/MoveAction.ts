import moveActionsConfig from '../config/moveActionsConfig.json';
import {EmptyEntity} from '../entities/EmptyEntity';
import {PlayerEntity} from '../entities/player/PlayerEntity.js';
import {SpriteEntity} from '../entities/SpriteEntity';
import {HexagonGridCell} from '../util/HexagonGridCell';

import {Action, ActionConfig} from './Action';

export class MoveAction implements Action {
  entity: SpriteEntity;
  name: string;
  config?: ActionConfig;
  destination: string;
  destinationPath?: Phaser.Curves.Path;
  parameterizedCurve?: {t: number, vec: Phaser.Math.Vector2};

  error?: string;

  complete: () => void;

  constructor(entity: SpriteEntity, name: string) {
    this.entity = entity;
    this.name = name;
    this.destination = '';

    this.config = moveActionsConfig.find(
        (config: ActionConfig) => config.id === this.name);

    // For bubbling up messages to UI
    this.error = undefined;

    // By default, the complete callback is a no-op
    // Unless explicitly set to do otherwise by
    // onExecuteComplete
    this.complete = () => {};
  }

  onExecuteComplete(complete: () => void) {
    this.complete = complete;
  }

  configureInputs() {
    const grid = this.entity.scene.hexagonGrid;

    const addInteractions = (sprite: Phaser.GameObjects.Sprite) => {
      sprite.setInteractive();
      sprite.on('pointerdown', () => {
        this.setMoveDestination(sprite.getData('cellData').asAxialString());

        if (this.isValid()) {
          this.entity.scene.hexagonGrid.deletePathLines();
          this.execute();
        }
      });

      sprite.on('pointerover', () => {
        const hexagonGrid = this.entity.scene.hexagonGrid;
        const goalCell = sprite.getData('cellData');
        const sceneCellMap = hexagonGrid.cellMap;
        const thisCell =
            sceneCellMap.get(this.entity.location) as HexagonGridCell;
        const path = thisCell.findPathToCell(goalCell);

        if (path.length) {
          hexagonGrid.deletePathLines();
          this.destinationPath = hexagonGrid.drawPath(path);
        }
      });
    };

    for (const [_, cell] of grid.cellMap) {
      addInteractions(cell.sprite);
    }
  }

  setMoveDestination(destination: string) {
    if (this.isValidDestination(destination)) {
      this.destination = destination;
      this.error = undefined;
    } else {
      this.error = 'Not a valid move destination';
      console.log(this.error);
    }
  }

  isValidDestination(destination: string): boolean {
    const entityAxialLocation = this.entity.location;
    const grid = this.entity.scene.hexagonGrid;

    if ((grid.cellMap.get(destination) as HexagonGridCell).isOccupied()) {
      return false;
    }

    return grid.isCellWithinRangeOf(
        entityAxialLocation, destination, (this.config as ActionConfig).range);
  }

  isValid() {
    return this.error ? false : true;
  }

  execute() {
    // TODO:  Convert this to the same event pattern as AttackAction
    for (const [_, cell] of this.entity.scene.hexagonGrid.cellMap) {
      cell.sprite.off('pointerdown');
      cell.sprite.off('pointerover');
    }

    this.parameterizedCurve = {t: 0, vec: new Phaser.Math.Vector2()};

    const tweenOnComplete = () => {
      this.parameterizedCurve = undefined;

      // Update the hex grid
      const grid = this.entity.scene.hexagonGrid;
      const previousLocation = this.entity.location;
      grid.assignEntityToGridLocation(this.entity, this.destination);
      grid.assignEntityToGridLocation(
          new EmptyEntity(this.entity.scene), previousLocation);

      (this.entity as PlayerEntity).setIdle();
      this.complete();
    };

    this.entity.scene.tweens.add({
      targets: this.parameterizedCurve,
      t: 1,
      duration: 1000,  // TODO - Extract to config
      onComplete: tweenOnComplete,
    });

    (this.entity as PlayerEntity).setWalking();
  }

  // A direct link to the scene's update loop
  // Update the sprite's position according to the running tween
  update(time: number, delta: number) {
    if (this.destinationPath && this.parameterizedCurve) {
      (this.destinationPath as Phaser.Curves.Path)
          .getPoint(this.parameterizedCurve.t, this.parameterizedCurve.vec);
      this.entity.sprite.setPosition(
          this.parameterizedCurve.vec.x, this.parameterizedCurve.vec.y);
    }
  }
}
