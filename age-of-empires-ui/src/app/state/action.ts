import { createAction, props } from '@ngrx/store';
import { GENERAL_STATE_TYPES } from './types';
import { Age } from '../model/age.model';
import { Resource } from '../model/resource.model';
import { Unit } from '../model/unit.model';

export const setAges = createAction(
  GENERAL_STATE_TYPES.SET_AGES,
  props<{ ages: Age[] | undefined }>()
);

export const setResources = createAction(
  GENERAL_STATE_TYPES.SET_RESOURCE,
  props<{ resources: Resource[] | undefined }>()
);

export const setSelectedUnit = createAction(
  GENERAL_STATE_TYPES.SET_UNIT,
  props<{ unit: Unit | undefined }>()
);
