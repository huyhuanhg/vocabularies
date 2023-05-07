import { createSlice } from "@reduxjs/toolkit";
import { fetchReviewData } from "./action";

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
    data: [],
  },
};

const review = createSlice({
  name: "review",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchReviewData.fulfilled, (state, { payload }) => {
      const { one, two, three, four, five, review } = payload.count;

      return {
        ...state,
        count: [...state.count].map((countItem) => {
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
        }),
        review: {
          ...state.review,
          count: review,
        },
      };
    });
  },
});

export default review.reducer;
