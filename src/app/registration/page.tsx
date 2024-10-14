'use client'

import './registration.scss';
import { useEffect, useState } from "react";
import UseLoginSteps from "../utils/hooks/useLoginSteps";
import { useRouter } from "next/navigation";
import CustomAvatar from '../components/login/customAvatar/CustomAvatar';
import ButtonNext from '../components/login/buttonNext/ButtonNext';
import { auth, db } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import ErrorMessage from '../components/UI/errorMessage/ErrorMessage';
import SignButton from '../components/UI/buttons/signButton/SignButton';
import { IUser } from '../utils/interfaces/IUser/IUser';

const Registration = () => {
  const loginSteps = [
    { placeholder: 'Введите ваш email...', title: 'Введите ваш email' },
    { placeholder: 'Введите пароль...', title: 'Придумайте пароль' },
    { placeholder: 'Введите ваше имя...', title: 'Введите ваше имя' },
    { placeholder: 'Выберите ваш уровень английского', title: 'Выберите ваш уровень английского' },
    { placeholder: 'Создайте своего персонажа', title: 'Создайте своего персонажа' },
    { placeholder: 'Самое сложное - начать!', title: 'Самое сложное - начать!' },
    { placeholder: 'Но ты это сделал!', title: 'Но ты это сделал!' }
  ];

  const knowledgeLevel = ['Только начинаю', 'Начинаю продолжать', 'Продолжаю продолжать', 'В2'];

  const { counter, animate, inputValue, setInputValue, handleNextStep } = UseLoginSteps(0);
  const [userData, setUserData] = useState<IUser>({
    userEmail: '',
    userPassword: '',
    userName: '',
    userProgress: [],
    userExperience: 0,
  });
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const router = useRouter();

  const handleNextButton = () => {
    if (counter === 0) {
      setUserData(prev => ({ ...prev, userEmail: inputValue }));
    } else if (counter === 1) {
      setUserData(prev => ({ ...prev, userPassword: inputValue }));
    } else if (counter === 2) {
      setUserData(prev => ({ ...prev, userName: inputValue }));
    }

    counter < loginSteps.length - 1 && handleNextStep();
  };

  useEffect(() => {
    counter === 5 && setTimeout(() => handleNextStep(), 5000);
  }, [counter]);
  useEffect(() => {
    if (counter === 6) {
      setTimeout(async () => {
        try {
          console.log(auth, userData.userEmail)
          const userCredential = await createUserWithEmailAndPassword(auth, userData.userEmail, userData.userPassword);
          const user = userCredential.user;
          console.log(user)
          console.log(doc(db, "users", user.uid)) 

          // Сохранение имени пользователя и других данных в Firestore
          await setDoc(doc(db, "users", user.uid), {
            userName: userData.userName,
            email: userData.userEmail,
            userProgress: [],
            userExperience: 0,
          });

          router.replace('/');
        } catch (error: any) {
          if (error.code === 'auth/email-already-in-use') {
            setRegistrationError('Этот email уже зарегистрирован!');
          } else {
            setRegistrationError('Произошла ошибка при регистрации :(');
          }
        }
      }, 5000);
    }
  }, [counter, router, userData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <>
      <div className={`login__wrapper ${counter >= 6 ? 'end' : ''}`}>
        <h1 className={`login__title ${animate ? 'fade-out' : 'fade-in'} ${counter >= 5 ? 'center' : ''}`}>
          {loginSteps[counter].title}
        </h1>
        <form className={`login-card ${animate ? 'fade-in-left' : 'fade-out-right'}`}>
          {counter <= 2 && (
            <>
              <input
                className='login-input'
                type={counter === 0 ? 'email' : (counter === 1 ? 'password' : 'text')}
                name={counter === 2 ? "userName" : "inputUser"}
                placeholder={loginSteps[counter].placeholder}
                value={inputValue}
                onChange={handleInputChange}
              />
            </>
          )}
          {counter === 3 && (
            <ul className='knowledge-level-list'>
              {knowledgeLevel.map((text: string, index: number) => (
                <li className='list-item' key={index}>
                  <button className='select-button' onClick={handleNextButton} type='button'>
                    {text}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {counter === 4 && <CustomAvatar />}
          
          {counter !== 3 && <ButtonNext counter={counter} inputValue={inputValue} handleNextButton={handleNextButton}/>}
        </form>
        {counter === 0 && <SignButton text='Вход' path='login'/>}
      </div>

      {registrationError && <ErrorMessage errorTitle={'Ошибка при регистрации!'} textError={registrationError} buttonText={'Попробовать ещё раз'}/>}
    </>
  );
};

export default Registration;