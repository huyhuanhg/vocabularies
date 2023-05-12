import { db } from "@/configs/firebase";
import WordStorageType from "@/types/entities/WordStorageType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

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

export const updateReviewWord = createAsyncThunk(
  "review/update",
  async ({ wordStorage, isTrue }: { wordStorage: WordStorageType; isTrue: boolean }) => {
    try {
      const rate = !isTrue
        ? !wordStorage.rate
          ? 0
          : wordStorage.rate - 0.2
        : !wordStorage.rate
        ? 0.2
        : wordStorage.rate + 0.2;
      return await updateDoc(doc(db, "word_storages", wordStorage.id), {
        rate,
        review_flg: rate < 5,
        last_seen: serverTimestamp(),
      });
    } catch (e) {
      return Promise.reject();
    }
  }
);
