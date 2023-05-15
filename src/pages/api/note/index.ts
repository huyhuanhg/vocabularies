import {
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/configs/firebase";
import type { NextApiRequest, NextApiResponse } from "next";

const getCursorDocSnapshot = async (id: string) => {
  return await getDoc(doc(db, "word_storages", id));
}

const getWordStorageByLevel = async (getQuery: Function, ...props: any) => {
  const coll = collection(db, "word_storages");
  const q = getQuery(coll, ...props)
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data())
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

    const { email, primary_email } = userInfo
    userQuery = primary_email || email

    const {level: levelQueryString, limit: limitQueryString, afterAt, keyword } = req.query

    const level = /^[1-5]$/.test(levelQueryString as string) ? Number(levelQueryString) : null

    if (level === null) {
      res.status(400).json({ status: "fail" });
      return
    }

    let querySnapshot = (coll: Query<unknown>, ...props: any) => query(
      coll,
      where("rate", ">", 3.6),
      where("rate", "<", 5),
      ...props
    )

    switch(level) {
      case 1: {
        querySnapshot = (coll: Query<unknown>, ...props) =>
        query(
          coll,
          where("rate", "<=", 1),
        ...props
        )
        break;
      }
      case 2: {
        querySnapshot = (coll: Query<unknown>, ...props) =>
        query(
          coll,
          where("rate", ">", 1),
          where("rate", "<=", 2.2),
          ...props
        )
        break;
      }
      case 3: {
        querySnapshot = (coll: Query<unknown>, ...props) => query(
          coll,
          where("rate", ">", 2.2),
          where("rate", "<=", 3.6),
          ...props
        )
        break;
      }
      case 4: {
        querySnapshot = (coll: Query<unknown>, ...props) => query(
          coll,
          where("rate", ">", 3.6),
          where("rate", "<", 5),
          ...props
        )
        break;
      }
    }

    const options: any[] = [
      where("user", "==", userQuery),
      orderBy("rate"),
      limit(Number(limitQueryString as string) || 100),
    ]

    if(afterAt) {
      options.push(startAfter(await getCursorDocSnapshot(afterAt as string)))
    }

    if(keyword) {
      //false
      options.push(where("content", '==', keyword as string))
    }

    const wordStorages = await getWordStorageByLevel(
      querySnapshot,
      ...options
    )

    if (wordStorages.length === 0) {
      res.status(200).json({
        status: "success",
        data: [],
      });

      return;
    }

    const vocabularies = await getDocs(
      query(
        collection(db, "vocabularies"),
        where(
          "id",
          "in",
          wordStorages.map(({ vocabulary_id } : any) => `${vocabulary_id}`)
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

    const wordStorageResponseData = JSON.parse(
      JSON.stringify(
        wordStorages.map(
          ({ id, rate, vocabulary_id }: any) => {
            return {
              id,
              rate,
              calcRate: level,
              vocabulary_id,
              content: vocabularyData[vocabulary_id].content,
              translate: vocabularyData[vocabulary_id].translate,
              en_sentence: vocabularyData[vocabulary_id].en_sentence,
              vi_sentence: vocabularyData[vocabulary_id].vi_sentence,
              audio_us: vocabularyData[vocabulary_id].audio_us,
              type: vocabularyData[vocabulary_id].type,
              ipa_us: vocabularyData[vocabulary_id].ipa_us,
              pattern: vocabularyData[vocabulary_id].pattern
            };
          }
        )
      )
    );
    res.status(200).json({ status: "success", data: wordStorageResponseData });
  } catch (error) {
    res.status(400).json({ status: "fail" });
  }
}
