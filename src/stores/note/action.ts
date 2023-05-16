import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNote = createAsyncThunk(
  "note/index",
  async ({ user, data }: { user: string; data: Record<string, any> }) => {
    return fetch(
      `/api/note?user=${user}&limit=10&level=${data.level}&afterAt=${
        data.id || ""
      }&keyword=${data.keyword || ""}`
    )
      .then((res) => res.json())
      .then(({ status, data: responseData }) => {
        if (status === "success") {
          return Promise.resolve({
            data: responseData,
            isLoadMore: !!data.id,
            level: data.level,
            needCache: !data.keyword,
          });
        }

        return Promise.reject("ERROR");
      })
      .catch(() => Promise.reject("ERROR"));
  }
);
