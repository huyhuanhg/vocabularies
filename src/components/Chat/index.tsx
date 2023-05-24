import { FC, useState } from "react";
import ChatProps from "./Chat.props";
import Container from "./Chat.style";
import Popup from "./Popup";
import { ButtonEffect } from "../common";
import Image from "next/image";

const Chat: FC<ChatProps> = ({ userName }) => {
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  return (
    <Container>
      <Popup open={isOpenPopup} userName={userName} setDisplay={setIsOpenPopup} />
      <ButtonEffect space={0} click={() => setIsOpenPopup(!isOpenPopup)}>
        <div className="img-wrapper">
          <Image src={"/chat.png"} alt="chat-icon" width={40} height={40} />
        </div>
      </ButtonEffect>
    </Container>
  );
};

export default Chat;
