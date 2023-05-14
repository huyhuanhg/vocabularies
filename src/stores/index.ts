import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import reviewReducer from "./review/slice";
import userReducer from "./user/slice";
import searchReducer from "./search/slice";

const reducer = combineReducers({
  authReducer,
  reviewReducer,
  userReducer,
  searchReducer
});

const store = configureStore({
  reducer,
});

export default store;
