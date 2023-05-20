import {
  collection,
  doc,
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
import { Arr } from "@/helpers";

const format = (item: any) => {
  const { id, last_seen, rate, review_flg, user, vocabulary_id } = item.data();

  return {
    id,
    last_seen: last_seen?.seconds || null,
    rate,
    review_flg,
    user,
    vocabulary_id,
  };
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // const userInfo = await getDoc(doc(db, "users", req.query.user as string));
    let userQuery = req.query.user;
    const userInfo: any = await getDoc(
      doc(db, "users", userQuery as string)
    ).then((user) => (user.exists() ? user.data() : null));

    if (!userInfo) {
      res.status(400).json({ status: "fail" });
    }

    const { email, primary_email, reviewed_at } = userInfo;
    const reviewedAt = reviewed_at ? moment(reviewed_at.toDate()) : undefined;

    userQuery = primary_email || email;

    if (reviewedAt && reviewedAt.isAfter(moment().subtract({ minutes: 10 }))) {
      res.status(200).json({
        status: "success",
        data: {
          count: 0,
          reviewed_at: reviewedAt.format("DD/MM/YYYY HH:mm:ss"),
          wordStorages: [],
        },
      });

      return;
    }

    const now = new Date();
    const reviewFiveStarSnapshots = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", userQuery),
        where("review_flg", "==", false),
        where("rate", ">=", 5),
        limit(Math.floor(Math.random() * 2 + 2)),
        orderBy("rate")
      )
    );

    const fiveStarWordStorages = reviewFiveStarSnapshots.docs.map(format);

    const reviewEnableSnapshots = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", userQuery),
        where("review_flg", "==", true),
        where("last_seen", "<=", new Date(now.getTime() - 3 * 3600 * 1000)),
        limit(30 - fiveStarWordStorages.length),
        orderBy("last_seen")
      )
    );

    const wordStorages = [
      ...reviewEnableSnapshots.docs.map(format),
      ...fiveStarWordStorages,
    ];

    if (wordStorages.length === 0) {
      res.status(200).json({
        status: "success",
        data: {
          count: 0,
          reviewed_at: reviewedAt ? reviewedAt.unix() : null,
          wordStorages: [],
        },
      });

      return;
    }

    const vocabularies = await getDocs(
      query(
        collection(db, "vocabularies"),
        where(
          "id",
          "in",
          wordStorages.map(({ vocabulary_id }) => `${vocabulary_id}`)
        )
      )
    );

    const vocabularyData: Record<string, any> = vocabularies.docs.reduce(
      (result, vocabularyDoc) => {
        const {
          id,
          content,
          translate,
          en_sentence,
          vi_sentence,
          audio_us,
          type,
          ipa_us,
          pattern,
        } = vocabularyDoc.data();
        return {
          ...result,
          [id]: {
            id,
            content,
            translate,
            en_sentence,
            vi_sentence,
            audio_us,
            type,
            ipa_us,
            pattern,
          },
        };
      },
      {}
    );

    const wordStorageResponseData = wordStorages
      .map(({ id, last_seen, rate, review_flg, user, vocabulary_id }) => {
        if (!vocabularyData[vocabulary_id]) {
          return undefined;
        }

        return {
          id,
          user,
          rate,
          last_seen,
          review_flg,
          vocabulary: vocabularyData[vocabulary_id],
        };
      })
      .filter((item) => item);

    res.status(200).json({
      status: "success",
      data: {
        count: wordStorageResponseData.length,
        reviewed_at: reviewedAt ? reviewedAt.unix() : null,
        wordStorages: Arr.randomOrder(wordStorageResponseData),
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
