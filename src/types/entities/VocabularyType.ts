import FireBaseTimeStampObjectType from "./FireBaseTimeStampObjectType"

export default interface VocabularyType {
  audio_us: string,
  content: string,
  en_sentence: string,
  id: string
  ipa_us: string
  last_seen?: string | FireBaseTimeStampObjectType
  translate: string
  type: string
  vi_sentence: string
  pattern?: string
}
