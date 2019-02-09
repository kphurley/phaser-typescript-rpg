import {Entity} from '../entities/Entity';

export interface Action {
  entity: Entity;
  error?: string;

  isValid(): boolean;
  execute(): void;
}
