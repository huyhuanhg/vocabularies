import WaitDevelop from "@/components/WaitDevelop";
import Container, * as Style from "./Note.style";
import Layout from "@/layouts/VocabularyLayout";
import NoteNavigation from "@/components/NoteNavigation";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNote } from "@/stores/note/action";
import { LoadingRing, LoadingSpinner } from "@/components/common";

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
  const scrollBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { level } = router.query;
    const currentLevel = Number(level as string) || 1;
    console.log("currentLevel :>> loadMore", currentLevel);
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

  useEffect(() => {
    scrollBarRef.current?.scrollTo(0, 0);
    const { level } = router.query;
    const currentLevel = Number(level as string) || 1;
    console.log("currentLevel :>> router.query.level", currentLevel);
    if (
      paginator.hasOwnProperty(currentLevel) &&
      !paginator[currentLevel].isFetchedAll
    ) {
      console.log('add :>> ');
      scrollBarRef.current?.addEventListener("scroll", handleLoadMore);
    }
    return () => {
      dispatch({ type: "note/resetLoadMore" });
    };
  }, [router.query.level]);

  useEffect(() => {
    const { level } = router.query;
    const currentLevel = Number(level as string) || 1;
    if (
      paginator.hasOwnProperty(currentLevel) &&
      paginator[currentLevel].isFetchedAll
    ) {
      console.log('remove :>> ');
      scrollBarRef.current?.removeEventListener("scroll", handleLoadMore);
    }
  }, [paginator]);

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
      return (
        <Style.NoteItem key={noteItem.id}>
          <div className="NoteItem__word-content">
            <p className="NoteItem__word-content--value">{noteItem.content}</p>
            <p className="NoteItem__word-content__ipa-us">{noteItem.ipa_us}</p>
          </div>
          <div className="NoteItem__word-type">
            <p>
              {noteItem.type ? `(${noteItem.type.substring(0, 5)})` : "---"}
            </p>
          </div>
          <div className="NoteItem__word-translate">
            <p title={noteItem.translate}>
              {noteItem.translate > 50
                ? `${noteItem.translate.substring(0, 50)}...`
                : noteItem.translate}
            </p>
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
