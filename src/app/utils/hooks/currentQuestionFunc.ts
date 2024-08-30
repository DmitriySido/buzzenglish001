import { CurrentLessonType, DialogType, PhraseType, WordType } from "../interfaces/ILessons/ILessons";
import React from 'react';

interface ICurrentQuestion {
  CurrentLesson: CurrentLessonType,
  setAnswerList: (state: string[]) => void,
  setRandomTaskState: (state: number) => void,
  currentLang: number,
  randomTaskState: number,
  sideWordsArrayRef: React.RefObject<string[]>,
  setCurrentQuestion: (state: WordType | PhraseType | DialogType | undefined) => void
}

const shuffleSideWords = (array: string[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // обмен элементов
  }
};

export const currentQuestionFunc = ({
  CurrentLesson, 
  setAnswerList, 
  setRandomTaskState, 
  currentLang, 
  randomTaskState, 
  sideWordsArrayRef, 
  setCurrentQuestion
}: ICurrentQuestion) => {
  if (!CurrentLesson) return;

  setAnswerList([]);
  const newRandomTaskState = Math.floor(Math.random() * 3);
  setRandomTaskState(newRandomTaskState);

  const keys = Object.keys(CurrentLesson) as Array<keyof CurrentLessonType>;
  const currentKey = keys[newRandomTaskState];
  const currentValue = CurrentLesson[currentKey];

  const randomNumber = Math.floor(Math.random() * currentValue.length);
  let question: WordType | PhraseType | DialogType | undefined;
  let sideWords: string[] = [];

  if (currentKey === "words") {
    question = currentValue[randomNumber] as WordType;
    sideWords = currentLang === 0 ? question.sideWords.sideWordsRu : question.sideWords.sideWordsEn;
  } else if (currentKey === "phrases") {
    question = currentValue[randomNumber] as PhraseType;
    sideWords = currentLang === 0 ? question.sideWords.sideWordsRu : question.sideWords.sideWordsEn;
    const phrasesWords = currentLang === 0 ? question.phrasesRu.split(" ") : question.phrasesEn.split(" ");

    if (sideWords.length <= 3) {
      const filteredPhrasesWords = phrasesWords.filter(word => word.trim() !== "");
      sideWords.push(...filteredPhrasesWords);
    }
  } else if (currentKey === "dialog") {
    question = currentValue[randomNumber] as DialogType;
    sideWords = currentLang === 0 ? question.sideWords.sideWordsRu : question.sideWords.sideWordsEn;
    const phrasesWords = currentLang === 0 ? question.dialogRu.split(" ") : question.dialogEn.split(" ");

    if (sideWords.length <= 3) {
      const filteredPhrasesWords = phrasesWords.filter(word => word.trim() !== "");
      sideWords.push(...filteredPhrasesWords);
    }
  }

  if (randomTaskState === 0 && question) {
    const wordToAdd = currentLang === 0 ? (question as WordType).wordRu : (question as WordType).wordEn;
    sideWords = sideWords.filter(word => word !== wordToAdd);
    sideWords.push(wordToAdd);
  }

  // Перемешиваем sideWords
  shuffleSideWords(sideWords);

  // Обновляем sideWordsArrayRef текущий
  if (sideWordsArrayRef.current) {
    // Update the existing array instead of reassigning it
    sideWordsArrayRef.current.length = 0; // Clear the current array
    sideWordsArrayRef.current.push(...sideWords.filter(word => word !== undefined && word.trim() !== ""));
  }

  setCurrentQuestion(question);
};