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
import { Arr } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let reviewCount = 0;

    const userInfo = await getDoc(doc(db, "users", req.query.user as string));
    const reviewedAt = userInfo.data()?.reviewed_at
      ? moment(userInfo.data()?.reviewed_at.toDate())
      : undefined;

    if (reviewedAt && reviewedAt.isAfter(moment().subtract({ hours: 1 }))) {
      res.status(200).json({
        status: "success",
        data: {
          count: 0,
          ids: [],
          reviewed_at: reviewedAt.format("DD/MM/YYYY HH:mm:ss"),
          vocabularies: [],
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

    const ids = Arr.randomOrder(reviewIds).map((id) => `${id}`);

    const vocabularies = await getDocs(
      query(collection(db, "vocabularies"), where("id", "in", ids))
    );

    res.status(200).json({
      status: "success",
      data: {
        count: reviewCount,
        ids,
        reviewed_at: reviewedAt
          ? reviewedAt.format("DD/MM/YYYY HH:mm:ss")
          : null,
        vocabularies: vocabularies.docs.map((vocabulary) => vocabulary.data()),
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
