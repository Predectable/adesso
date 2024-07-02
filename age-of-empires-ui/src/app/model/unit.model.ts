import { Age } from './age.model';
import { Cost } from './cost.model';
import { Expansion } from './expansion.model';
import { UnitType } from './unit-type.model';

export interface Unit {
  uuid: string;
  buildTime: number;
  reloadTime: number;
  attackDelay: number;
  movementRate: number;
  lineOfSight: number;
  hitPoints: number;
  range: string;
  attack: number;
  armor: string;
  accuracy: string;
  id: number;
  age: Age;
  costs: Cost[];
  expansion: Expansion;
  unitType: UnitType;
}
