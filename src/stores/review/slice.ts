import { createSlice } from "@reduxjs/toolkit";
import { fetchReviewCount, fetchReviewData, updateReviewWord } from "./action";

const initialState: any = {
  count: [
    {
      label: "1",
      value: 0,
      color: "#EB5757",
      isShowValue: true,
    },
    {
      label: "2",
      value: 0,
      color: "#FFCB08",
      isShowValue: true,
    },
    {
      label: "3",
      value: 0,
      color: "#56CCF2",
      isShowValue: true,
    },
    {
      label: "4",
      value: 0,
      color: "#2F80ED",
      isShowValue: true,
    },
    {
      label: "5",
      value: 0,
      color: "#213782",
      isShowValue: true,
    },
  ],

  review: {
    count: 0,
    wordStorages: [],
    loading: false,
    countDown: 0,
    updateInfo: {
      loading: false
    },
  },
  isFirstFetched: false
};

const review = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchReviewData.fulfilled, (state, { payload }) => {
      const { one, two, three, four, five, review, } = payload.count;
      const now = Date.now()
      const count = [...state.count].map((countItem) => {
        switch (countItem.label) {
          case "1":
            return {
              ...countItem,
              value: one,
            };
          case "2":
            return {
              ...countItem,
              value: two,
            };
          case "3":
            return {
              ...countItem,
              value: three,
            };
          case "4":
            return {
              ...countItem,
              value: four,
            };
          default:
            return {
              ...countItem,
              value: five,
            };
        }
      })

      return {
        ...state,
        count,
        review: {
          ...state.review,
          count: review,
          countDown: payload.countDown === 0 ? 0 : now + payload.countDown,
          loading: false
        },
        isFirstFetched: true
      };
    });
    builder.addCase(fetchReviewData.rejected, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          loading: false,
        },
      };
    });
    builder.addCase(fetchReviewData.pending, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          loading: true,
        },
      };
    });
    builder.addCase(fetchReviewCount.fulfilled, (state, { payload }) => {
      const { wordStorages, count } = payload;
      return {
        ...state,
        review: {
          ...state.review,
          count,
          wordStorages,
          loading: false,
        },
      };
    });
    builder.addCase(fetchReviewCount.pending, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          loading: true,
        },
      };
    });
    builder.addCase(fetchReviewCount.rejected, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          loading: false,
        },
      };
    });
    builder.addCase(updateReviewWord.pending, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          updateInfo: {
            ...state.review.updateInfo,
            loading: true
          },
        },
      };
    });
    builder.addCase(updateReviewWord.fulfilled, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          updateInfo: {
            ...state.review.updateInfo,
            loading: false
          },
        },
      };
    });
    builder.addCase(updateReviewWord.rejected, (state) => {
      return {
        ...state,
        review: {
          ...state.review,
          updateInfo: {
            ...state.review.updateInfo,
            loading: false
          },
        },
      };
    });
  },
});

export default review.reducer;
