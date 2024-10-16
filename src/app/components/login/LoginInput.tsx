import Image from 'next/image'
import './loginInput.scss'

import VisiblePasswordIcon from '../../../../public/icons/visible-password-icon.png'
import HiddenPasswordIcon from '../../../../public/icons/hidden-password-icon.png'
import { useState } from 'react'

interface ILoginSteps {
  placeholder: string, 
  title: string
}

interface ILoginInput {
  counter: number,
  loginSteps: ILoginSteps[],
  inputValue: string,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const LoginInput = ({ counter, loginSteps, inputValue, handleInputChange }: ILoginInput) => {

  const [isPasswordButton, setIsPasswordButton ] = useState<boolean>(false)

  return(
    <div className='input-wrapper'>
      <input
        className='login-input'
        type={counter === 0 ? 'email' : (counter === 1 ? (isPasswordButton ? 'text' : 'password') : 'text')}
        name={counter === 2 ? "userName" : "inputUser"}
        placeholder={loginSteps[counter].placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {counter === 1 && 
      <button className='show-password-button' onClick={() => setIsPasswordButton(!isPasswordButton)} type='button'>
        <Image
          className='eye-icon'
          width={30}
          height={30}
          src={isPasswordButton ? VisiblePasswordIcon : HiddenPasswordIcon}
          alt='Show Password'
        />
      </button>}
  </div>
  )
}

export default LoginInput