import { FC, KeyboardEvent, useEffect, useRef, useState } from "react";
import { Popup as StylePopup } from "./Chat.style";
import PopupProps from "./Popup.props";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { sendMessage } from "@/stores/chat/action";
import { Image } from "../common";
import moment from "moment";
import "moment/locale/vi";

const Popup: FC<PopupProps> = ({ open, userName, setDisplay }) => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { msg, newMsg, isHello } = useSelector(
    ({ chatReducer }: Record<string, any>) => chatReducer
  );
  const [msgState, setMsgState] = useState("");
  const msgRef = useRef<HTMLDivElement>(null);

  const onChat = (msg: string) => {
    dispatch(sendMessage({ message: msg }));
    msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
  };

  useEffect(() => {
    msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
  }, [newMsg]);

  useEffect(() => {
    if (open && !isHello) {
      onChat(
        `Chào bạn! Tôi là ${userName}. Bạn hãy chào tôi, và trả lời "Tôi là trợ lý học tiếng anh của bạn. Bạn cần tôi giúp gì không?"`
      );
    }
    msgRef.current?.scrollTo(0, msgRef.current?.scrollHeight);
  }, [open]);

  const handleInputEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && msgState) {
      onChat(msgState);
      setMsgState("");
    }
  };

  const handleClickSend = () => {
    if (msgState) {
      onChat(msgState);
      setMsgState("");
    }
  };

  const renderMessage = () => {
    return msg.slice(1).map((message: any) => (
      <div
        className="message-item"
        data-owner={message.role === "user" ? "user" : "bot"}
        key={`${message.id}_${message.created}`}
      >
        <div className="message-time">
          {moment(message.created).locale("vi").fromNow()}
        </div>
        <div className="message-content">{message.content}</div>
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
          {renderMessage()}
          {newMsg.length > 0 && (
            <div className="message-item" data-owner="bot">
              <div className="message-time">Bây giờ</div>
              <div className="message-content">{newMsg.join("").replace(/^([\s\w\W]+\s)(.+)$/, "$1")}<span className="cursor" /></div>
            </div>
          )}
        </div>
        <div className="input">
          <input
            placeholder="Nhập tin nhắn ..."
            type="text"
            value={msgState}
            onChange={(e) => setMsgState(e.target.value)}
            onKeyDown={handleInputEnter}
          />
          <button onClick={handleClickSend}>
            <Image
              src={"/send-message.png"}
              alt="send-msg"
              height={15}
              width={15}
            />
          </button>
        </div>
      </div>
    </StylePopup>
  );
};

export default Popup;
