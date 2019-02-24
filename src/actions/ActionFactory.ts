import {PlayerEntity} from '../entities/player/PlayerEntity';

import {Action} from './Action';
import {AttackAction} from './AttackAction';
import {MoveAction} from './MoveAction';

function getActionInstance(entity: PlayerEntity, skillName: string): Action {
  switch (skillName) {
    case 'move':
    case 'quickMove':
      return new MoveAction(entity, skillName);
    case 'swing':
      return new AttackAction(entity, skillName);
    default:
      throw new Error('Skill not found, cannot create action instance');
  }
}

export class ActionFactory {
  private instance: Action;

  constructor(entity: PlayerEntity, skillName: string) {
    this.instance = getActionInstance(entity, skillName);
  }

  getInstance(): Action {
    return this.instance;
  }
}
