import { FC } from "react";
import ModalProps from "./Modal.props";
import { Container } from "./Modal.style";

const Modal: FC<ModalProps> = ({ children, ...props }) => {
  return (
    <Container {...props}>
      {children}
    </Container>
  );
};

export default Modal;
