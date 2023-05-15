import { createSlice } from "@reduxjs/toolkit";
import { fetchNote } from './action';

const initialState = {
  loading: false,
  data: []
};

const note = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNote.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchNote.fulfilled, (state, { payload }) => {
      const { data, isLoadMore } = payload;

      const cloneData: any = isLoadMore ? [...state.data, ...data] : [...data]

      return {
        ...state,
        data: cloneData,
        loading: false,
      };
    });

    builder.addCase(fetchNote.rejected, (state) => {
      return {
        ...state,
        loading: false,
      };
    });
  },
});

export default note.reducer;
