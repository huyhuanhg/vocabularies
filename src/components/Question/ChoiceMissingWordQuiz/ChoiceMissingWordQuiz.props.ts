import VocabularyType from "@/types/entities/VocabularyType";

export default interface ChoiceMissingWordQuizProps {
  reviewId: string;
  vocabularies: VocabularyType[];
  setAnswer: Function;
  getQuestionStr: Function;
  vocabulary: VocabularyType;
}
