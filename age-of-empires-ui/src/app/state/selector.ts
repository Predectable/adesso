import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IGeneralInitialState } from '../model/generalInitialState.model';

export const selectGeneralState =
  createFeatureSelector<IGeneralInitialState>('general');

export const selectAges = createSelector(
  selectGeneralState,
  (state: IGeneralInitialState) => state.ages
);

export const selectResources = createSelector(
  selectGeneralState,
  (state: IGeneralInitialState) => state.resources
);

export const selectSelectedUnit = createSelector(
  selectGeneralState,
  (state: IGeneralInitialState) => state.selectedUnit
);
