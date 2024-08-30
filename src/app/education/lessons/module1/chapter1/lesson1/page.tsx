'use client';

import '../../../lessons.scss'
import { useLessonContext } from "@/app/utils/context/LessonContext";
import TopPanel from "@/app/components/UI/lessonUI/topPanel/TopPanel";
import { useState, useEffect, useRef } from 'react';
import NextLessonPanel from "@/app/components/UI/lessonUI/nextLessonPanel/NextLessonPanel";
import { CurrentLessonType, DialogType, PhraseType, WordType } from "@/app/utils/interfaces/ILessons/ILessons";

import { currentQuestionFunc } from "@/app/utils/hooks/currentQuestionFunc";
import LessonInner from "@/app/components/UI/lessonUI/lessonInner/LessonInner";

const CurrentLesson: CurrentLessonType = {
  words: [
    {wordRu: 'Здравствуйте', wordEn: 'Hello', sideWords: { sideWordsRu: ['Пока', 'Как дела', 'Вечер'], sideWordsEn: ['Goodbye', 'Morning', 'Friend'] }},
    {wordRu: 'Утро', wordEn: 'Morning', sideWords: { sideWordsRu: ['Вечер', 'День', 'Полдень'], sideWordsEn: ['Afternoon', 'Evening', 'Day'] }},
    {wordRu: 'Полдень', wordEn: 'Afternoon', sideWords: { sideWordsRu: ['Утро', 'Вечер', 'День'], sideWordsEn: ['Morning', 'Evening', 'Night'] }},
    {wordRu: 'Вечер', wordEn: 'Evening', sideWords: { sideWordsRu: ['Утро', 'День', 'Полдень'], sideWordsEn: ['Afternoon', 'Morning', 'Day'] }},
  ],
  phrases: [
    { phrasesRu: 'Давно не виделись', phrasesEn: 'Long time no see', sideWords: { sideWordsRu: ['привет', 'где', 'смотреть'], sideWordsEn: ['hello', 'see', 'spicy'] } },
    { phrasesRu: 'Как твои дела', phrasesEn: "How've you been", sideWords: { sideWordsRu: ['мои', 'сколько', 'где'], sideWordsEn: ['bind', 'global', 'performance'] } },
    { phrasesRu: 'Доброе утро', phrasesEn: 'Good morning', sideWords: { sideWordsRu: ['круто', 'отлично', 'вечер'], sideWordsEn: ['sandwich', 'term', 'visual'] } },
    { phrasesRu: 'Доброго вечера', phrasesEn: 'Good evening', sideWords: { sideWordsRu: ['плохого', 'отличного', 'дня'], sideWordsEn: ['reason', 'feedback', 'Friend'] } },
    { phrasesRu: 'Как жизнь', phrasesEn: "How's life been treating you", sideWords: { sideWordsRu: ['зачем', 'здесь', 'мы'], sideWordsEn: ['dynamic', 'gravity', 'brain'] } },
    { phrasesRu: 'Добый день', phrasesEn: 'Good afternoon', sideWords: { sideWordsRu: ['плохой', 'красочный', 'счастливый'], sideWordsEn: ['value', 'palm', 'check'] } },
    { phrasesRu: "Что хорошего", phrasesEn: "What's good", sideWords: { sideWordsRu: ['где', 'приятно', 'круто'], sideWordsEn: ['rate', 'method', 'peace'] } },
    { phrasesRu: 'Приятно познакомиться', phrasesEn: 'Nice to meet you', sideWords: { sideWordsRu: ['пока', 'привет', 'вечер'], sideWordsEn: ['sweet', 'memory', 'package'] } }
  ],
  dialog: [
    { dialogRu: 'Меня зовут Джон', dialogEn: 'My name is John', sideWords: { sideWordsRu: ['ты', 'мы', 'вы'], sideWordsEn: ['you', 'are', 'be'] } },
    { dialogRu: 'Откуда ты', dialogEn: 'Where are you from', sideWords: { sideWordsRu: ['где', 'сколько', 'здесь'], sideWordsEn: ['why', 'a', 'form'] } },
    { dialogRu: 'Я из Канады', dialogEn: 'I am from Canada', sideWords: { sideWordsRu: ['в', 'рядом', 'мы'], sideWordsEn: ['a', 'is', 'at'] } },
    { dialogRu: 'Как тебя зовут', dialogEn: 'What is your name', sideWords: { sideWordsRu: ['где', 'сколько', 'нас'], sideWordsEn: ['where', 'why', 'you'] } },
    { dialogRu: 'Это моя подруга Capa', dialogEn: 'This is my friend Sarah', sideWords: { sideWordsRu: ['наша', 'ваша', 'твоя'], sideWordsEn: ['our', 'us', 'you'] } },
    { dialogRu: 'Сколько тебе лет', dialogEn: 'How old are you', sideWords: { sideWordsRu: ['дней', 'кто', 'где'], sideWordsEn: ['where', 'are', 'is'] } },
  ]
}

