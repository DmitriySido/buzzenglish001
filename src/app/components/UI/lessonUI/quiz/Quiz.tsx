'use client'

import React, { useEffect, useState } from 'react';
import AnswerButton from '../../buttons/lessonButtons/answerButton/AnswerButton';
import './quiz.scss';
import AddedWordButton from '../../buttons/lessonButtons/addedWordButton/AddedWordButton';
import { DialogType, FewWords, PhraseType, WordType } from '@/app/utils/interfaces/ILessons/ILessons';

interface IQuiz {
  currentLang: number,
  currentQuestion: WordType | PhraseType | DialogType | FewWords[],
  answerList: string[],
  isButtonNext: boolean,
  handleDeleteButton: (word: string) => void,
  getContent: (words: string[]) => void,
  sideWordsArrayRef: React.RefObject<string[]>,
  updateCounter?: (counter: number) => void,
}

const Quiz: React.FC<IQuiz> = React.memo(({ 
  currentLang, 
  currentQuestion, 
  answerList, 
  isButtonNext, 
  handleDeleteButton, 
  sideWordsArrayRef, 
  getContent,
  updateCounter,
}) => {

  const [fewWordsRuShuffled, setFewWordsRuShuffled] = useState<FewWords[]>([]);
  const [fewWordsEnShuffled, setFewWordsEnShuffled] = useState<FewWords[]>([]);
  const [selectedEn, setSelectedEn] = useState<string | null>(null);
  const [selectedRu, setSelectedRu] = useState<string | null>(null);
  const [correctPairs, setCorrectPairs] = useState<{ en: string; ru: string }[]>([]);

  const [counter, setCounter] = useState<number>(0)

  const [isSoundPlayed, setIsSoundPlayed] = useState(false);

  function shuffleArray(array: FewWords[]) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  useEffect(() => {
    console.log(currentQuestion)
    if (Array.isArray(currentQuestion) && currentQuestion.length > 0) {
      // Перемешиваем русские и английские слова отдельно
      const shuffledRuWords = shuffleArray(currentQuestion);
      const shuffledEnWords = shuffleArray(currentQuestion);
      
      setFewWordsRuShuffled(shuffledRuWords);
      setFewWordsEnShuffled(shuffledEnWords);

      updateCounter && updateCounter(0)
      setCounter(0)
      setCorrectPairs([ {en: '', ru: ''} ])
    }
  }, [currentQuestion]);

  const handleEnClick = (enWord: string) => {
    setSelectedEn(enWord);
    checkMatch(enWord, selectedRu);
  };

  const handleRuClick = (ruWord: string) => {
    setSelectedRu(ruWord);
    checkMatch(selectedEn, ruWord);
  };

  const checkMatch = (enWord: string | null, ruWord: string | null) => {
    if (enWord && ruWord) {
      const found = (currentQuestion as FewWords[]).find((item) => item.fewWordEn === enWord && item.fewWordRu === ruWord);
      if (found) {
        if (!isSoundPlayed && 1 > 0) {
          const audio = new Audio('/sound/correct-fewWords.wav');
          audio.play();
        }
        setCounter(counter + 1)
        updateCounter && updateCounter(counter + 1);
        setCorrectPairs(prev => [...prev, { en: enWord, ru: ruWord }]);
      }
      setSelectedEn(null);
      setSelectedRu(null);
    }
  };

  const isButtonDisabled = (enWord: string, ruWord: string) => {
    return correctPairs.some(pair => pair.en === enWord && pair.ru === ruWord);   
  };

  const renderQuestionContent = () => {
    switch (true) {
      case 'wordEn' in currentQuestion && 'wordRu' in currentQuestion:
          return(
            <button className="tooltip-container">
              <span className="tooltip">{currentLang === 1 ? (currentQuestion as WordType).wordEn : (currentQuestion as WordType).wordRu}</span>
              <span className="text">{currentLang === 0 ? (currentQuestion as WordType).wordEn : (currentQuestion as WordType).wordRu}</span>
            </button>
          )
      case 'phrasesEn' in currentQuestion && 'phrasesRu' in currentQuestion:
        return(
          <button className="tooltip-container">
            <span className="tooltip">{currentLang === 1 ? (currentQuestion as PhraseType).phrasesEn : (currentQuestion as PhraseType).phrasesRu}</span>
            <span className="text">{currentLang === 0 ? (currentQuestion as PhraseType).phrasesEn : (currentQuestion as PhraseType).phrasesRu}</span>
          </button>
        )

      case 'dialogEn' in currentQuestion && 'dialogRu' in currentQuestion:
        return(
          <button className="tooltip-container">
            <span className="tooltip">{currentLang === 1 ? (currentQuestion as DialogType).dialogEn : (currentQuestion as DialogType).dialogRu}</span>
            <span className="text">{currentLang === 0 ? (currentQuestion as DialogType).dialogEn : (currentQuestion as DialogType).dialogRu}</span>
          </button>
        )

      case Array.isArray(currentQuestion) && currentQuestion.length > 0:
        return <h2 className="title-words">Выберете пары слов</h2>;
    
      default:
        return <h2 className="title-words">Что то пошло не так :(</h2>;
    }
  };

  return (
    <div>
      {renderQuestionContent()}
      {(Array.isArray(currentQuestion) && currentQuestion.length > 0) ? (
        <div className='few-words'>
          <div className='few-words-wrapper-list'>
            <ul className='answer-list'>
              {fewWordsEnShuffled.map((item, index) => (
                <li className='answer-item' key={index}>
                  <button
                    className={`answer-few-button ${selectedEn === item.fewWordEn ? 'active' : ''} ${isButtonDisabled(item.fewWordEn, item.fewWordRu) ? 'disabled' : ''}`}
                    onClick={() => handleEnClick(item.fewWordEn)}
                    disabled={isButtonDisabled(item.fewWordEn, item.fewWordRu)}
                  >
                    {item.fewWordEn}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className='few-words-wrapper-list'>
            <ul className='answer-list'>
              {fewWordsRuShuffled.map((item, index) => (
                <li className='answer-item' key={index}>
                  <button
                    className={`answer-few-button ${selectedRu === item.fewWordRu ? 'active' : ''} ${isButtonDisabled(item.fewWordEn, item.fewWordRu) ? 'disabled' : ''}`}
                    onClick={() => handleRuClick(item.fewWordRu)}
                    disabled={isButtonDisabled(item.fewWordEn, item.fewWordRu)}
                  >
                    {item.fewWordRu}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
});

export default Quiz;