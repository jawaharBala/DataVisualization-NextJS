import { Climatedata } from '../../models/interfaces';
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data:[] as Climatedata[],
  currentData:[] as Climatedata[],
  decadeYears:[] as number[],
  decadeData:[] as Climatedata[],
  year:"" as string,
  categories:[] as string[],
  riskFactors:[] as string[],
  locations:[] as object[],
  assetNames:[] as string[]
};
export const customReducer = createReducer(initialState, {
  updateData: (state, action) => {
    state.data = action.payload;
  },
  updateCurrentData: (state, action) => {
    state.currentData = action.payload;
  },
  updateDecadeYears: (state, action) => {
    state.decadeYears = action.payload;
  },
  updateDecadeData: (state, action) => {
    state.decadeData = action.payload;
  },
  updateYear: (state, action) => {
    state.year = action.payload;
  },
  updateCategories: (state, action) => {
    state.categories = action.payload;
  },
  updateRiskFactors: (state, action) => {
    state.riskFactors = action.payload;
  },
  updateLocations: (state, action) => {
    state.locations = action.payload;
  },
  updateAssetNames: (state, action) => {
    state.assetNames = action.payload;
  },
  


});