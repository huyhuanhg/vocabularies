import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import reviewReducer from "./review/slice";

const reducer = combineReducers({
  authReducer,
  reviewReducer
});

const store = configureStore({
  reducer,
});

export default store;
