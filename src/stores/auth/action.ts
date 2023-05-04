import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const fetchLogin = createAsyncThunk('auth/login', async ({ email, displayName, photoURL }: any) => {
  try {
    await setDoc(
      doc(db, "users", email as string),
      {
        email: email as string,
        full_name: displayName as string,
        photo_url: photoURL as string,
        last_seen: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("ERROR SET USER INFO IN DB", error);
    return Promise.reject("ERROR SET USER INFO IN DB")
  }

  return Promise.resolve({ email, displayName, photoURL })
})
