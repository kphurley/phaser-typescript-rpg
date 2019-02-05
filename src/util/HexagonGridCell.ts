export class HexagonGridCell {
  axialLocation: {q: number, r: number};
  offsetLocation: {col: number, row: number};
  pixelLocation: {x: number, y: number};
  spriteKey: string;
  contents?: Entity;

  constructor(
      axialLocation: {q: number, r: number},
      offsetLocation: {col: number, row: number},
      pixelLocation: {x: number, y: number}, spriteKey: string,
      contents?: Entity) {
    this.axialLocation = axialLocation;
    this.offsetLocation = offsetLocation;
    this.pixelLocation = pixelLocation;
    this.spriteKey = spriteKey;
    this.contents = contents;
  }
}
