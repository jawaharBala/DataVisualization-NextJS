import { configureStore } from "@reduxjs/toolkit";
import { customReducer } from "./reducers";

const Store = configureStore({
  reducer: { custom:customReducer },
});

export default Store;
