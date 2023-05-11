import { createSlice } from "@reduxjs/toolkit";
import { updateReviewedAt } from "./action";
import { fetchReviewData } from "../review/action";

const initialState = {
  detail: {
    loading: false,
    reviewedAt: null,
    data: [],
  }
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateReviewedAt.pending, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: true
        }
      };
    });
    builder.addCase(updateReviewedAt.fulfilled, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false
        }
      };
    });
    builder.addCase(updateReviewedAt.rejected, (state) => {
      return {
        ...state,
        detail: {
          ...state.detail,
          loading: false
        }
      };
    });
    builder.addCase(fetchReviewData.fulfilled, (state, { payload }) => {
      const { reviewed_at } = payload;

      return {
        ...state,
        detail: {
          ...state.detail,
          reviewedAt: reviewed_at
        }
      };
    });
  },
});

export default user.reducer;
