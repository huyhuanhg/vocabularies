import Container, * as Style from "./Note.style";
import Layout from "@/layouts/VocabularyLayout";
import NoteNavigation from "@/components/NoteNavigation";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  ChangeEvent,
  KeyboardEvent,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNote } from "@/stores/note/action";
import { ButtonEffect, LoadingRing, LoadingSpinner } from "@/components/common";

const Note = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [formState, setFormState] = useState("");
  const {
    data: noteData,
    caching: cache,
    loading,
    paginator,
    loadMoreLoading,
  } = useSelector(({ noteReducer }: Record<string, any>) => noteReducer);
  const [loadMore, setLoadMore] = useState(false);
  const [currentActive, setCurrentActive] = useState("");

  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollBarRef.current?.addEventListener("scroll", handleLoadMore);
    return () => {
      dispatch({ type: "note/resetLoadMore" });
    };
  }, []);

  useEffect(() => {
    const { level } = router.query;
    const currentLevel = Number(level as string) || 1;
    if (
      !loadMoreLoading &&
      loadMore &&
      paginator.hasOwnProperty(currentLevel) &&
      !paginator[currentLevel].isFetchedAll
    ) {
      getLoadMore();
    }
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    scrollBarRef.current?.scrollTo(0, 0);
    const { level, keyword } = router.query;
    const currentLevel = level || 1;
    if (currentLevel && /[1-5]/.test(currentLevel as string)) {
      if (cache.hasOwnProperty(currentLevel) && !(keyword as string)) {
        dispatch({
          type: "note/renderCache",
          payload: { data: cache[currentLevel as string] },
        });
      } else {
        dispatch(
          fetchNote({
            user: user.email,
            data: {
              level: currentLevel,
              keyword: ((keyword as string) || "").toLowerCase(),
            },
          })
        );
      }
    }
    setFormState((keyword as string) || "");
  }, [router.query]);

  const handleLoadMore = (e: Event) => {
    const el = e.target as HTMLDivElement;
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      setLoadMore(true);
    }
  };

  const getLoadMore = () => {
    const { level, keyword } = router.query;
    const currentLevel = level || 1;
    dispatch(
      fetchNote({
        user: user.email,
        data: {
          level: currentLevel,
          keyword: ((keyword as string) || "").toLowerCase(),
          id: noteData[noteData.length - 1].id,
        },
      })
    );
  };

  const renderData = () =>
    noteData.map((noteItem: any) => {
      const audioRef = createRef<HTMLAudioElement>();
      const playAudio = (e: Event) => {
        e.stopPropagation();
        audioRef.current?.play().catch(() => {});
      };
      const getEnSentence = (sentence: string, pattern?: string): string => {
        if (!pattern) {
          return sentence;
        }
        const searchReg = new RegExp(`(^|\\W)(${pattern})(\\W|$)`, "i");

        return sentence.replace(searchReg, (matches: string) =>
          matches.replace(
            pattern,
            `<span className="word_primary">${pattern}</span>`
          )
        );
      };

      const collapse = (key: string) => {
        setCurrentActive(currentActive === key ? "" : key);
      };

      return (
        <Style.NoteItem
          key={noteItem.id}
          active={currentActive === noteItem.id}
        >
          <Style.NoteItemPanel
            className="NoteItem__Panel"
            onClick={() => collapse(noteItem.id)}
          >
            <div className="NoteItem__word-content">
              <p className="NoteItem__word-content--value">
                {noteItem.content}
              </p>
              <p className="NoteItem__word-content__ipa-us">
                {noteItem.ipa_us}
              </p>
            </div>
            <div className="NoteItem__word-type">
              <p>
                {noteItem.type ? `(${noteItem.type.substring(0, 5)})` : "---"}
              </p>
            </div>
            <div className="NoteItem__word-translate">
              <p title={noteItem.translate}>
                {noteItem.translate.length > 40
                  ? `${noteItem.translate.substring(0, 40)}...`
                  : noteItem.translate}
              </p>
            </div>
          </Style.NoteItemPanel>
          <div className="NoteItem__Panel--sub">
            <div className="NoteItem__word-more-info">
              <div className="NoteItem__word-sentence">
                <p className="NoteItem__word-en-sentence">
                  {parse(getEnSentence(noteItem.en_sentence, noteItem.pattern))}
                </p>
                <p className="NoteItem__word-vi-sentence">
                  {noteItem.vi_sentence}
                </p>
              </div>
              <div className="NoteItem__word-audio">
                <audio ref={audioRef} preload="auto" src={noteItem.audio_us} />
                <ButtonEffect space={2} click={playAudio}>
                  <Image
                    className="icon-btn-answer"
                    src="/sound-answer.svg"
                    width={25}
                    height={25}
                    alt="icon-btn-answer"
                  />
                </ButtonEffect>
              </div>
            </div>
          </div>
        </Style.NoteItem>
      );
    });

  const handleSearch = () => {
    if (((router.query.keyword as string) || "") === formState) {
      return;
    }

    const searchQuery = {
      ...router.query,
      keyword: formState,
    };

    router.push(`/note?${new URLSearchParams(searchQuery)}`);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChangeFormState = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState(e.target.value);
  };

  return (
    <Layout>
      <Container>
        {loading && <LoadingRing />}
        <NoteNavigation />

        <Style.Body>
          <div ref={scrollBarRef} className="wrapper">
            <Style.InputSearch>
              <input
                type="text"
                placeholder="Gõ vào đây từ bạn muốn tìm"
                maxLength={29}
                value={formState}
                onChange={handleChangeFormState}
                onKeyDown={handleEnter}
              />
              <button onClick={() => handleSearch()}>
                <Image src="/search.png" alt="search" width={30} height={30} />
              </button>
            </Style.InputSearch>
            <div className="content">
              {noteData?.length === 0 && (
                <Style.Empty>
                  <Image
                    src="/note.png"
                    alt="search"
                    width={300}
                    height={300}
                  />
                </Style.Empty>
              )}
              {renderData()}
              {loadMoreLoading && <LoadingSpinner />}
            </div>
          </div>
        </Style.Body>
      </Container>
    </Layout>
  );
};

export default Note;
