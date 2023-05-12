import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { ids, user } = req.query;
    const vocabularyIds = JSON.parse(ids as string);

    const wordStorages = await getDocs(
      query(
        collection(db, "word_storages"),
        where("user", "==", user),
        where("vocabulary_id", "in", vocabularyIds.map((id: number) => `${id}`))
      )
    );

    res.status(200).json({
      status: "success",
      data: {
        ids: wordStorages.docs.map((wordStorage: any) => wordStorage.data().vocabulary_id)
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
