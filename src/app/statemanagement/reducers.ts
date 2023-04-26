import { Climatedata } from './../../utils/interfaces';
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data:[] as Climatedata[],
  currentData:[] as Climatedata[],
  decadeYears:[] as number[]
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

});