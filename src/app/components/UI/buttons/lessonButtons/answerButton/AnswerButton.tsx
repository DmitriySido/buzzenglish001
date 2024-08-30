import './answerButton.scss'

interface IAnswerButton {
  isButtonNext: boolean,
  getContent: ( word: string[] ) => void,
  index: number,
  word: string
}

const AnswerButton = ({ isButtonNext, index, getContent, word }: IAnswerButton) => {

  return <button disabled={isButtonNext && true} key={index} onClick={() => getContent([word])} className="answer-button">{word}</button>
}

export default AnswerButton