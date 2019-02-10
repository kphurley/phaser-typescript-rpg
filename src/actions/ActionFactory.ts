import {PlayerEntity} from '../entities/player/PlayerEntity';

import {Action} from './Action';
import {MoveAction} from './MoveAction';

export class ActionFactory {
  // This class should take a 'skillName' from a state
  // and return an instance of the appropriate Action
  private INSTANCE_MAP = {'move': MoveAction, 'quickMove': MoveAction};

  instance: Action;

  constructor(entity: PlayerEntity, skillName: string) {
    const klass = this.INSTANCE_MAP[skillName];  // tslint:disable-line
    this.instance = new klass(entity, skillName);
  }

  getInstance(): Action {
    return this.instance;
  }
}
