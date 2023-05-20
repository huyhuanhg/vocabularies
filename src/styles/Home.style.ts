import styled, { css, keyframes } from "styled-components";

const cssScrollBar = css`
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
`;

const ldsSpin = keyframes`
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
`;

const Container = styled.div`
  height: 100%;
  position: relative;

  .Voca-Search {
    position: sticky;
    top: 0;
    background-color: #ddd;
    box-shadow: 0 -40px 100px 2px rgba(0, 0, 0, 0.2);
    z-index: 99999999;
    padding: 10px 20px;
  }
  .Voca-Report-Review {
    padding: 40px 20px 20px;
    height: calc(100% - 70px);
    overflow: hidden auto;
    ${cssScrollBar}
  }

  .ButtonEffect:disabled {
    .ant-statistic {
      &-content {
        font-size: 1.25rem !important;
        color: #828282;
        font-family: inherit;
        line-height: 1;
      }
    }
  }
`;

export const Message = styled.div`
  text-align: center;
`;

export const InputSearch = styled.div`
  position: relative;
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
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    outline: none;
    border: none;
    background-color: unset;
    cursor: pointer;
  }
`;

export const SearchWrapper = styled.div`
  height: calc(100% - 70px);
  position: relative;
  overflow: auto;
  ${cssScrollBar}
`;

export const SearchEmpty = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .ButtonEffect {
    margin-top: 40px;
  }
`;

export const SearchSuggests = styled.div`
  border-top: 1px solid #cbcaca;
  margin-top: 20px;
  .suggest-title {
    padding: 20px;
    border-bottom: 1px solid #cbcaca;
    display: block;
    font-size: 1em;
    font-weight: bold;
    color: #00474f;
  }
`;

export const SearchSuggestWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  .ButtonEffect {
    width: fit-content;
    margin: 0;

    .ButtonEffect__btn {
      padding: 6pt 8pt;
    }
  }
`;

export const SearchResult = styled.div`
  position: relative;
  font-size: 13px;
  padding: 20px;
`;

export const SearchDictionary = styled.div`
  margin-bottom: 45px;
  .word-title {
    text-transform: capitalize;
    font-size: 15px;
    font-weight: bold;
    max-width: 192px;
    color: black;
    margin: 0 0 20px;
  }
`;

export const SearchPhonetics = styled.div`
  .word-phonetic {
    display: flex;
    align-items: center;
    height: 35px;
    span {
      font-size: 1em;
      font-weight: bold;
      width: 43px;
      margin-right: 10px;
      margin-bottom: 0px;
    }

    .btn-play-audio {
      box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 4px -1px;
      cursor: pointer;
      padding-left: 4px;
      width: 29px;
      height: 29px;
      display: flex;
      align-items: center;
      border-radius: 50%;
      margin: 0px 10px;
      border: none;
    }
    .phonetic-text {
      font-size: 15px;
      margin-left: 10px;
      /* font-weight: bold; */
    }

    &.phonetic-uk {
      span {
        color: rgb(47, 128, 237);
      }

      svg path {
        fill: rgb(47, 128, 237);
      }
    }

    &.phonetic-us {
      span {
        color: rgb(235, 87, 87);
      }

      svg path {
        fill: rgb(235, 87, 87);
      }
    }
  }
`;

export const WordDetailList = styled.div``;

export const WordDetailItem = styled.div`
  margin-bottom: 30px;
  .detail-translate {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    color: black !important;
    margin: 10px 0px !important;

    .txt-trans {
      max-width: 192px !important;
      color: black !important;
      font-weight: 600 !important;
      font-size: 14px !important;
    }

    .ButtonEffect {
      width: fit-content;
      margin: 0;
      &[disabled] {
        path {
          fill: #8d8d8d !important;
        }
      }

      .ButtonEffect__btn {
        padding: 2px 4px;

        & > div {
          height: 21px;
          width: 70px;
          display: flex;
          align-items: center;

          .word-action-btn-label {
            margin-left: 5px;
            margin-bottom: 0px;
            margin-top: 0px;
            font-size: 1em;
          }

          path {
            fill: #fff;
          }

          &.loading::after {
            content: "";
            display: block;
            width: 15px;
            height: 15px;
            position: absolute;
            left: 5px;
            top: calc(50% - 7.5px);
            border-width: 2px;
            border-style: solid;
            border-color: rgb(0, 56, 240) rgb(243, 243, 243) rgb(243, 243, 243);
            border-image: initial;
            border-radius: 50%;
            border-top: 2px solid rgb(0, 56, 240);
            animation: 1s linear 0s infinite normal none running ${ldsSpin};
          }
        }
      }
    }
  }

  .result-sentence {
    position: relative;
    margin-right: 30px;
    .word-sentence {
      line-height: 20px;
      color: black;
      font-size: 13px;
      margin-bottom: 5px;

      &.en-sentence .word_primary {
        color: #006d75;
        font-weight: bold;
      }
    }

    .WordDetailItem__word-audio {
      position: absolute;
      line-height: 0;
      left: calc(100% + 10px);
      top: calc(50% - 12.5px);

      .ButtonEffect {
        &__btn {
          padding: 0;
          line-height: 0;
        }
      }
    }
  }
`;

export default Container;
