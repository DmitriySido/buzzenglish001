import './addedWordButton.scss'

interface IAddedButton {
  isButtonNext: boolean,
  handleDeleteButton: ( word: string ) => void,
  index: number,
  word: string
}

const AddedWordButton = ({ isButtonNext, handleDeleteButton, word, index }: IAddedButton) => {
  return <button disabled={isButtonNext && true} onClick={()=> handleDeleteButton((word))} className="added-word-button" key={index}>{word}</button>
}

export default AddedWordButton