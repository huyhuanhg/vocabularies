import VocabularyType from "@/types/entities/VocabularyType";

export default interface QuestionProps {
  index: number;
  current: VocabularyType;
  total: number;
  vocabularies: VocabularyType[];
  next: Function;
}
