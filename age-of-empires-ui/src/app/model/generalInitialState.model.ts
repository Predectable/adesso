import { Age } from './age.model';
import { Resource } from './resource.model';
import { Unit } from './unit.model';

export interface IGeneralInitialState {
  ages: Age[] | undefined;
  resources: Resource[] | undefined;
  selectedUnit: Unit | undefined;
}

export class GeneralInitialState implements IGeneralInitialState {
  ages: Age[] | undefined;
  resources: Resource[] | undefined;
  selectedUnit: Unit | undefined;

  constructor() {}
}
