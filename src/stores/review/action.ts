import { db } from "@/configs/firebase";
import WordStorageType from "@/types/entities/WordStorageType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

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
      let currentRate = wordStorage.rate ? Number(Number(wordStorage.rate).toFixed(1)) : 0
      currentRate = currentRate > 5 ? 5 : currentRate;

      const rateRound = Math.round(currentRate)

      let rate = 0
      if (isTrue) {
        rate = currentRate + .5 - (rateRound / 30)
      } else {
        rate = currentRate <= 0 ? 0 : (currentRate - Number(Number(rateRound * .05).toFixed(1)))
      }

      rate = Number(Number(rate).toFixed(1))

      return await updateDoc(doc(db, "word_storages", wordStorage.id), {
        rate,
        review_flg: rate < 5,
        last_seen: isTrue ? serverTimestamp() : new Date((new Date()).getTime() - 2 * 3600 * 1000),
      });
    } catch (e) {
      return Promise.reject();
    }
  }
);

export const removeReview = createAsyncThunk(
  "review/remove",
  async ({ id }: { id: string }) => {
    try {
      return await updateDoc(doc(db, "word_storages", id), {
        rate: 0,
        review_flg: false,
      });
    } catch (e) {
      return Promise.reject();
    }
  }
)

export const addReport = createAsyncThunk(
  "review/report",
  async ({user, message, data}: any) => {
    try {
      return await addDoc(collection(db, "reports"), {
        user,
        message,
        data: JSON.stringify(data),
        created_at: serverTimestamp(),
      });
    } catch (e) {
      return Promise.reject();
    }
  }
)