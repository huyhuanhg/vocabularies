import { ImageProps as NImageProps } from "next/image";

export default interface ImageProps extends NImageProps {
  load?: Function
}
