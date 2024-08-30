'use client'

import React from 'react';
import AnswerButton from '../../buttons/lessonButtons/answerButton/AnswerButton';
import './quiz.scss';
import AddedWordButton from '../../buttons/lessonButtons/addedWordButton/AddedWordButton';
import { DialogType, PhraseType, WordType } from '@/app/utils/interfaces/ILessons/ILessons';

interface IQuiz {
  currentLang: number,
  currentQuestion: WordType | PhraseType | DialogType,
  answerList: string[],
  isButtonNext: boolean,
  handleDeleteButton: (word: string) => void,
  getContent: (words: string[]) => void,
  sideWordsArrayRef: React.RefObject<string[]>,
}

const Quiz: React.FC<IQuiz> = React.memo(({ 
  currentLang, 
  currentQuestion, 
  answerList, 
  isButtonNext, 
  handleDeleteButton, 
  sideWordsArrayRef, 
  getContent 
}) => {

  // Определяем контент в зависимости от типа вопроса
  const renderQuestionContent = () => {
    if ('wordEn' in currentQuestion && 'wordRu' in currentQuestion) {
      return <h2 className="title-words">{currentLang === 0 ? (currentQuestion as WordType).wordEn : (currentQuestion as WordType).wordRu}</h2>;
    }
    if ('phrasesEn' in currentQuestion && 'phrasesRu' in currentQuestion) {
      return <h2 className="title-words">{currentLang === 0 ? (currentQuestion as PhraseType).phrasesEn : (currentQuestion as PhraseType).phrasesRu}</h2>;
    }
    if ('dialogEn' in currentQuestion && 'dialogRu' in currentQuestion) {
      return <h2 className="title-words">{currentLang === 0 ? (currentQuestion as DialogType).dialogEn : (currentQuestion as DialogType).dialogRu}</h2>;
    }
  };

  return (
    <div>
      {renderQuestionContent()}

      <div className="field__wrapper">
        {answerList.map((word, index) => (
          <AddedWordButton 
            key={index}
            isButtonNext={isButtonNext} 
            handleDeleteButton={handleDeleteButton} 
            word={word} 
            index={index} 
          />
        ))}
      </div>
      
      <div className="answer-button-list">
        {sideWordsArrayRef.current && (
          sideWordsArrayRef.current.map((word, index) => (
            <AnswerButton 
              key={index}
              isButtonNext={isButtonNext} 
              getContent={getContent} 
              word={word} 
              index={index} 
            />
          ))
        )}
      </div>
    </div>
  );
});

export default Quiz;