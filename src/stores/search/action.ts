import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearch = createAsyncThunk(
  "search/index",
  async ({ user, keyword }: { user: string, keyword: string }) => {
    return fetch(`/api/search?q=${keyword}&user=${user}`)
      .then((res) => res.json())
      .then(({ data }) => data)
      .catch(() => Promise.reject("ERROR"));
  }
);

export const saveWord = createAsyncThunk(
  "word/save",
  async ({ user, data }: { user: string, data: Record<string, any> }) => {
    return fetch(`/api/word?q=${JSON.stringify({...data, user})}`)
      .then((res) => res.json())
      .then(({ status }) => {
        if(status === 'success') {
          return Promise.resolve({ wordId: data.id, content: data.content });
        }

        return Promise.reject("ERROR");
      })
      .catch(() => Promise.reject("ERROR"));
  }
);
