import { ReactNode } from "react";

export default interface QuestionProps {
  title: string;
  question: ReactNode;
  answers: any[];
  setAnswer: Function;
  reviewId: number;
}
