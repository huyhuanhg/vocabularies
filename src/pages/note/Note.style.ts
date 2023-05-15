import styled from "styled-components";

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

    .content {
      min-height: calc(100% - 70px);
      padding: 20px 10px;
    }
  }
`;

export const Empty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NoteItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
  padding: 10px;
  background: #d9d9d9;
  border-radius: 10px;
  transition: 0.2s;
  cursor: pointer;

  &:hover {
    background: #b1b1b1;
  }
  &:nth-of-type(2n) {
    background: #f0f0f0;
    &:hover {
      background: #bfbfbf;
    }
  }

  .NoteItem__word-content {
    flex: 0 0 auto;
    width: 41.6666666667%;

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
    width: 16.6666666667%;
  }

  .NoteItem__word-translate {
    flex: 0 0 auto;
    width: 41.6666666667%;
    p {
      font-size: 15px;
      color: #333333;
    }
  }
`;

export default Container;
