// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from "@/configs/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import type { NextApiRequest, NextApiResponse } from "next";

type RequestData = {
  origTxt?: string;
  user?: string;
};

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

const getWordIdByIds = async (user: string, ids: number[]) => {
  const q = query(
    collection(db, "word_storages"),
    where("id", "in", ids),
    where("user", "==", user)
  );

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => docSnapshot.id);
};

const fetchGGTrans = async (text: string) => {
  const ggTransUrl = "https://translate.googleapis.com/translate_a/single";

  const queryString = new URLSearchParams({
    client: "dict-chrome-ex",
    sl: "en",
    tl: "vi",
    hl: "en-US",
    dt: "t",
    // dt:'bd',
    dj: "1",
    source: "bubble",
    q: text,
  });

  return fetch(`${ggTransUrl}?${queryString}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.resolve(null);
    })
    .then(({ sentences }) => {
      if (!sentences || !Array.isArray(sentences) || sentences.length === 0) {
        return null;
      }

      // return sentences.map(({ trans, orig }) => ({ trans, orig }));
      return sentences.reduce(
        (preValue, currentValue) => {
          return {
            originTxt: `${preValue.originTxt} ${currentValue.orig}`
              .replaceAll(/\s\s+/g, " ")
              .trim(),
            transTxt: `${preValue.transTxt} ${currentValue.trans}`
              .replaceAll(/\s\s+/g, " ")
              .trim(),
          };
        },
        { originTxt: "", transTxt: "" }
      );
    })
    .catch(() => Promise.resolve(null));
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
      const { suggests, vi, ids } = data;
      return {
        search: text,
        suggests,
        ids,
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

const renderPhonetic = (
  title: string,
  phonetic: string,
  audioUrl: string,
  color: string
) => {
  return `
  <div class="voca-ex-phonetic" data-disabled-mousedown="voca-ext">
    <p class="voca-ex-text" data-disabled-mousedown="voca-ext">${title}</p>
    <div class="voca-ex-audio" data-disabled-mousedown="voca-ext" source="${audioUrl}">
      <svg width="19" height="21" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg"
        data-disabled-mousedown="voca-ext">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M14.2674 6.2553C14.2674 8.30126 13.626 10.2507 12.4549 11.8681C12.3141 12.0626 12.0436 12.1051 11.8508 11.963C11.6581 11.8208 11.616 11.5479 11.7568 11.3534C12.8207 9.88419 13.4029 8.11464 13.4029 6.2553C13.4029 4.42328 12.8377 2.6782 11.8027 1.22116C11.6636 1.02535 11.7082 0.752834 11.9022 0.612475C12.0962 0.472115 12.3663 0.517064 12.5054 0.71287C13.6448 2.31691 14.2674 4.23942 14.2674 6.2553ZM10.5798 10.6392C11.399 9.45814 11.8461 8.04602 11.8461 6.56633C11.8461 5.0722 11.3902 3.64709 10.5561 2.45945C10.4181 2.26288 10.1483 2.21646 9.95349 2.35576C9.7587 2.49506 9.7127 2.76733 9.85074 2.96389C10.5819 4.00507 10.9815 5.25416 10.9815 6.56633C10.9815 7.86583 10.5896 9.10356 9.87152 10.139C9.73463 10.3364 9.78222 10.6084 9.97782 10.7465C10.1734 10.8846 10.4429 10.8366 10.5798 10.6392ZM9.52483 6.5672C9.52483 7.54022 9.22583 8.46905 8.6784 9.24538C8.53998 9.44167 8.27008 9.48757 8.07557 9.34788C7.88105 9.2082 7.83558 8.93584 7.97399 8.73955C8.4181 8.10976 8.66029 7.35741 8.66029 6.5672C8.66029 5.76413 8.41012 5.00026 7.95249 4.36467C7.81216 4.16976 7.85497 3.89696 8.0481 3.75535C8.24124 3.61374 8.51157 3.65694 8.6519 3.85184C9.21598 4.63527 9.52483 5.57832 9.52483 6.5672ZM2.85523 4.729C4.05969 3.65496 5.96759 4.50993 5.96759 6.12371V6.80345C5.96759 8.41723 4.05969 9.2722 2.85523 8.19816V7.89529C2.58687 8.08612 2.25872 8.19833 1.90435 8.19833C0.997152 8.19833 0.261719 7.46289 0.261719 6.55569V6.37179C0.261719 5.46459 0.997152 4.72916 1.90435 4.72916C2.25872 4.72916 2.58687 4.84137 2.85523 5.0322V4.729Z"
          data-disabled-mousedown="voca-ext" fill="${color}"></path>
      </svg>
    </div>
    <p style="margin-left:10px" class="voca-ex-phonetic-text" data-disabled-mousedown="voca-ext">${phonetic}</p>
  </div>
  `;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData: RequestData = req.query;

  let result = "";

  if (!requestData.origTxt) {
    return res.end();
  }

  if (requestData.origTxt.length >= 30) {
    const responseData = await fetchGGTrans(requestData.origTxt);
    if (responseData) {
      result = `
      <div id="voca_dom_gg_search" data-disabled-mousedown="voca-ext">
        <div class="voca-sentences-list" data-disabled-mousedown="voca-ext" data-content="voca-js-content">
          <div data-disabled-mousedown="voca-ext" class="box_content_voca_extension-scroll voca-sentences-origin">
            <span data-disabled-mousedown="voca-ext">${responseData.originTxt}</span>
          </div>
          <div data-disabled-mousedown="voca-ext" class="box_content_voca_extension-scroll voca-sentences-trans">
            <span data-disabled-mousedown="voca-ext">${responseData.transTxt}</span>
          </div>
        </div>
      </div>`;
    }
  } else {
    const responseData = await fetchWord(requestData.origTxt);

    if (responseData) {
      if (Array.isArray(responseData.data) && responseData.data.length > 0) {
        const savedWords: string[] = requestData.user
          ? await getWordIdByIds(requestData.user, responseData.ids)
          : [];

        const data = responseData.data.map((wordItem) => {
          return {
            ...wordItem,
            detail: wordItem.detail.map((wordDetail: WordDetail) => {
              return {
                ...wordDetail,
                status: requestData.user
                  ? savedWords.findIndex(
                      (wordId) => Number(wordId) === wordDetail.id
                    ) === -1
                    ? "free"
                    : "saved"
                  : undefined,
              };
            }),
          };
        });
        const wordItemTxt = data.reduce((result, dataItem) => {
          let phoneticTxt = "";

          if (dataItem.ipa_uk) {
            phoneticTxt += renderPhonetic(
              "BrE",
              dataItem.ipa_uk,
              dataItem.audio_uk,
              "#2F80ED"
            );
          }
          if (dataItem.ipa_us) {
            phoneticTxt += renderPhonetic(
              "NAmE",
              dataItem.ipa_us,
              dataItem.audio_us,
              "#EB5757"
            );
          }

          let wordDetailTxt = `<div data-disabled-mousedown="voca-ext" class="voca-word-detail-list">${dataItem.detail.reduce(
            (wordItemListResult: string, wordDetail: WordDetail) => {
              wordItemListResult += `
              <div class="voca-translate-detail-item" data-disabled-mousedown="voca-ext">
                <div class="voca-detai-translate" data-disabled-mousedown="voca-ext">
                  <p class="voca-text-translate" data-disabled-mousedown="voca-ext">${
                    wordDetail.vi_sentence
                  } (${dataItem.type})</p>
                  <div class="voca-word-action-btns" data-disabled-mousedown="voca-ext">
                  ${
                    wordDetail.status !== undefined
                      ? wordDetail.status === "saved"
                        ? `
                        <button style="display:none!important" class="voca-save-word-has-saved" data-disabled-mousedown="voca-ext">
                          <svg width="15" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                            data-disabled-mousedown="voca-ext">
                            <path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd"
                              d="M7 0.5C3.41023 0.5 0.5 3.41023 0.5 7C0.5 10.5898 3.41023 13.5 7 13.5C10.5898 13.5 13.5 10.5898 13.5 7C13.5 3.41023 10.5898 0.5 7 0.5ZM9.81745 5.90091C9.86933 5.84161 9.90883 5.77253 9.93362 5.69774C9.95841 5.62294 9.96799 5.54395 9.9618 5.4654C9.95561 5.38685 9.93377 5.31033 9.89757 5.24035C9.86137 5.17036 9.81154 5.10833 9.75101 5.05788C9.69047 5.00744 9.62047 4.96961 9.5451 4.94663C9.46974 4.92364 9.39054 4.91596 9.31216 4.92403C9.23378 4.93211 9.15781 4.95578 9.08871 4.99365C9.01962 5.03152 8.95879 5.08282 8.90982 5.14455L6.36891 8.19305L5.05414 6.87768C4.94269 6.77004 4.79342 6.71048 4.63849 6.71183C4.48356 6.71318 4.33535 6.77532 4.22579 6.88488C4.11623 6.99444 4.05408 7.14265 4.05274 7.29758C4.05139 7.45252 4.11095 7.60178 4.21859 7.71323L5.99132 9.48595C6.04938 9.54398 6.11889 9.58927 6.19543 9.61894C6.27196 9.64862 6.35384 9.66202 6.43584 9.65829C6.51784 9.65457 6.59817 9.6338 6.6717 9.59731C6.74523 9.56082 6.81035 9.50941 6.86291 9.44636L9.81745 5.90091Z"
                              fill="black" data-disabled-mousedown="voca-ext"></path>
                          </svg>
                          <p style="margin-left: 5px;margin-bottom:0;margin-top:0;font-size:1em;color:#9b9b9b"
                            data-disabled-mousedown="voca-ext">Đã lưu</p>
                        </button>`
                        : `
                        <button class="voca-save-word" data-disabled-mousedown="voca-ext" value="${wordDetail.id}">
                          <svg width="15" height="16" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg"
                            data-disabled-mousedown="voca-ext">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M6.5 0.5C2.91023 0.5 0 3.41023 0 7C0 10.5898 2.91023 13.5 6.5 13.5C10.0898 13.5 13 10.5898 13 7C13 3.41023 10.0898 0.5 6.5 0.5ZM7.09091 9.36364C7.09091 9.52036 7.02865 9.67066 6.91784 9.78147C6.80702 9.89229 6.65672 9.95455 6.5 9.95455C6.34328 9.95455 6.19298 9.89229 6.08217 9.78147C5.97135 9.67066 5.90909 9.52036 5.90909 9.36364V7.59091H4.13636C3.97965 7.59091 3.82935 7.52865 3.71853 7.41784C3.60771 7.30702 3.54545 7.15672 3.54545 7C3.54545 6.84328 3.60771 6.69298 3.71853 6.58216C3.82935 6.47135 3.97965 6.40909 4.13636 6.40909H5.90909V4.63636C5.90909 4.47964 5.97135 4.32934 6.08217 4.21853C6.19298 4.10771 6.34328 4.04545 6.5 4.04545C6.65672 4.04545 6.80702 4.10771 6.91784 4.21853C7.02865 4.32934 7.09091 4.47964 7.09091 4.63636V6.40909H8.86364C9.02036 6.40909 9.17066 6.47135 9.28147 6.58216C9.39229 6.69298 9.45455 6.84328 9.45455 7C9.45455 7.15672 9.39229 7.30702 9.28147 7.41784C9.17066 7.52865 9.02036 7.59091 8.86364 7.59091H7.09091V9.36364Z"
                              fill="white" data-disabled-mousedown="voca-ext"></path>
                          </svg>
                          <p style="margin-left: 5px;margin-bottom:0;margin-top:0;font-size:1em;color:white"
                            data-disabled-mousedown="voca-ext">Lưu từ</p>
                        </button>`
                      : ""
                  }
                  </div>
                </div>
                <div class="voca-word-sentence" data-disabled-mousedown="voca-ext">${
                  wordDetail.en_sentence
                }</div>
              </div>`;

              return wordItemListResult;
            },
            ""
          )}</div>`;
          result += `
          <div data-disabled-mousedown="voca-ext" class="voca-word-main">
            <p data-disabled-mousedown="voca-ext" class="voca-text-title">${dataItem.content}</p>
            <div data-disabled-mousedown="voca-ext" class="voca-word-phonetic-list">${phoneticTxt}</div>
            <div data-disabled-mousedown="voca-ext" class="voca-word-detail-list">${wordDetailTxt}</div>
          </div>`;

          return result;
        }, "");

        result = `<div data-disabled-mousedown="voca-ext" class="voca-word-list">${wordItemTxt}</div>`;
      } else if (
        Array.isArray(responseData.suggests) &&
        responseData.suggests.length > 0
      ) {
        result = `
        <div class="voca-suggest-wrapper">
          <p>Có phải bạn đang tìm từ này?</p>
          ${responseData.suggests.reduce((suggestTxtResult, suggest) => {
            suggestTxtResult += `<p class="voca-suggest-word" id="mochi-suggest-word-2" value="${suggest}">${suggest}</p>`;
            return suggestTxtResult;
          }, "")}
        </div>`;
      }
    }
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "POST");
  res.write(result);
  res.end();
}
