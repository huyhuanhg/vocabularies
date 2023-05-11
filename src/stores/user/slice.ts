import { createSlice } from "@reduxjs/toolkit";
import { updateReviewedAt } from "./action";

const initialState = {
  detail: {
    loading: false,
    data: []
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
  },
});

export default user.reducer;
