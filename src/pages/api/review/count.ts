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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const userInfo = await getDoc(doc(db, "users", req.query.user as string));
    const reviewedAt = userInfo.data()?.reviewed_at
      ? moment(userInfo.data()?.reviewed_at.toDate())
      : undefined;

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
    const reviewOneStarSnapshots = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", req.query.user),
        where("review_flg", "==", true),
        where("last_seen", "<=", new Date(now.getTime() - 6 * 3600 * 1000)),
        limit(31),
        orderBy("last_seen")
      )
    );

    const wordStorages = reviewOneStarSnapshots.docs.map((item: any) => {
      const { id, last_seen, rate, review_flg, user, vocabulary_id } =
        item.data();

      return {
        id,
        last_seen: last_seen?.seconds || null,
        rate,
        review_flg,
        user,
        vocabulary_id,
      };
    });

    if (wordStorages.length === 0) {
      res.status(200).json({
        status: "success",
        data: {
          count: 0,
          reviewed_at: reviewedAt
            ? reviewedAt.format("DD/MM/YYYY HH:mm:ss")
            : null,
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

    const vocabularyData = vocabularies.docs.map((vocabulary) => {
      const {
        id,
        content,
        translate,
        en_sentence,
        vi_sentence,
        audio_us,
        type,
        ipa_us,
      } = vocabulary.data();
      return {
        id,
        content,
        type,
        translate,
        ipa_us,
        audio_us,
        en_sentence,
        vi_sentence,
      };
    });

    const wordStorageResponseData = JSON.parse(
      JSON.stringify(
        wordStorages.map(
          ({ id, last_seen, rate, review_flg, user, vocabulary_id }) => {
            console.log("vocabularyData :>> ", vocabularyData);
            const vocabulary = vocabularyData.find(
              (vocabularyItem) => vocabulary_id === vocabularyItem.id
            );

            return !vocabulary || !review_flg
              ? undefined
              : {
                  id,
                  user,
                  rate,
                  last_seen,
                  review_flg,
                  vocabulary,
                };
          }
        )
      )
    );

    res.status(200).json({
      status: "success",
      data: {
        count: wordStorageResponseData.length,
        reviewed_at: reviewedAt
          ? reviewedAt.format("DD/MM/YYYY HH:mm:ss")
          : null,
        wordStorages: Arr.randomOrder(wordStorageResponseData),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "fail" });
  }
}
