import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  data:[],

};
export const customReducer = createReducer(initialState, {
  updateProducts: (state, action) => {
    state.data = action.payload;
  },


});

