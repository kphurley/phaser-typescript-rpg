import actionsConfig from '../config/actionsConfig.json';
import {SpriteEntity} from '../entities/SpriteEntity';
import {HexagonGridCell} from '../util/HexagonGridCell.js';

import {Action} from './Action';

export class MoveAction implements Action {
  entity: SpriteEntity;
  name: string;
  config: {name: string, initiative: number, range: number};
  destination: string;
  destinationPath?: Phaser.Curves.Path;

  error?: string;

  complete: () => void;

  constructor(entity: SpriteEntity, name: string) {
    this.entity = entity;
    this.name = name;
    this.destination = '';

    // TODO - Remove when we have a better way to deserialize JSON
    this.config = actionsConfig[this.name];  // tslint:disable-line

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
      console.log(`Destination ${destination} was set`);
    } else {
      this.error = 'Not a valid move destination';
      console.log(this.error);
    }
  }

  isValidDestination(destination: string): boolean {
    const entityAxialLocation = this.entity.location;
    const grid = this.entity.scene.hexagonGrid;

    return grid.isCellWithinRangeOf(
        entityAxialLocation, destination, this.config.range);
  }

  isValid() {
    return this.error ? false : true;
  }

  execute() {
    this.entity.moveAlong(this.destinationPath);  // pass complete callback?

    for (const [_, cell] of this.entity.scene.hexagonGrid.cellMap) {
      cell.sprite.off('pointerdown');
      cell.sprite.off('pointerover');
    }

    this.complete();
  }
}
