import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import type { NextApiRequest, NextApiResponse } from "next";
import moment from "moment";

const random = (array: number[]) => {
  const result: any = {};
  for(let i = 0; i < array.length; i++) {
    let randIndex = Math.floor(Math.random() * array.length);
    while(result.hasOwnProperty(`key_${randIndex}`)) {
      randIndex = Math.floor(Math.random() * array.length)
    }

    result[`key_${randIndex}`] = array[randIndex]
  }

  return Object.values(result)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let reviewCount = 0;

    const userInfo = await getDoc(doc(db, "users", req.query.user as string));
    const reviewedAt = userInfo.data()?.reviewed_at ? moment(userInfo.data()?.reviewed_at.toDate()) : undefined;

    if (
      reviewedAt &&
      reviewedAt.isAfter(moment().subtract({ hours: 1 }))
    ) {
      res.status(200).json({
        status: "success",
        data: {
          count: 0,
          ids: [],
          reviewed_at: reviewedAt.format("DD/MM/YYYY HH:mm:ss")
        },
      });

      return;
    }

    const now = new Date();
    const reviewOneStarCount = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", req.query.user),
        where("last_seen", "<=", new Date(now.getTime() - 6 * 3600 * 1000))
      )
    );

    const reviewIds = reviewOneStarCount.docs
      .filter((doc) => doc.data().rate < 5)
      .map((item: any) => item.data().vocabulary_id);

    reviewCount += reviewIds.length;

    res.status(200).json({
      status: "success",
      data: {
        count: reviewCount,
        ids: random(reviewIds),
        reviewed_at: reviewedAt ? reviewedAt.format("DD/MM/YYYY HH:mm:ss") : null
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
