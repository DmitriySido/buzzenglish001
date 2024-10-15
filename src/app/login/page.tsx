'use client'

import './login.scss'
import { useEffect, useState } from "react"
import UseLoginSteps from "../utils/hooks/useLoginSteps"
import { useRouter } from "next/navigation"
import ButtonNext from '../components/login/buttonNext/ButtonNext'
import { auth } from '../../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage'
import SignButton from '../components/UI/buttons/signButton/SignButton'
import { IUser } from '../utils/interfaces/IUser/IUser'
import Image from 'next/image'

import VisiblePasswordIcon from '../../../public/icons/visible-password-icon.png'
import HiddenPasswordIcon from '../../../public/icons/hidden-password-icon.png'

const Login = () => {
  const loginSteps = [
    { placeholder: 'Введите ваш email...', title: 'Введите ваш email' },
    { placeholder: 'Введите password...', title: 'Введите password' },
    { placeholder: 'Добро пожаловать!', title: 'Добро пожаловать!' },
  ]

  const { counter, animate, inputValue, setInputValue, handleNextStep } = UseLoginSteps(0)
  const [isPasswordButton, setIsPasswordButton ] = useState<boolean>(false)

  const [userData, setUserData] = useState<IUser>({ userEmail: '', userPassword: '', userExperience: 0 })
  const [signInError, setSignInError] = useState<string | null>(null)
  const router = useRouter()

  const handleNextButton = () => {
    if (counter === 0) {
      setUserData(prev => ({ ...prev, userEmail: inputValue }))
    } else if (counter === 1) {
      setUserData(prev => ({ ...prev, userPassword: inputValue }))
    }

    counter < loginSteps.length - 1 && handleNextStep()
  }

  useEffect(() => { counter === 2 && setTimeout(() => handleNextStep(), 3000) }, [counter])

  useEffect(() => {
    if (counter === 2) {
      setTimeout(async () => {
        try {
          await signInWithEmailAndPassword(auth, userData.userEmail, userData.userPassword)
            .then(() => router.replace('/education'))
        } catch (error) {
          setSignInError('Неправильный email или пароль.')
        }
      }, 4000)
    }
  }, [counter, router, userData])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (counter === 1) {
      setInputValue(value)
    } else {
      setInputValue(value)
    }
  }

  return (
    <div className={`login__wrapper ${counter === 2 ? 'end' : ''}`}>
      {counter < loginSteps.length && <h1 className={`login__title ${animate ? 'fade-out' : 'fade-in'} ${counter === 2 ? 'center' : ''}`}>{loginSteps[counter].title}</h1>}
      <form className={`login-card ${animate ? 'fade-in-left' : 'fade-out-right'}`}>
        {counter <= 1 && (
          <div className='input-wrapper-login'>
            <input
              className='login-input'
              type={counter === 0 ? 'email' : (counter === 1 ? (isPasswordButton ? 'text' : 'password') : 'text')}
              name="inputUser"
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
        )}
        {counter < 3 && <ButtonNext counter={counter} inputValue={inputValue} handleNextButton={handleNextButton}/>}
      </form>

      {counter === 0 && <SignButton text='Регистрация' path='registration'/>}

      {signInError && <ErrorMessage errorTitle={'Ошибка при входе!'} textError={signInError} buttonText={'Попробовать ещё раз'}/>}
    </div>
  )
}

export default Login