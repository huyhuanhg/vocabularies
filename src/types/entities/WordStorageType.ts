import FireBaseTimeStampObjectType from "./FireBaseTimeStampObjectType"
import VocabularyType from "./VocabularyType"

export default interface WordStorageType {
  id: string
  last_seen?: string | FireBaseTimeStampObjectType | number
  rate: number
  review_flg?: boolean
  user: string
  vocabulary: VocabularyType
}
