import CreateAccountButton from '../buttons/createAccountButton/CreateAccountButton'
import './errorMessage.scss'

interface IErrorMessage {
  textError: string,
  buttonText: string,
  errorTitle: string,
}

const ErrorMessage = ({ textError, buttonText, errorTitle}: IErrorMessage) => {

  return(
    <div className='error-message__wrapper'>
      <p className='error-title'>{errorTitle}</p>
      <p className='error-message'>{textError}</p>
      <CreateAccountButton text={buttonText}/>
    </div>
  )
}

export default ErrorMessage