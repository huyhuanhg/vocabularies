import { Image } from "@/components/common";
import Container, * as Style from "./Search.style";
import Layout from "@/layouts/VocabularyLayout";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchSearch, saveWord } from "@/stores/search/action";
import { ButtonEffect, LoadingRing } from "@/components/common";
import { useRouter } from "next/router";
import { getPattern } from "@/helpers/sentence";
import parse from "html-react-parser";
import { playSentenceAudio as playSentenceAudioHelper } from "@/helpers/sentence";

const Search = ({ user }: any) => {
  const [formState, setFormState] = useState("");
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const {
    caching,
    data: searchData,
    suggests,
    loading,
    saveWordLoadingId,
  } = useSelector(({ searchReducer }: Record<string, any>) => searchReducer);

  useEffect(() => {
    const q = router.query.q;
    if (typeof q === "string" && q) {
      setFormState(q);
    }

    return () => {
      dispatch({ type: "search/reset" });
    };
  }, []);

  useEffect(() => {
    if (router.query.q) {
      const keyword = (router.query.q as string).trim().toLowerCase();
      if (caching.hasOwnProperty(keyword)) {
        dispatch({
          type: "search/renderCache",
          payload: { ...caching[keyword] },
        });
      } else {
        dispatch(
          fetchSearch({
            user: user.email,
            keyword: (router.query.q as string).substring(0, 29),
          })
        );
      }
    }
  }, [router.query]);

  const handleChangeFormState = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(e.target.value);
  };

  const onSearch = (keyword?: string) => {
    const queryString = router.query.q;
    let state = keyword || formState;

    if (queryString === state) {
      return;
    }

    if (keyword) {
      setFormState(state);
    }

    router.push(`/search?q=${state.toLocaleLowerCase()}`);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const playAudio = (audioUrl?: string) => {
    if (!audioUrl) {
      return;
    }

    const audio = new Audio(audioUrl);
    audio.play().catch(() => {});
  };

  const handleSaveWord = (data: any) => {
    dispatch(saveWord({ user: user.email, data }));
  };

  const playSentenceAudio = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    sentence: string
  ) => {
    e.stopPropagation();
    playSentenceAudioHelper(sentence);
  };

  const renderSearchResult = (data: Record<string, any>[]) => {
    return (
      <Style.SearchResult>
        {data.map((resultItem, index) => {
          return (
            <Style.SearchDictionary key={index}>
              <p className="word-title">
                {resultItem.content} {resultItem.type && `(${resultItem.type})`}
              </p>
              <Style.SearchPhonetics>
                {resultItem.audio_uk && (
                  <div className="word-phonetic phonetic-uk">
                    <span>BrE</span>
                    <button
                      className="btn-play-audio"
                      onClick={() => playAudio(resultItem.audio_uk)}
                    >
                      <svg
                        width="19"
                        height="21"
                        viewBox="0 0 15 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.2674 6.2553C14.2674 8.30126 13.626 10.2507 12.4549 11.8681C12.3141 12.0626 12.0436 12.1051 11.8508 11.963C11.6581 11.8208 11.616 11.5479 11.7568 11.3534C12.8207 9.88419 13.4029 8.11464 13.4029 6.2553C13.4029 4.42328 12.8377 2.6782 11.8027 1.22116C11.6636 1.02535 11.7082 0.752834 11.9022 0.612475C12.0962 0.472115 12.3663 0.517064 12.5054 0.71287C13.6448 2.31691 14.2674 4.23942 14.2674 6.2553ZM10.5798 10.6392C11.399 9.45814 11.8461 8.04602 11.8461 6.56633C11.8461 5.0722 11.3902 3.64709 10.5561 2.45945C10.4181 2.26288 10.1483 2.21646 9.95349 2.35576C9.7587 2.49506 9.7127 2.76733 9.85074 2.96389C10.5819 4.00507 10.9815 5.25416 10.9815 6.56633C10.9815 7.86583 10.5896 9.10356 9.87152 10.139C9.73463 10.3364 9.78222 10.6084 9.97782 10.7465C10.1734 10.8846 10.4429 10.8366 10.5798 10.6392ZM9.52483 6.5672C9.52483 7.54022 9.22583 8.46905 8.6784 9.24538C8.53998 9.44167 8.27008 9.48757 8.07557 9.34788C7.88105 9.2082 7.83558 8.93584 7.97399 8.73955C8.4181 8.10976 8.66029 7.35741 8.66029 6.5672C8.66029 5.76413 8.41012 5.00026 7.95249 4.36467C7.81216 4.16976 7.85497 3.89696 8.0481 3.75535C8.24124 3.61374 8.51157 3.65694 8.6519 3.85184C9.21598 4.63527 9.52483 5.57832 9.52483 6.5672ZM2.85523 4.729C4.05969 3.65496 5.96759 4.50993 5.96759 6.12371V6.80345C5.96759 8.41723 4.05969 9.2722 2.85523 8.19816V7.89529C2.58687 8.08612 2.25872 8.19833 1.90435 8.19833C0.997152 8.19833 0.261719 7.46289 0.261719 6.55569V6.37179C0.261719 5.46459 0.997152 4.72916 1.90435 4.72916C2.25872 4.72916 2.58687 4.84137 2.85523 5.0322V4.729Z"
                        ></path>
                      </svg>
                    </button>
                    <div className="phonetic-text">{resultItem.ipa_uk}</div>
                  </div>
                )}
                {resultItem.audio_us && (
                  <div className="word-phonetic phonetic-us">
                    <span>NAmE</span>
                    <button
                      className="btn-play-audio"
                      onClick={() => playAudio(resultItem.audio_us)}
                    >
                      <svg
                        width="19"
                        height="21"
                        viewBox="0 0 15 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M14.2674 6.2553C14.2674 8.30126 13.626 10.2507 12.4549 11.8681C12.3141 12.0626 12.0436 12.1051 11.8508 11.963C11.6581 11.8208 11.616 11.5479 11.7568 11.3534C12.8207 9.88419 13.4029 8.11464 13.4029 6.2553C13.4029 4.42328 12.8377 2.6782 11.8027 1.22116C11.6636 1.02535 11.7082 0.752834 11.9022 0.612475C12.0962 0.472115 12.3663 0.517064 12.5054 0.71287C13.6448 2.31691 14.2674 4.23942 14.2674 6.2553ZM10.5798 10.6392C11.399 9.45814 11.8461 8.04602 11.8461 6.56633C11.8461 5.0722 11.3902 3.64709 10.5561 2.45945C10.4181 2.26288 10.1483 2.21646 9.95349 2.35576C9.7587 2.49506 9.7127 2.76733 9.85074 2.96389C10.5819 4.00507 10.9815 5.25416 10.9815 6.56633C10.9815 7.86583 10.5896 9.10356 9.87152 10.139C9.73463 10.3364 9.78222 10.6084 9.97782 10.7465C10.1734 10.8846 10.4429 10.8366 10.5798 10.6392ZM9.52483 6.5672C9.52483 7.54022 9.22583 8.46905 8.6784 9.24538C8.53998 9.44167 8.27008 9.48757 8.07557 9.34788C7.88105 9.2082 7.83558 8.93584 7.97399 8.73955C8.4181 8.10976 8.66029 7.35741 8.66029 6.5672C8.66029 5.76413 8.41012 5.00026 7.95249 4.36467C7.81216 4.16976 7.85497 3.89696 8.0481 3.75535C8.24124 3.61374 8.51157 3.65694 8.6519 3.85184C9.21598 4.63527 9.52483 5.57832 9.52483 6.5672ZM2.85523 4.729C4.05969 3.65496 5.96759 4.50993 5.96759 6.12371V6.80345C5.96759 8.41723 4.05969 9.2722 2.85523 8.19816V7.89529C2.58687 8.08612 2.25872 8.19833 1.90435 8.19833C0.997152 8.19833 0.261719 7.46289 0.261719 6.55569V6.37179C0.261719 5.46459 0.997152 4.72916 1.90435 4.72916C2.25872 4.72916 2.58687 4.84137 2.85523 5.0322V4.729Z"
                        ></path>
                      </svg>
                    </button>
                    <div className="phonetic-text">{resultItem.ipa_us}</div>
                  </div>
                )}
              </Style.SearchPhonetics>
              <Style.WordDetailList>
                {resultItem.detail.map((wordDetail: Record<string, any>) => {
                  let pattern = "";
                  try {
                    pattern = getPattern(
                      resultItem.content,
                      wordDetail.en_sentence
                    );
                  } catch (e) {}

                  let enSentence = wordDetail.en_sentence || "";

                  if (pattern) {
                    const searchReg = new RegExp(
                      `(^|\\W)(${pattern})(\\W|$)`,
                      "i"
                    );
                    enSentence = enSentence.replace(
                      searchReg,
                      (matches: string) =>
                        matches.replace(
                          pattern,
                          `<span className="word_primary">${pattern}</span>`
                        )
                    );
                  }

                  return (
                    <Style.WordDetailItem key={wordDetail.id as string}>
                      <div className="detail-translate">
                        <p className="txt-trans">{wordDetail.trans}</p>
                        <ButtonEffect
                          cssType="text"
                          space={2}
                          disabled={
                            wordDetail.savedFlg || saveWordLoadingId !== null
                          }
                          state="active"
                          click={() => {
                            const { audio_us, content, type, ipa_us } =
                              resultItem;
                            return (
                              !wordDetail.savedFlg &&
                              handleSaveWord({
                                ...wordDetail,
                                audio_us,
                                content,
                                type,
                                ipa_us,
                              })
                            );
                          }}
                        >
                          <div
                            className={
                              saveWordLoadingId !== wordDetail.id
                                ? undefined
                                : "loading"
                            }
                          >
                            <svg
                              width="15"
                              height="16"
                              viewBox="0 0 13 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M7 0.5C3.41023 0.5 0.5 3.41023 0.5 7C0.5 10.5898 3.41023 13.5 7 13.5C10.5898 13.5 13.5 10.5898 13.5 7C13.5 3.41023 10.5898 0.5 7 0.5ZM9.81745 5.90091C9.86933 5.84161 9.90883 5.77253 9.93362 5.69774C9.95841 5.62294 9.96799 5.54395 9.9618 5.4654C9.95561 5.38685 9.93377 5.31033 9.89757 5.24035C9.86137 5.17036 9.81154 5.10833 9.75101 5.05788C9.69047 5.00744 9.62047 4.96961 9.5451 4.94663C9.46974 4.92364 9.39054 4.91596 9.31216 4.92403C9.23378 4.93211 9.15781 4.95578 9.08871 4.99365C9.01962 5.03152 8.95879 5.08282 8.90982 5.14455L6.36891 8.19305L5.05414 6.87768C4.94269 6.77004 4.79342 6.71048 4.63849 6.71183C4.48356 6.71318 4.33535 6.77532 4.22579 6.88488C4.11623 6.99444 4.05408 7.14265 4.05274 7.29758C4.05139 7.45252 4.11095 7.60178 4.21859 7.71323L5.99132 9.48595C6.04938 9.54398 6.11889 9.58927 6.19543 9.61894C6.27196 9.64862 6.35384 9.66202 6.43584 9.65829C6.51784 9.65457 6.59817 9.6338 6.6717 9.59731C6.74523 9.56082 6.81035 9.50941 6.86291 9.44636L9.81745 5.90091Z"
                              ></path>
                            </svg>
                            <p className="word-action-btn-label">
                              {wordDetail.savedFlg ? "Đã lưu" : "Lưu từ"}
                            </p>
                          </div>
                        </ButtonEffect>
                      </div>
                      <div className="result-sentence">
                        <div className="word-sentence en-sentence">
                          {parse(enSentence)}
                        </div>
                        <div className="word-sentence vi-sentence">
                          {wordDetail.vi_sentence}
                        </div>
                        {wordDetail.en_sentence && (
                          <div className="WordDetailItem__word-audio">
                            <ButtonEffect
                              space={2}
                              click={(
                                e: MouseEvent<
                                  HTMLButtonElement,
                                  globalThis.MouseEvent
                                >
                              ) => playSentenceAudio(e, wordDetail.en_sentence)}
                            >
                              <Image
                                className="icon-btn-answer"
                                src="/sound-answer.svg"
                                width={20}
                                height={20}
                                alt="icon-btn-answer"
                              />
                            </ButtonEffect>
                          </div>
                        )}
                      </div>
                    </Style.WordDetailItem>
                  );
                })}
              </Style.WordDetailList>
            </Style.SearchDictionary>
          );
        })}
      </Style.SearchResult>
    );
  };

  const renderSuggests = (suggests: string[]) => {
    return (
      <Style.Suggests>
        <p className="suggest-title">Từ ngữ liên quan</p>
        <Style.SuggestWrapper>
          {suggests.map((suggest, index) => (
            <ButtonEffect
              key={`suggest_${suggest}_${index}`}
              cssType="text"
              space={4}
              click={() => onSearch(suggest)}
            >
              {suggest}
            </ButtonEffect>
          ))}
        </Style.SuggestWrapper>
      </Style.Suggests>
    );
  };

  return (
    <Layout>
      <Container>
        {loading && <LoadingRing />}
        <Style.Header>
          <Style.InputSearch>
            <input
              type="text"
              placeholder="Gõ vào đây từ bạn muốn tra cứu"
              maxLength={29}
              autoFocus
              value={formState}
              onChange={handleChangeFormState}
              onKeyDown={handleEnter}
            />
            <button onClick={() => onSearch()}>
              <Image src="/search.png" alt="search" width={30} height={30} />
            </button>
          </Style.InputSearch>
        </Style.Header>
        <Style.Body>
          {suggests?.length === 0 && searchData?.length === 0 && (
            <Style.Empty>
              <Image src="/note.png" alt="search" width={300} height={300} />
            </Style.Empty>
          )}
          {searchData?.length > 0 && renderSearchResult(searchData)}
          {suggests?.length > 0 && renderSuggests(suggests)}
        </Style.Body>
      </Container>
    </Layout>
  );
};

export default Search;
