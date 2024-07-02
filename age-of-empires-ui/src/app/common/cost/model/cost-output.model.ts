export class CostOutput {
  resourceTypeId!: number;
  minValue!: number;
  maxValue!: number;

  constructor(id: number, minValue: number, maxValue: number) {
    this.resourceTypeId = id;
    this.minValue = minValue;
    this.maxValue = maxValue;
  }
}
