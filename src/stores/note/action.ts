import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNote = createAsyncThunk(
  "note/index",
  async ({ user, data }: { user: string, data: Record<string, any> }) => {
    return fetch(`/api/note?user=${user}&limit=100&level=${data.level}&afterAt=${data.id || ''}&keyword=${data.keyword || ''}`)
      .then((res) => res.json())
      .then(({ status, data }) => {
        if(status === 'success') {
          return Promise.resolve({ data, isLoadMore: !!data.id });
        }

        return Promise.reject("ERROR");
      })
      .catch(() => Promise.reject("ERROR"));
  }
);
