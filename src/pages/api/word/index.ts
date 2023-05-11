// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import { getPattern } from "@/helpers/word";
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

const addVocabulary = async (data: any) => {
  try {
    return await setDoc(
      doc(db, "vocabularies", data.id.toString()),
      {
        id: data.id.toString(),
        content: data.content.toLowerCase(),
        type: data.type,
        ipa_us: data.ipa_us,
        audio_us: data.audio_us,
        en_sentence: data.en_sentence,
        vi_sentence: data.vi_sentence,
        translate: data.trans,
        last_seen: serverTimestamp(),
        pattern: getPattern(data.content, data.en_sentence)
      },
      { merge: true }
    );
  } catch (error: any) {
    // add report

    const message = error.message
    return Promise.reject("ERROR SET VOCABULARY IN DB");
  }
};

const addWordStorage = async (data: any) => {
  try {
    const wordStorageRef = collection(db, "word_storages");

    return await setDoc(
      doc(db, "word_storages", `${data.user}_${data.id}`),
      {
        id: `${data.user}_${data.id}`,
        vocabulary_id: data.id,
        user: data.user,
        rate: increment(0),
        last_seen: serverTimestamp(),
        reviewed_flg: true,
      },
      { merge: true }
    );
  } catch (error: any) {
    if (error?.code !== "unavailable") {
      // add report

      return Promise.reject("ERROR SET WORD STORAGE IN DB");
    }
  }
};

const isWordStorageAdded = async ({ user, id }: any) => {
  const wordDoc = await getDoc(doc(db, "word_storages", `${user}_${id}`));

  return wordDoc.exists();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  const data = JSON.parse(q as string);

  if (await isWordStorageAdded(data)) {
    res.status(200).json({ status: "success" });
  }

  // add vocabulary
  await addVocabulary(data);
  await addWordStorage(data);

  // if (! requestData.user) {
  //   return res.status(401).end();
  // }

  res.status(200).json({ status: "success" });
}
