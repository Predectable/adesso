import { createReducer, on } from '@ngrx/store';
import { GeneralInitialState } from '../model/generalInitialState.model';
import { setAges, setResources, setSelectedUnit } from './action';

const initialState = new GeneralInitialState();

export const generalReducer = createReducer(
  initialState,
  on(setAges, (state, action) => ({
    ...state,
    ages: action.ages,
  })),
  on(setResources, (state, action) => ({
    ...state,
    resources: action.resources,
  })),
  on(setSelectedUnit, (state, action) => ({
    ...state,
    selectedUnit: action.unit,
  }))
);
