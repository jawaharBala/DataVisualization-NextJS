import { Climatedata, InitialCenter } from './../../utils/interfaces';
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data:[] as Climatedata[],
  currentData:[] as Climatedata[],
  initialCenter:{} as InitialCenter
};
export const customReducer = createReducer(initialState, {
  updateData: (state, action) => {
    state.data = action.payload;
  },
  updateCurrentData: (state, action) => {
    state.data = action.payload;
  },
  updateInitialCenter: (state, action) => {
    state.data = action.payload;
  },

});

