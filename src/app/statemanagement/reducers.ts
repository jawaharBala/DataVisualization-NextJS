import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data:[],
  currentData:[]
};
export const customReducer = createReducer(initialState, {
  updateData: (state, action) => {
    state.data = action.payload;
  },
  updateCurrentData: (state, action) => {
    state.data = action.payload;
  },


});

