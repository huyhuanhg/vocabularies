import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReviewData = createAsyncThunk(
  "review/index",
  async ({ user }: { user: string }) => {
    return fetch(`/api/review/star?user=${user}`)
      .then((res) => res.json())
      .then(({ data }) => data)
      .catch(() => Promise.reject("ERROR"));
  }
);

export const fetchReviewCount = createAsyncThunk(
  "review/count",
  async ({ user }: { user: string }) => {
    return fetch(`/api/review/count?user=${user}`)
      .then((res) => res.json())
      .then(({ data }) => data)
      .catch(() => Promise.reject("ERROR"));
  }
);
