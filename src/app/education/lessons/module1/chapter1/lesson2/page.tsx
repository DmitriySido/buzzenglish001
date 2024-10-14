'use client';

import '../../../lessons.scss'
import { useLessonContext } from "@/app/utils/context/LessonContext";
import TopPanel from "@/app/components/UI/lessonUI/topPanel/TopPanel";
import { useState, useEffect, useRef, useCallback } from 'react';
import NextLessonPanel from "@/app/components/UI/lessonUI/nextLessonPanel/NextLessonPanel";
import { CurrentLessonType, DialogType, FewWords, PhraseType, WordType } from "@/app/utils/interfaces/ILessons/ILessons";

import { currentQuestionFunc } from "@/app/utils/hooks/currentQuestionFunc";
import LessonInner from "@/app/components/UI/lessonUI/lessonInner/LessonInner";
import Lessonloading from '@/app/components/Lessonloading/Lessonloading';

const CurrentLesson: CurrentLessonType = {
  words: [
    {wordRu: 'Рядом', wordEn: 'Nearby', sideWords: { sideWordsRu: ['Близко', 'Недалеко', 'Здесь'], sideWordsEn: ['Globe', 'Satellite', 'Transit'] }},
    {wordRu: 'Маршрут', wordEn: 'Directions', sideWords: { sideWordsRu: ['Идти', 'Путь', 'Дорога'], sideWordsEn: ['Road', 'Street', 'Crossroad'] }},
    {wordRu: 'Велодорожки', wordEn: 'Bicycling', sideWords: { sideWordsRu: ['Велосипед', 'Тропинка', 'Парковка'], sideWordsEn: ['Sidewalk', 'Underpass', 'Avenue'] }},
    {wordRu: 'Карта', wordEn: 'Map', sideWords: { sideWordsRu: ['Рядом', 'За поворотом', 'Здесь'], sideWordsEn: ['Highway', 'Bridge', 'Mall'] }},
  ],
  phrases: [
    { phrasesRu: 'Идти прямо', phrasesEn: 'Go straight ahead', sideWords: { sideWordsRu: ['назад', 'вперёд', 'быстро'], sideWordsEn: ['strange', 'back', 'left'] } },
    { phrasesRu: 'Идти через', phrasesEn: "Go across", sideWords: { sideWordsRu: ['бежать', 'в', 'возле'], sideWordsEn: ['going', 'over', 'cross'] } },
    { phrasesRu: 'Повернуть налево', phrasesEn: 'Turn left', sideWords: { sideWordsRu: ['право', 'вперёд', 'развернуться'], sideWordsEn: ['on', 'right', 'rotate'] } },
    { phrasesRu: 'Повернуть направо', phrasesEn: 'Turn right', sideWords: { sideWordsRu: ['лево', 'назад', 'идти'], sideWordsEn: ['in', 'left', 'the'] } },
    { phrasesRu: 'Стоп', phrasesEn: "Stop", sideWords: { sideWordsRu: ['Скорее', 'Возле', 'Рядом'], sideWordsEn: ['Store', 'Smile', 'Spain'] } },
    { phrasesRu: 'Взять', phrasesEn: 'Take a', sideWords: { sideWordsRu: ['Положить', 'Найти', 'Возле'], sideWordsEn: ['Give', 'at', 'Tolk'] } },
    { phrasesRu: "Спрашивать", phrasesEn: "Asking", sideWords: { sideWordsRu: ['Где', 'говорить', 'Найти'], sideWordsEn: ['rate', 'method', 'peace'] } },
    { phrasesRu: 'Прямо впереди', phrasesEn: 'Straight ahead', sideWords: { sideWordsRu: ['Сзади', 'Назад', 'Слева'], sideWordsEn: ['Left', 'Right', 'Back'] } }
  ],
  dialog: [
    { dialogRu: 'Как мне добраться до…', dialogEn: 'How can I get to…', sideWords: { sideWordsRu: ['ты', 'мы', 'вы'], sideWordsEn: ['you', 'are', 'be'] } },
    { dialogRu: 'Здесь есть какой-нибудь…', dialogEn: 'Is there any…', sideWords: { sideWordsRu: ['где', 'сколько', 'здесь'], sideWordsEn: ['why', 'a', 'form'] } },
    { dialogRu: 'Не могли бы вы подсказать…', dialogEn: 'Could you tell me…', sideWords: { sideWordsRu: ['в', 'рядом', 'мы'], sideWordsEn: ['a', 'is', 'on'] } },
    { dialogRu: 'Я ищу…', dialogEn: 'I am looking for…', sideWords: { sideWordsRu: ['Мы', 'видим', 'для'], sideWordsEn: ['we', 'are', 'where'] } },
    { dialogRu: 'Какой кратчайший путь…', dialogEn: 'What is the shortest way…', sideWords: { sideWordsRu: ['где', 'дорога', 'высокий'], sideWordsEn: ['where', 'a', 'road'] } },
    { dialogRu: 'Как…', dialogEn: 'How to…', sideWords: { sideWordsRu: ['Здесь', 'Кто', 'Где'], sideWordsEn: ['where', 'are', 'is'] } },
    { dialogRu: 'Как мне пройти к…', dialogEn: 'How can I get to…', sideWords: { sideWordsRu: ['Здесь', 'Кто', 'Где'], sideWordsEn: ['where', 'are', 'is'] } },
  ],
  fewWords: [
    {fewWordRu: 'Школа', fewWordEn: 'School'}, {fewWordRu: 'Станция метро', fewWordEn: 'Subway station'}, {fewWordRu: 'Остановка трамвая', fewWordEn: 'Tram station'}, {fewWordRu: 'Алея', fewWordEn: 'Alley'}, {fewWordRu: 'Мост', fewWordEn: 'Bridge'},
    {fewWordRu: 'Дорога', fewWordEn: "Road"}, {fewWordRu: 'Извините меня', fewWordEn: 'Excuse me'}, {fewWordRu: 'Улица', fewWordEn: 'Street'}, {fewWordRu: 'Дорожное движение', fewWordEn: "Traffic"}, {fewWordRu: 'Аэропорт', fewWordEn: 'Airport'},
  ]
}

