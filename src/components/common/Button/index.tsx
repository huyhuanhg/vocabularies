import { FC } from "react";
import ButtonProps from "./Button.props";
import { Container } from "./Button.style";

const Button: FC<ButtonProps> = ({ children, type, ...props }) => {
  return (
    <Container type={type ?? "primary"} {...props}>
      {children}
    </Container>
  );
};

export default Button;
