export interface ILesson {
  lessonTitle: string;
  lessonExperience: number;
  module: number;
  chapter: number;
  lessonPath: string;
  passed: boolean;
  progress: number;
  color: string;
  lessonID: string;
  lessonSubtitle: string;
}

export interface SomeFieldType {
  lessonList: ILesson[];
};

export interface SideWordsType {
  sideWordsRu: string[];
  sideWordsEn: string[];
}

export interface WordType {
  wordRu: string;
  wordEn: string;
  sideWords: SideWordsType;
}

export interface PhraseType {
  phrasesRu: string;
  phrasesEn: string;
  sideWords: SideWordsType;
}

export interface DialogType {
  dialogRu: string;
  dialogEn: string;
  sideWords: SideWordsType;
}

export interface FewWords {
  fewWordRu: string;
  fewWordEn: string
}

export interface CurrentLessonType {
  words: WordType[];
  phrases: PhraseType[];
  dialog: DialogType[];
  fewWords: FewWords[]
}