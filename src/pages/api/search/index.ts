// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type WordItem = {
  audio_uk: string;
  audio_us: string;
  phonetic_uk: string;
  phonetic_us: string;
  position: string;
  detail: WordDetail[];
  content: string;
};

type WordDetail = {
  id: number;
  en_sentence: string;
  vi_sentence: string;
  trans: string;
  status: string;
};

const fetchWord = async (text: string) => {
  const apiUrl =
    "https://mochien3.1-api.mochidemy.com/v3.1/words/dictionary-english";
  const queryString = new URLSearchParams({
    key: text,
    search_positions: "first_search",
    // user_token: '',
    // uuid: '',
  });
  return fetch(`${apiUrl}?${queryString}`, {
    headers: {
      privatekey: "M0ch1M0ch1_En_$ecret_k3y",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.clone().json();
      }

      return Promise.resolve(null);
    })
    .then(({ data }) => {
      const {
        suggests,
        vi,
        ids,
      }: { suggests: string[]; vi: any[]; ids: number[] } = data;
      return {
        search: text.toLowerCase(),
        suggests,
        ids: ids.map((id) => `${id}`),
        data: vi.map(
          ({
            audio_uk,
            audio_us,
            phonetic_uk,
            phonetic_us,
            position,
            detail,
            content,
          }: WordItem) => ({
            content,
            audio_uk,
            audio_us,
            ipa_uk: phonetic_uk,
            ipa_us: phonetic_us,
            type: position,
            detail: detail.map(
              ({ id, en_sentence, trans, vi_sentence }: WordDetail) => ({
                id,
                en_sentence,
                trans,
                vi_sentence,
              })
            ),
          })
        ),
      };
    })
    .catch(() => Promise.resolve(null));
};

const getWordIdByIds = async (user: string, ids: string[]) => {
  const q = query(
    collection(db, "word_storages"),
    where("vocabulary_id", "in", ids),
    where("user", "==", user)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map(
    (docSnapshot) => docSnapshot.data().vocabulary_id
  );
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const requestData = req.query;
    const responseData = await fetchWord(requestData.q as string);

    if (!responseData) {
      res.status(200).json({
        status: "success",
        data: {
          suggests: [],
          data: [],
        },
      });
    }

    let cloneData: any[] = [...(responseData!.data || [])];
    if (requestData.user && cloneData.length > 0) {
      const userInfo: any = await getDoc(
        doc(db, "users", requestData.user as string)
      ).then((user) => (user.exists() ? user.data() : null));

      if (!userInfo) {
        res.status(400).json({ status: "fail" });
      }

      const { email, primary_email } = userInfo;
      requestData.user = primary_email || email;

      const wordStorages = await getWordIdByIds(
        requestData.user as string,
        responseData!.ids
      );
      cloneData = cloneData.map((data) => ({
        ...data,
        detail: data.detail.map((detailData: any) => ({
          ...detailData,
          savedFlg: wordStorages.includes(`${detailData.id}`),
        })),
      }));
    }

    res.status(200).json({
      status: "success",
      data: {
        content: responseData?.search || null,
        ids: responseData!.ids ?? [],
        suggests: responseData!.suggests ?? [],
        data: cloneData ?? [],
      },
    });
  } catch (e) {
    res.status(400).json({ status: "fail" });
  }
}
