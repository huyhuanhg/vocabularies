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

    const vocabularies = await getDocs(
      query(collection(db, "vocabularies"), where("id", "in", reviewIds.map(id =>  `${id}`)))
    );

    const randomVocabularies = Arr.randomOrder(vocabularies.docs.map((vocabulary) => {
      const {id, content, translate, en_sentence, vi_sentence, audio_us, type, ipa_us} = vocabulary.data()
      return { id, content, type, translate, ipa_us, audio_us, en_sentence, vi_sentence }
    }))

    res.status(200).json({
      status: "success",
      data: {
        count: randomVocabularies.length,
        ids: randomVocabularies.map((vocabulary: any) => vocabulary.id),
        reviewed_at: reviewedAt
          ? reviewedAt.format("DD/MM/YYYY HH:mm:ss")
          : null,
        vocabularies: randomVocabularies,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
