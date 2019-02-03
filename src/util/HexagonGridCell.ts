export class HexagonGridCell {
  offsetLocation: {x: number, y: number};
  pixelLocation: {x: number, y: number};
  spriteKey: string;
  contents?: Entity;

  constructor(
      offsetLocation: {x: number, y: number},
      pixelLocation: {x: number, y: number}, spriteKey: string,
      contents?: Entity) {
    this.offsetLocation = offsetLocation;
    this.pixelLocation = pixelLocation;
    this.spriteKey = spriteKey;
    this.contents = contents;
  }
}
