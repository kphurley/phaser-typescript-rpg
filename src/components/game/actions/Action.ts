import {Entity} from '../entities/Entity';

export interface ActionConfig {
  id: string;
  name: string;
  initiative: number;
  range: number;
  modifier: number;
}

export interface Action {
  config?: ActionConfig;
  entity: Entity;
  error?: string;

  // How does this action change the scene's inputs?
  configureInputs(): void;

  // Actions must self-validate
  isValid(): boolean;

  // What actually executes the action
  execute(): void;

  // A hook into the scene's update call
  update(time: number, delta: number): void;

  // A callback for anything that needs doing once execution completes
  onExecuteComplete(callback: () => void): void;
}
