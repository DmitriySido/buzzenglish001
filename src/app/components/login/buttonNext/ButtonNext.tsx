import './buttonNext.scss'

interface IButtonNextProps {
  counter: number,
  inputValue: string,
  handleNextButton: () => void
}

const ButtonNext = ({ counter, inputValue, handleNextButton }: IButtonNextProps) => {
  const isEmailValid = inputValue.includes('@gmail.com');
  const isPasswordValid = inputValue.length >= 6;
  const isUserNamedValid = inputValue.length >= 2;

  const isButtonDisabled = 
    (counter === 0 && !isEmailValid) || 
    (counter === 1 && !isPasswordValid) ||
    (counter === 2 && !isUserNamedValid) ||
    (counter === 3 && false) ||
    (counter === 4 && false);

  const shouldShowButton = counter === 0 || counter === 1 || counter === 2 || counter === 3 || counter === 4;

  return (
    shouldShowButton ? (
      <button
        disabled={isButtonDisabled}
        className='button-next'
        onClick={handleNextButton}
        type='button'
      >
        Дальше
      </button>
    ) : null
  )
}

export default ButtonNext

// создать первый уровень 