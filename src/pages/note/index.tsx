import WaitDevelop from "@/components/WaitDevelop";
import Container, * as Style from "./Note.style";
import Layout from "@/layouts/VocabularyLayout";
import NoteNavigation from "@/components/NoteNavigation";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { fetchNote } from "@/stores/note/action";
import { LoadingRing } from "@/components/common";

const Note = ({ user }: any) => {
  const router = useRouter();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [formState, setFormState] = useState("");
  const { data: noteData, loading } = useSelector(
    ({ noteReducer }: Record<string, any>) => noteReducer
  );

  useEffect(() => {
    const { level, keyword } = router.query;
    const currentLevel = level || 1
    if (currentLevel && /[1-5]/.test(currentLevel as string)) {
      dispatch(
        fetchNote({ user: user.email, data: { level: currentLevel, keyword: (keyword as string || "").toLowerCase() } })
      );
    }
    setFormState(keyword as string || '')
  }, [router.query]);

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
    if ((router.query.keyword as string || "") === formState) {
      return
    }

    const searchQuery = {
      ...router.query,
      keyword: formState
    }

    router.push(`/note?${new URLSearchParams(searchQuery)}`)
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
          <div className="wrapper">
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
            </div>
          </div>
        </Style.Body>
      </Container>
    </Layout>
  );
};

export default Note;
