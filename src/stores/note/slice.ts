import { createSlice } from "@reduxjs/toolkit";
import { fetchNote } from "./action";

const initialState = {
  loading: false,
  loadMoreLoading: false,
  data: [],
  caching: {},
  paginator: Array.from({ length: 5 }).reduce(
    (result: Record<string, any>, _, index) => {
      return { ...result, [index + 1]: { isFetchedAll: false } };
    },
    {}
  ),
};

const note = createSlice({
  name: "note",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchNote.pending,
      (
        state,
        {
          meta: {
            arg: { data },
          },
        }
      ) => {
        const isLoadMoreLoading = !!data.id;
        return {
          ...state,
          loading: !isLoadMoreLoading,
          loadMoreLoading: isLoadMoreLoading,
        };
      }
    );
    builder.addCase(fetchNote.fulfilled, (state, { payload }) => {
      const { data, isLoadMore, level, needCache } = payload;
      const cloneData: any = isLoadMore ? [...state.data, ...data] : [...data];
      const caching: Record<string, any> = { ...state.caching };
      caching[level] = cloneData;

      return {
        ...state,
        ...(needCache && { caching }),
        data: cloneData,
        loading: false,
        loadMoreLoading: false,
        paginator: {
          ...state.paginator,
          [level as number]: {
            isFetchedAll: data.length < 100,
          },
        },
      };
    });

    builder.addCase(fetchNote.rejected, (state) => {
      return {
        ...state,
        loading: false,
        loadMoreLoading: false,
      };
    });

    builder.addCase("note/renderCache", (state, { payload }: any) => {
      const { data } = payload;
      return {
        ...state,
        data,
      };
    });

    builder.addCase("note/resetLoadMore", (state) => {
      return {
        ...state,
        paginator: Array.from({ length: 5 }).reduce(
          (result: Record<string, any>, _, index) => {
            return { ...result, [index + 1]: { isFetchedAll: false } };
          },
          {}
        ),
      };
    });
  },
});

export default note.reducer;
