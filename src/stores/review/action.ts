import { db } from "@/configs/firebase";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { Query, addDoc, collection, and, getCountFromServer, getDocs, increment, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import moment from "moment";

const getCountWordStorage = async (getQuery: Function) => {
  const coll = collection(db, "word_storages");
  const q = getQuery(coll);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count
}

export const fetchReviewData = createAsyncThunk('review/index', async ({ user }: { user: string }) => {
  try {
    // get vocabulary 1*
    const oneStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) => query(coll, where("user", "==", user), where("rate", "<=", 1))
    )
    // get vocabulary 2*
    const twoStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) => query(coll, where("user", "==", user), where("rate", ">", 1), where("rate", "<=", 2.2))
    )
    // get vocabulary 3*
    const threeStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) => query(coll, where("user", "==", user), where("rate", ">", 2.2), where("rate", "<=", 3.6))
    )
    // get vocabulary 4*
    const fourStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) => query(coll, where("user", "==", user), where("rate", ">", 3.6), where("rate", "<", 5))
    )
    // get vocabulary 5*
    const fiveStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) => query(coll, where("user", "==", user), where("rate", ">=", 5))
    )

    let reviewCount = 0

    const now = new Date()
    const reviewOneStarCount = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", user),
        where("last_seen", "<=", new Date(now.getTime() - 6 * 3600 * 1000))
        )
    )

    const reviewData = reviewOneStarCount.docs.filter((doc) => doc.data().rate < 5)

    reviewCount += reviewData.length

    return Promise.resolve({
      count: {
        one: oneStarVocabularyCount,
        two: twoStarVocabularyCount,
        three: threeStarVocabularyCount,
        four: fourStarVocabularyCount,
        five: fiveStarVocabularyCount,
        review: reviewCount
      }
    })
  } catch (error) {
    return Promise.reject("ERROR")
  }
})
