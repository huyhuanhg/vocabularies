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
    let userQuery = req.query.user;
    const userInfo: any = await getDoc(doc(db, "users", userQuery as string))
    .then((user) => user.exists() ? user.data() : null)

    if(!userInfo) {
      res.status(400).json({ status: "fail" });
    }

    const {email, primary_email, reviewed_at} = userInfo
    userQuery = primary_email || email

    // get vocabulary 1*
    const oneStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(coll, where("user", "==", userQuery), where("rate", "<=", 1))
    );

    // // get vocabulary 2*
    const twoStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", userQuery),
          where("rate", ">", 1),
          where("rate", "<=", 2.2)
        )
    );
    // // get vocabulary 3*
    const threeStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", userQuery),
          where("rate", ">", 2.2),
          where("rate", "<=", 3.6)
        )
    );
    // // get vocabulary 4*
    const fourStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(
          coll,
          where("user", "==", userQuery),
          where("rate", ">", 3.6),
          where("rate", "<", 5)
        )
    );
    // // get vocabulary 5*
    const fiveStarVocabularyCount = await getCountWordStorage(
      (coll: Query<unknown>) =>
        query(coll, where("user", "==", userQuery), where("rate", ">=", 5))
    );

    const starCount = {
      one: oneStarVocabularyCount,
      two: twoStarVocabularyCount,
      three: threeStarVocabularyCount,
      four: fourStarVocabularyCount,
      five: fiveStarVocabularyCount,
    };

    let reviewCount = 0;

    const reviewedAt = reviewed_at
      ? moment(reviewed_at.toDate())
      : null;

    const now = moment()
    if (reviewedAt && reviewedAt.isAfter(now.clone().subtract({ minutes: 10 }))) {
      res.status(200).json({
        status: "success",
        data: {
          count: {
            ...starCount,
            review: 0,
          },
          countDown: (600 - (now.unix() - reviewedAt.unix())) * 1000,
          reviewedAt: reviewedAt.unix(),
        },
      });

      return;
    }

    const hasReviewCount = await getCountWordStorage(() => query(
      collection(db, "word_storages"),
      where("user", "==", userQuery),
      where("review_flg", "==", true),
      where("last_seen", "<=", new Date((now.unix() - 3 * 3600) * 1000)),
      limit(31),
      orderBy("last_seen")
    ))

    reviewCount += hasReviewCount;

    let countDown = 0;
    if (reviewCount === 0) {
      const latestReview = await getDocs(query(
        collection(db, "word_storages"),
        where("user", "==", userQuery),
        where("review_flg", "==", true),
        where("last_seen", ">", new Date((now.unix() - 3 * 3600) * 1000)),
        limit(1),
        orderBy("last_seen")
      ))

      const lastSec = latestReview.docs.map((lastWord => {
        const { last_seen } = lastWord.data()
        return  last_seen.seconds
      }))

      if (lastSec.length > 0) {
        countDown = (3 * 3600 - (now.unix() - lastSec[0])) * 1000
      }
    }

    res.status(200).json({
      status: "success",
      data: {
        count: {
          ...starCount,
          review: reviewCount,
        },
        countDown,
        reviewedAt: reviewedAt ? reviewedAt.unix(): null,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