const Lesson2 = () => {
  const { lessons } = useLessonContext();
  const [randomTaskState, setRandomTaskState] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<WordType | PhraseType | DialogType | FewWords[] | undefined>();
  const [currentLang, setCurrentLang] = useState<number>(0);
  const sideWordsArrayRef = useRef<string[]>([]);
  const [answerList, setAnswerList] = useState<string[]>([]);
  const [isButtonNext, setIsButtonNext] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<number>(0);
  const [quizCounter, setQuizCounter] = useState<number>(0);

  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  const handleQuizCounterChange = useCallback((newCounter: number) => {
    setQuizCounter(newCounter);
  }, []);

  const updateCurrentQuestion = useCallback(() => {
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
      setQuizCounter(0)
    }
  }, [lessons, currentLang, randomTaskState]);

  useEffect(() => {
    updateCurrentQuestion();
  }, [updateCurrentQuestion]);

  useEffect(() => {
    setIsButtonNext(false);
    if (currentQuestion) {
      if ("phrasesEn" in currentQuestion && "phrasesRu" in currentQuestion) {
        isCorrectAnswer(currentQuestion.phrasesEn, currentQuestion.phrasesRu);
      } else if ("wordEn" in currentQuestion && "wordRu" in currentQuestion) {
        isCorrectAnswer(currentQuestion.wordEn, currentQuestion.wordRu);
      } else if ("dialogEn" in currentQuestion && "dialogRu" in currentQuestion) {
        isCorrectAnswer(currentQuestion.dialogEn, currentQuestion.dialogRu);
      } else if (quizCounter && quizCounter === 4) {
        setIsButtonNext(true);
      }
    }
  }, [answerList, quizCounter]);

  const handleNextQuestion = () => {
    updateCurrentQuestion();
    setCurrentLang(prevLang => (prevLang === 0 ? 1 : 0));
    if (quizCounter && quizCounter === 4) {
      setProgressBar(prev => prev + 10);
      
      if (!isSoundPlayed && 1 > 0) {
        const audio = new Audio('/sound/correct-answer.wav');
        audio.play();
      }
    }
  };

  const getContent = (content: string[]) => {
    sideWordsArrayRef.current = sideWordsArrayRef.current.filter(item => !content.includes(item));
    setAnswerList(prevWord => [...prevWord, ...content]);
  };

  const isCorrectAnswer = (taskEn: string, taskRu: string) => {
    if ((answerList.length > 0 && taskEn === answerList.join(" ")) || 
        (answerList.length > 0 && taskRu === answerList.join(" "))) {
      setIsButtonNext(true);
      setProgressBar(prev => prev + 10);
      if (!isSoundPlayed && 1 > 0) {
        const audio = new Audio('/sound/correct-answer.wav');
        audio.play();
      }
    }
  };

  const handleDeleteButton = (word: string) => {
    sideWordsArrayRef.current = [...sideWordsArrayRef.current, word];
    setAnswerList(prevWords => prevWords.filter(item => item !== word));
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
            onQuizCounterChange={handleQuizCounterChange}
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

export default Lesson2;

// Сделать нормальный код
// выносить нужные функции или тп в модули в отдельные файлы
// Добавить справочник для каждого модуля!