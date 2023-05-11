import {
  Query,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

const getCountWordStorage = async (getQuery: Function) => {
  const coll = collection(db, "word_storages");
  const q = getQuery(coll);
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const user = req.query.user;
    // get vocabulary 1*
    const oneStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(coll, where("user", "==", user), where("rate", "<=", 1))
    );
    // get vocabulary 2*
    const twoStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", user),
          where("rate", ">", 1),
          where("rate", "<=", 2.2)
        )
    );
    // get vocabulary 3*
    const threeStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", user),
          where("rate", ">", 2.2),
          where("rate", "<=", 3.6)
        )
    );
    // get vocabulary 4*
    const fourStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", user),
          where("rate", ">", 3.6),
          where("rate", "<", 5)
        )
    );
    // get vocabulary 5*
    const fiveStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(coll, where("user", "==", user), where("rate", ">=", 5))
    );

    const startCount = {
      one: oneStarVocabularyCount,
      two: twoStarVocabularyCount,
      three: threeStarVocabularyCount,
      four: fourStarVocabularyCount,
      five: fiveStarVocabularyCount,
    };

    let reviewCount = 0;

    const userInfo = await getDoc(doc(db, "users", req.query.user as string));
    const reviewedAt = userInfo.data()?.reviewed_at
      ? moment(userInfo.data()?.reviewed_at.toDate())
      : null;

    if (reviewedAt && reviewedAt.isAfter(moment().subtract({ minutes: 10 }))) {
      res.status(200).json({
        status: "success",
        data: {
          count: {
            ...startCount,
            review: 0,
          },
          reviewedAt: reviewedAt ? reviewedAt.unix(): null,
        },
      });

      return;
    }

    const now = new Date();
    const hasReviewCount = await getCountWordStorage(() => query(
      collection(db, "word_storages"),
      where("user", "==", user),
      where("review_flg", "==", true),
      where("last_seen", "<=", new Date(now.getTime() - 6 * 3600 * 1000)),
      limit(31),
      orderBy("last_seen")
    ))

    reviewCount += hasReviewCount;

    res.status(200).json({
      status: "success",
      data: {
        count: {
          ...startCount,
          review: reviewCount,
        },
        reviewedAt: reviewedAt ? reviewedAt.unix(): null,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
