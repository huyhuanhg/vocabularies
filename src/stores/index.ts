import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";

const reducer = combineReducers({
  authReducer,
});

const store = configureStore({
  reducer,
});

export default store;
