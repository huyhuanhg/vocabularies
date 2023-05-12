import { FC, MouseEvent, useState } from "react";
import { Container } from "./ButtonEffect.style";
import ButtonEffectProps from "./ButtonEffect.props";

const ButtonEffect: FC<ButtonEffectProps> = ({
  children,
  click,
  mouseDown,
  mouseUp,
  mouseLeave,
  disabled,
  style,
  cssType,
  state,
  space,
  btnRef
}) => {
  const [isEffect, setIsEffect] = useState(false);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => click && click(event);

  const handleMouseUp = (e: MouseEvent) => {
    setIsEffect(false);
    mouseUp && mouseUp(e);
  };

  const handleMouseLeave = (e: MouseEvent) => {
    setIsEffect(false);
    mouseLeave && mouseLeave(e);
  };

  const handleMouseDown = (e: MouseEvent) => {
    setIsEffect(true);
    mouseDown && mouseDown(e);
  };

  return (
    <Container
      className="ButtonEffect"
      style={style}
      disabled={disabled}
      cssType={cssType ?? "btn"}
      state={state ?? "normal"}
      space={space ?? 6}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      isEffect={isEffect}
      ref={btnRef}
    >
      <div className="ButtonEffect__btn">{children}</div>
    </Container>
  );
};

export default ButtonEffect;
