// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import { getPattern } from "@/helpers/sentence";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

const logReports = async (user?: string, message?: string, data?: any) => {
  await addDoc(collection(db, "reports"), {
    user: user || "",
    message: message || "Error",
    data: JSON.stringify(data || null),
    created_at: serverTimestamp(),
  });
};

const addVocabulary = async (data: any) => {
  try {
    let pattern = "";

    if (data.en_sentence) {
      try {
        pattern = getPattern(data.content, data.en_sentence);
      } catch (error: any) {
        // add report
        await logReports(data.user, error.message, data);
      }
    }

    await setDoc(
      doc(db, "vocabularies", data.id.toString()),
      {
        id: `${data.id}`,
        content: data.content.toLowerCase(),
        type: data.type,
        ipa_us: data.ipa_us || "",
        audio_us: data.audio_us || "",
        en_sentence: data.en_sentence || "",
        vi_sentence: data.vi_sentence || "",
        translate: data.trans || "",
        last_seen: serverTimestamp(),
        pattern,
      },
      { merge: true }
    );

    return Promise.resolve({
      reviewed_flg: !!(pattern && data.en_sentence && data.trans),
    });
  } catch (error: any) {
    // add report
    await logReports(data.user, error.message, data);

    return Promise.reject("ERROR SET VOCABULARY IN DB");
  }
};

const addWordStorage = async (data: any, reviewed_flg: boolean) => {
  try {
    return await setDoc(
      doc(db, "word_storages", `${data.user}_${data.id}`),
      {
        id: `${data.user}_${data.id}`,
        content: data.content.toLowerCase(),
        vocabulary_id: `${data.id}`,
        user: data.user,
        rate: increment(0),
        last_seen: new Date((new Date()).getTime() - 2 * 3600 * 1000),
        review_flg: reviewed_flg,
      },
      { merge: true }
    );
  } catch (error: any) {
    // add report
    await logReports(data.user, error.message, data);
    return Promise.reject("ERROR SET WORD STORAGE IN DB");
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

  const userInfo: any = await getDoc(
    doc(db, "users", data.user as string)
  ).then((user) => (user.exists() ? user.data() : null));

  if (!userInfo) {
    res.status(400).json({ status: "fail" });
  }

  const { email, primary_email } = userInfo;
  data.user = primary_email || email;

  if (await isWordStorageAdded(data)) {
    res.status(200).json({ status: "success" });
  }

  // add vocabulary
  const vocabulary = await addVocabulary(data);
  await addWordStorage(data, vocabulary.reviewed_flg ?? false);

  res.status(200).json({ status: "success" });
}
