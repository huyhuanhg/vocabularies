import VocabularyType from '@/types/entities/VocabularyType';

export default interface SentenceEngQuizProps {
  reviewId: string;
  vocabularies: VocabularyType[];
  setAnswer: Function;
  getQuestionStr: Function;
  vocabulary: VocabularyType;
}
