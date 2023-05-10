export default interface ButtonEffectProps
  extends React.HTMLProps<HTMLButtonElement> {
  cssType?: "text" | "btn";
  state?: "active" | "error" | "normal";
  space?: number;
  click?: Function;
  mouseDown?: Function;
  mouseUp?: Function;
}
