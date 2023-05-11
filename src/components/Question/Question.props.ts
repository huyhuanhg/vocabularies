import WordStorageType from "@/types/entities/WordStorageType";

export default interface QuestionProps {
  index: number;
  current: WordStorageType;
  total: number;
  wordStorages: WordStorageType[];
  next: Function;
}
