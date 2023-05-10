import { ReactNode } from "react";

export default interface ObjectiveTestProps {
  title: string;
  question: ReactNode;
  answers: any[];
  setAnswer: Function;
  reviewId: string;
}
