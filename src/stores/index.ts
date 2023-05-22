import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import authReducer from "./auth/slice";
import reviewReducer from "./review/slice";
import userReducer from "./user/slice";
import searchReducer from "./search/slice";
import noteReducer from "./note/slice";
import chatReducer from "./chat/slice";

const reducer = combineReducers({
  authReducer,
  reviewReducer,
  userReducer,
  searchReducer,
  noteReducer,
  chatReducer,
});

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