const Lesson1 = () => {
  const { lessons } = useLessonContext();

  const [randomTaskState, setRandomTaskState] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<WordType | PhraseType | DialogType | undefined>();
  const [currentLang, setCurrentLang] = useState<number>(0);
  const sideWordsArrayRef = useRef<string[]>([]);

  const [answerList, setAnswerList] = useState<string[]>([]);
  const [isButtonNext, setIsButtonNext] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);

  useEffect(() => {
    if (lessons) {
      currentQuestionFunc({
        CurrentLesson, 
        setAnswerList, 
        setRandomTaskState, 
        currentLang, 
        randomTaskState, 
        sideWordsArrayRef, 
        setCurrentQuestion
      });
    }
  }, [lessons, randomTaskState, currentLang]);

  useEffect(() => {
    setIsButtonNext(false);
    if (currentQuestion) {
      if ("phrasesEn" in currentQuestion && "phrasesRu" in currentQuestion) {
        isCorrectAnswer(currentQuestion.phrasesEn, currentQuestion.phrasesRu);
      } else if ("wordEn" in currentQuestion && "wordRu" in currentQuestion) {
        isCorrectAnswer(currentQuestion.wordEn, currentQuestion.wordRu);
      } else if (
        "dialogRu" in currentQuestion &&
        "dialogRu" in currentQuestion
      ) {
        isCorrectAnswer(currentQuestion.dialogEn, currentQuestion.dialogRu);
      }
    }
  }, [answerList]);

  const handleNextQuestion = () => {
    currentQuestionFunc({
      CurrentLesson, 
      setAnswerList, 
      setRandomTaskState, 
      currentLang, 
      randomTaskState, 
      sideWordsArrayRef, 
      setCurrentQuestion
    });
    setCurrentLang((prevLang) => (prevLang === 0 ? 1 : 0));
  };

  const getContent = (content: string[]) => {
    sideWordsArrayRef.current = sideWordsArrayRef.current.filter(
      (item) => !content.includes(item),
    );

    setAnswerList((prevWord) => [...prevWord, ...content]);
  };

  const isCorrectAnswer = (taskEn: string, taskRu: string) => {
    if (
      (answerList.length > 0 && taskEn === answerList.join(" ")) ||
      (answerList.length > 0 && taskRu === answerList.join(" "))
    ) {
      setIsButtonNext(true);
      setProgressBar(progressBar + 10);
    }
  };

  const handleDeleteButton = (word: string) => {
    sideWordsArrayRef.current = [...sideWordsArrayRef.current, word];

    setAnswerList((prevWords) => prevWords.filter((item) => item !== word));
  };

  return (
    <div className="container">
      <TopPanel progress={progressBar} />
      <div className="lesson__wrapper">
        {currentQuestion && sideWordsArrayRef.current.length >= 0 && (
          <LessonInner
            currentQuestion={currentQuestion}
            currentLang={currentLang}
            answerList={answerList}
            isButtonNext={isButtonNext}
            handleDeleteButton={handleDeleteButton}
            sideWordsArrayRef={sideWordsArrayRef}
            getContent={getContent}
            randomTaskState={randomTaskState}
          />
        )}
      </div>
      {isButtonNext && (
        <NextLessonPanel
          handleNextQuestion={handleNextQuestion}
          progressBar={progressBar}
          lessons={lessons}
        />
      )}
    </div>
  );
};

export default Lesson1;

// добавить в fireBase данные урока

// Добавить справочник для каждого модуля!