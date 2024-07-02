import { Resource } from './resource.model';

export interface Cost {
  id: number;
  amount: number;
  resourceType: Resource;
}
