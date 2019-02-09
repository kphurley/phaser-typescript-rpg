import actionsConfig from '../config/actionsConfig.json';
import {SpriteEntity} from '../entities/SpriteEntity';

import {Action} from './Action';

export class MoveAction implements Action {
  entity: SpriteEntity;
  name: string;
  config: {name: string, initiative: number, range: number};
  destination: string;

  error?: string;

  constructor(entity: SpriteEntity, name: string) {
    this.entity = entity;
    this.name = name;
    this.destination = '';

    // TODO - Remove when we have a better way to deserialize JSON
    this.config = actionsConfig[this.name];  // tslint:disable-line

    // For bubbling up messages to UI
    this.error = undefined;
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
    this.entity.moveTo(this.destination);
  }
}
