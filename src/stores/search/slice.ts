import { splice } from "./../../helpers/string/index";
import { createSlice } from "@reduxjs/toolkit";
import { fetchSearch, saveWord } from "./action";

const initialState = {
  loading: false,
  caching: {},
  suggests: [],
  ids: [],
  data: [],
  saveWordLoadingId: null,
  isError: false,
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSearch.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });
    builder.addCase(fetchSearch.fulfilled, (state, { payload }) => {
      const { content, data, ids, suggests } = payload;
      let caching: Record<string, any> = { ...state.caching };
      if (content && !caching.hasOwnProperty(content)) {
        caching[content] = {
          data,
          ids,
          suggests,
        };
      }

      return {
        ...state,
        caching,
        data,
        ids,
        suggests,
        loading: false,
        isError: false,
      };
    });

    builder.addCase(fetchSearch.rejected, (state) => {
      return {
        ...state,
        loading: false,
        isError: true,
      };
    });

    builder.addCase("search/renderCache", (state, { payload }: any) => {
      const { data, ids, suggests } = payload;
      return {
        ...state,
        data,
        ids,
        suggests,
      };
    });

    builder.addCase("search/reset", (state) => {
      return {
        ...state,
        data: [],
        ids: [],
        suggests: [],
      };
    });

    builder.addCase(saveWord.pending, (state, { meta }) => {
      const {
        arg: { data },
      } = meta;
      return {
        ...state,
        saveWordLoadingId: data.id,
      };
    });

    builder.addCase(saveWord.fulfilled, (state, { payload }: any) => {
      const { wordId, content } = payload;
      //update current and cache
      let cloneData = [...state.data];

      const dataIndex = cloneData.findIndex(
        (item: Record<string, any>) => item.content === content
      );
      if (dataIndex !== -1) {
        const dataItem: Record<string, any> = {
          ...(cloneData[dataIndex] as Record<string, any>),
        };
        const detailData = [...dataItem.detail];

        const itemIndex = detailData.findIndex(
          (detailItem: Record<string, any>) => detailItem.id === wordId
        );

        if (itemIndex !== -1) {
          detailData.splice(itemIndex, 1, {
            ...detailData[itemIndex],
            savedFlg: true,
          });
        }
        dataItem.detail = detailData;

        cloneData.splice(dataIndex, 1, dataItem as never);
      }

      let caching: Record<string, any> = { ...state.caching };

      if (content && caching.hasOwnProperty(content.toLowerCase())) {
        caching[content.toLowerCase()] = {
          ...caching[content.toLowerCase()],
          data: cloneData,
        };
      }
      return {
        ...state,
        caching,
        data: cloneData,
        saveWordLoadingId: null,
      };
    });

    builder.addCase(saveWord.rejected, (state) => {
      return {
        ...state,
        saveWordLoadingId: null,
      };
    });
  },
});

export default search.reducer;
