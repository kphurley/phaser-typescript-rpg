import {Entity} from '../entities/Entity';

export interface ActionConfig {
  id: string;
  name: string;
  initiative: number;
  range: number;
}

export interface Action {
  config?: ActionConfig;
  entity: Entity;
  error?: string;

  configureInputs(): void;
  isValid(): boolean;
  execute(): void;
  update(time: number, delta: number): void;

  onExecuteComplete(callback: () => void): void;
}
