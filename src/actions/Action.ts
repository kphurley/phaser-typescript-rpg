import {Entity} from '../entities/Entity';

export interface Action {
  // Extract to class/interface
  config: {name: string, initiative: number, range: number};
  entity: Entity;
  error?: string;

  isValid(): boolean;
  execute(): void;
}
