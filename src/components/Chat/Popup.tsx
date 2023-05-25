import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  Popup as StylePopup,
  PopoverBtnGroup as StylePopoverBtnGroup,
} from "./Chat.style";
import PopupProps from "./Popup.props";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { sendMessage } from "@/stores/chat/action";
import { ButtonEffect, Image } from "../common";
import moment from "moment";
import "moment/locale/vi";
import { Chat } from "@/helpers";
import { Popover } from "antd";

const Popup: FC<PopupProps> = ({ open, userName, setDisplay }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { msg, newMsg, loading } = useSelector(
    ({ chatReducer }: Record<string, any>) => chatReducer
  );
  const [msgState, setMsgState] = useState("");
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [isOpenPopoverRemove, setIsOpenPopoverRemove] = useState(false);
  const msgRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onChat = (message: string) => {
    const now = Date.now();
    dispatch(sendMessage({ message, id: `user_${now}`, created: now }));
    msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
  };

  useEffect(() => {
    if (msg.length > 0) {
      setIsAutoScroll(true);
      msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
    }
  }, [msg]);

  useEffect(() => {
    if (isAutoScroll) {
      msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
    }
  }, [newMsg]);

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.addEventListener("scroll", () => {
        const condition =
          Number(msgRef.current?.scrollTop) +
            Number(msgRef.current?.clientHeight) ===
          Number(msgRef.current?.scrollHeight);
        if (!condition && isAutoScroll) {
          setIsAutoScroll(false);
        }
      });
    }
  }, [msgRef]);

  useEffect(() => {
    if (open) {
      msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
      dispatch({ type: "chat/get_storage" });

      if (Chat.Storage.empty()) {
        onChat(Chat.Msg.sayHello(userName));
      }
    }

    msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
  }, [open]);

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && msgState) {
      if (!(newMsg.length > 0 || loading)) {
        onChat(msgState);
        setMsgState("");
      }
    }
  };

  const handleClickSend = () => {
    if (msgState) {
      onChat(msgState);
      setMsgState("");
    }
  };

  const handleRefreshMsg = (e: Event) => {
    e.stopPropagation();
    dispatch({ type: "chat/refresh" });
    setIsOpenPopoverRemove(false);
    inputRef.current?.focus();
  };

  const renderMessage = (msg: []) => {
    return msg.map((message: any) => (
      <div
        className="message-item"
        data-owner={message.role === "user" ? "user" : "bot"}
        key={`${message.id}_${message.created}`}
      >
        <div className="message-time">
          {moment(message.created).locale("vi").fromNow()}
        </div>
        <div className="message-content">{message.content}</div>
        {message.status === "fail" && (
          <div className="message-error">Không gửi được tin nhắn</div>
        )}
      </div>
    ));
  };

  return (
    <StylePopup open={open}>
      <div className="chat-wrapper">
        <button className="btn-close" onClick={() => setDisplay(false)}>
          <Image
            src={"/btn_close.svg"}
            alt="btn_close"
            height={15}
            width={15}
          />
        </button>
        <div className="messages" ref={msgRef}>
          {renderMessage(msg.slice(1))}
          {loading && (
            <div className="message-item" data-owner="bot">
              <div className="message-time">Đang trả lời</div>
              <div className="message-content">
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </div>
          )}
          {newMsg.length > 0 && (
            <div className="message-item" data-owner="bot">
              <div className="message-time">Bây giờ</div>
              <div className="message-content">
                {newMsg.join("")}
                <span className="cursor" />
              </div>
            </div>
          )}
        </div>
        <div className="control">
          <div
            className="refresh-btn"
            onClick={() => setIsOpenPopoverRemove(true)}
          >
            <Popover
              placement="right"
              content={
                <StylePopoverBtnGroup>
                  <ButtonEffect
                    space={2}
                    cssType="text"
                    state="error"
                    click={(e: Event) => handleRefreshMsg(e)}
                  >
                    Xóa hội thoại
                  </ButtonEffect>
                </StylePopoverBtnGroup>
              }
              trigger="click"
              zIndex={999999999}
              open={isOpenPopoverRemove}
            >
              <button>
                <Image
                  src={"/bin.png"}
                  alt="send-msg"
                  height={20}
                  width={20}
                  title="Làm mới"
                />
              </button>
            </Popover>
          </div>

          <input
            ref={inputRef}
            placeholder="Nhập tin nhắn ..."
            type="text"
            value={msgState}
            onChange={(e) => setMsgState(e.target.value)}
            onKeyDown={handleInputEnter}
          />
          {newMsg.length > 0 ? (
            <div className="loading-render-msg">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <button className="submit-btn" onClick={handleClickSend}>
              <Image
                src={"/send-message.png"}
                alt="send-msg"
                height={15}
                width={15}
              />
            </button>
          )}
        </div>
      </div>
    </StylePopup>
  );
};

export default Popup;
