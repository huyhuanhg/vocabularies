import styled, { css } from "styled-components";

const Container = styled.div`
  height: 100%;

  .NoteNavigation {
    background-color: #ddd;
  }
`;

export const InputSearch = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: #ddd;

  input {
    width: 100%;
    padding: 10px 40px 10px 20px;
    border-radius: 100px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    font-family: "Quicksand", sans-serif;
    font-weight: bold;
    font-size: 16px;
    background-color: #ddd;
    height: 50px;

    &:focus-visible {
      outline: none;
      border: 2px solid #ffba00;
    }
  }

  button {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
    border: none;
    background-color: unset;
    cursor: pointer;
  }
`;

export const Body = styled.div`
  height: calc(100% - 90px);
  overflow: hidden;
  .wrapper {
    height: 100%;
    overflow: auto;
    position: relative;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px #fafafa;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }

    .content {
      min-height: calc(100% - 70px);
      padding: 20px 10px;
    }

    .LoadingSpinner {
      width: 100%;
      position: relative;
      top: auto;
      left: auto;
      height: auto;
      margin: 20px 0 40px;
      background: none;
    }
  }
`;

export const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const audio = css`
  .NoteItem__word-audio {
    position: absolute;
    top: 10px;
    right: 10px;
    line-height: 0;
    .ButtonEffect {
      width: auto;
      .ButtonEffect__btn {
        padding: 0;
        line-height: 0;
      }
    }
  }
`;

export const NoteItem = styled.div`
  margin-bottom: 0.5rem;
  border-radius: 10px 10px 5px 5px;
  transition: 0.2s;
  background: #f0f0f0;
  position: relative;
  .NoteItem__Panel {
    background: #d9d9d9;
  }

  &:hover {
    background: #d0d0d0;
    .NoteItem__Panel {
      background: #c1c1c1;
    }
  }

  .NoteItem__Panel--sub {
    height: 4px;
    overflow: hidden;
    transition: 0.2s;
    .NoteItem__word-more-info {
      padding: 10px;
      width: 100%;
      position: relative;

      .NoteItem__word-sentence {
        margin-right: 30px;
        font-size: 0.9rem;
      }

      .NoteItem__word-en-sentence {
        margin-bottom: 10px;

        .word_primary {
          color: #006d75;
          font-weight: bold;
        }
      }
    }
    .NoteItem__word-audio {
      top: calc(50% - 10px);
      .ButtonEffect__btn {
        width: 25px;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  ${audio}
`;

export const NoteItemPanel = styled.div`
  background: #bfbfbf;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px 10px 0 0;

  .NoteItem__word-content {
    flex: 0 0 auto;
    width: calc(40% - 30px);

    &--value {
      font-size: 15px;
      font-weight: bold;
    }

    &__ipa-us {
      font-size: 15px;
    }
  }

  .NoteItem__word-type {
    flex: 0 0 auto;
    width: 15%;
  }

  .NoteItem__word-translate {
    flex: 0 0 auto;
    width: 45%;
    p {
      font-size: 15px;
      color: #333333;
    }
  }
`;
export default Container;
