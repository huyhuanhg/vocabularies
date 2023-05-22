import styled from "styled-components";

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
      .img-wrapper {
        /* border-radius: 50%; */
      }
    }
  }
`;

export const Popup = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100vh;
  padding: 5px;
  .chat-wrapper {
    background: #fff;
    border-radius: 6px 6px 0 0;
    .messages {
      padding: 1rem;
      background: #f7f7f7;
      flex-shrink: 2;
      overflow-y: auto;
      box-shadow: inset 0 2rem 2rem -2rem rgba(0, 0, 0, 0.05),
        inset 0 -2rem 2rem -2rem rgba(0, 0, 0, 0.05);
      height: 65vh;
      border-radius: 6px 6px 0 0;

      .message-item {
        .message-content {
          padding: 0.5rem 1rem;
          width: fit-content;
          white-space: pre-line;
        }

        .message-time {
          font-size: 12px;
          color: #bfbfbf;
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
        padding: 0.5rem 1rem;
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
