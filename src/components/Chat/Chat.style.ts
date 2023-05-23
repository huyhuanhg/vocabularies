import styled, { keyframes } from "styled-components";

const ldsEllipsis1 = keyframes`
0% {
  transform: scale(0);
}
100% {
  transform: scale(1);
}
`;

const ldsEllipsis2 = keyframes`
0% {
  transform: translate(0, 0);
}
100% {
  transform: translate(16px, 0);
}
`;

const ldsEllipsis3 = keyframes`
0% {
  transform: scale(1);
}
100% {
  transform: scale(0);
}
`;

const cursorInsert = keyframes`
0% {
  opacity: 1;
}
100% {
  opacity: 0;
}
`;

const Container = styled.div`
  .ButtonEffect {
    position: absolute;
    z-index: 999999999;
    right: 10px;
    bottom: 110px;
    width: auto;
    &__btn {
      padding: 0;
      line-height: 0;
      overflow: hidden;
    }
  }
`;

export const Popup = styled.div<{ open: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  background: rgba(0, 0, 0, 0.2);
  width: ${(props) => (props.open ? "100%" : 0)};
  height: ${(props) => (props.open ? "100vh" : 0)};
  opacity: ${(props) => (props.open ? 1 : 0)};
  padding: 5px;
  .chat-wrapper {
    background: #fff;
    border-radius: 6px 6px 0 0;
    bottom: 160px;
    right: 5px;
    position: absolute;
    width: ${(props) => (props.open ? "calc(100% - 10px)" : 0)};
    height: ${(props) => (props.open ? "calc(100vh - 165px)" : 0)};
    opacity: ${(props) => (props.open ? 1 : 0)};
    overflow: hidden;
    transition: all 0.2s ease-out;
    .btn-close {
      line-height: 0;
      border: none;
      outline: none;
      position: absolute;
      right: 0;
      padding: 10px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 1px 1px 50px 10px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      z-index: 9;
    }
    .messages {
      padding: 1rem;
      background: #f7f7f7;
      flex-shrink: 2;
      overflow: hidden auto;
      box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
        inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
      height: calc(100% - 64px);
      border-radius: 6px 6px 0 0;

      .message-item {
        position: relative;
        .message-error {
          color: red;
          font-size: 12px;
          position: absolute;
          top: calc(100% + 2px);
          right: 0;
        }
        .message-content {
          padding: 0.5rem 1rem;
          width: fit-content;
          white-space: pre-line;
          position: relative;
          .cursor {
            display: inline-block;
            width: 10px;
            height: 3px;
            background: #000;
            bottom: -2px;
            position: relative;
            animation: ${cursorInsert} 0.8s infinite;
          }

          .lds-ellipsis {
            display: inline-block;
            position: relative;
            width: 46px;
            line-height: 20px;
            height: 20px;

            div {
              position: absolute;
              top: calc(50% - 5px);
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: gray;
              animation-timing-function: cubic-bezier(0, 1, 1, 0);
              &:nth-of-type(1) {
                left: 0px;
                animation: ${ldsEllipsis1} 0.6s infinite;
              }
              &:nth-of-type(2) {
                left: 0px;
                animation: ${ldsEllipsis2} 0.6s infinite;
              }
              &:nth-of-type(3) {
                left: 16px;
                animation: ${ldsEllipsis2} 0.6s infinite;
              }
              &:nth-of-type(4) {
                left: 32px;
                animation: ${ldsEllipsis3} 0.6s infinite;
              }
            }
          }
        }

        .message-time {
          font-size: 12px;
          color: #333333c9;
        }

        &[data-owner="bot"] {
          .message-content {
            margin: 0.25rem auto 1rem 0;
            background: #fff;
            border-radius: 0 0.55rem 0.55rem 0.55rem;
            box-shadow: 0 0 2rem rgba(0, 0, 0, 0.075),
              0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.1);
          }
        }
        &[data-owner="user"] {
          .message-time {
            text-align: right;
          }
          .message-content {
            margin: 0.25rem 0 1rem auto;
            border-radius: 0.55rem 0 0.55rem 0.55rem;
            background: #333;
            color: white;
          }
        }
      }

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px #fafafa;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb {
        background: #bfbfbf;
        border-radius: 10px;
      }
    }

    .input {
      position: relative;
      box-sizing: border-box;
      height: 4rem;
      display: flex;
      align-items: center;
      padding: 0 1rem;

      input {
        border: none;
        background-image: none;
        background-color: white;
        padding: 0.5rem 1.8rem 0.5rem 1rem;
        font-size: 15px;
        border-radius: 1.125rem;
        flex-grow: 2;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1),
          0rem 1rem 1rem -1rem rgba(0, 0, 0, 0.2);
        font-family: Red hat Display, sans-serif;
        font-weight: 400;
        letter-spacing: 0.025em;
      }

      button {
        background: none;
        border: none;
        line-height: 0;
        position: absolute;
        outline: none;
        right: 25px;
        top: 50%;
        transform: translateY(-50%);
        cursor: pointer;
      }
    }
  }
`;

export default Container;
