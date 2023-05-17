import { FC, SyntheticEvent, useRef } from "react";
import ImageProps from "./Image.props";
import Container from "./Image.style";

const Image: FC<ImageProps> = ({ load, ...props }) => {
  const imageRef = useRef<HTMLImageElement>(null)
  const handleLoaded = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    imageRef.current?.classList.remove('loading')
    imageRef.current?.classList.add('loaded')
    load && load(e);
  }

  return (
    <Container ref={imageRef} onLoad={handleLoaded} className="VocaImage loading" {...props} />
  );
};

export default Image;
