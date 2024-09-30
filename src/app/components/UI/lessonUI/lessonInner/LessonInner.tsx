'use client'

import './lessonInner.scss'
import Image, { StaticImageData } from "next/image"
import Quiz from "../quiz/Quiz"
import React, { useEffect, useMemo, useState } from 'react';

import Man1 from '../../../../../../public/personage/man-1.png'
import Man2 from '../../../../../../public/personage/man-2.png'
import Man3 from '../../../../../../public/personage/man-3.png'
import Man4 from '../../../../../../public/personage/man-4.png'
import Woman1 from '../../../../../../public/personage/woman-1.png'
import { DialogType, FewWords, PhraseType, WordType } from '@/app/utils/interfaces/ILessons/ILessons';

interface ILessonInner {
  currentQuestion: WordType | PhraseType | DialogType | FewWords[] | undefined,
  currentLang: number,
  answerList: string[],
  isButtonNext: boolean,
  handleDeleteButton: (state: string) => void,
  sideWordsArrayRef: React.RefObject<string[]>,
  getContent: (state: string[]) => void,
  randomTaskState: number,
  onQuizCounterChange?: (newCounter: number) => void 
}

const LessonInner = ({ currentQuestion, onQuizCounterChange , currentLang, answerList, isButtonNext, handleDeleteButton, sideWordsArrayRef, getContent, randomTaskState = 3 }: ILessonInner) => {
  const personageList = useMemo(() => [Man1, Man2, Man3, Man4, Woman1], []);
  const [personageFoto, setPersonageFoto] = useState<StaticImageData | undefined>(undefined);

  const [quizCounter, setQuizCounter] = useState<number>(0);

  const updateQuizCounter = (newCounter: number) => {
    setQuizCounter(newCounter);
    onQuizCounterChange && onQuizCounterChange(newCounter);
  };

  useEffect(()=>{
    const randomIndex = Math.floor(Math.random() * personageList.length);
    setPersonageFoto(personageList[randomIndex]);
  },[])

  return(
    <div className="lesson__inner">
      {currentQuestion &&
      <>
        {personageFoto && (
          <Image
            className="personage-foto"
            src={personageFoto}
            width={100}
            height={150}
            alt={"personage foto"}
          />
        )}

        {(randomTaskState === 0 && "wordEn" in currentQuestion || randomTaskState === 1 && "phrasesEn" in currentQuestion || randomTaskState === 2 && "dialogEn" in currentQuestion || randomTaskState === 3) && (
          <Quiz
            currentLang={currentLang}
            currentQuestion={currentQuestion}
            answerList={answerList}
            isButtonNext={isButtonNext}
            handleDeleteButton={handleDeleteButton}
            sideWordsArrayRef={sideWordsArrayRef}
            getContent={getContent}
            updateCounter={updateQuizCounter}
          />
        )}
      </>}
    </div>
  )
} 

export default LessonInner