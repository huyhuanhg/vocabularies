import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const updateReviewedAt = createAsyncThunk(
  "user/reviewed_at",
  async ({ user }: { user: string }) => {
    try {
      return await updateDoc(doc(db, "users", user), {
        reviewed_at: serverTimestamp(),
      });
    } catch (e) {
      return Promise.reject();
    }
  }
);
