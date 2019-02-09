export abstract class Entity {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract isEmpty(): boolean;
}
