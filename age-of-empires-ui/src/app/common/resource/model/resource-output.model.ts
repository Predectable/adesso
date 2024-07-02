export class ResourceOutput {
  enable!: boolean;
  minValue!: number;
  maxValue!: number;

  constructor(isEnable: boolean, min: number, max: number) {
    this.enable = isEnable;
    this.minValue = min;
    this.maxValue = max;
  }
}
