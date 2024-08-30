import { useEffect, useState } from 'react';
import './nextLessonPanel.scss'
import Image from 'next/image';
import TrueIcon from '../../../../../../public/icons/true-icons.png'
import FalseIcon from '../../../../../../public/icons/false-icon.png'
import { auth, db } from '../../../../../../firebaseConfig';
import { useLessonContext } from '@/app/utils/context/LessonContext';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const phrasesList = ['Продолжай в том же духе!', 'Отличная работа!', 'Ты просто супер!', 'Прекрасно справился!', 'Здорово, что так быстро!', 'Великолепно! Продолжай в том же духе!']

const NextLessonPanel = ({ handleNextQuestion, progressBar, lessons}: any) => {
  const currentUser = auth.currentUser;
  const router = useRouter();

  const [randomPhrase, setRandomPhrase] = useState<string>('')

  useEffect(() => {
    setRandomPhrase(phrasesList[Math.floor(Math.random() * phrasesList.length)])
  }, [])

  const handleFinishLesson = async () => {
    console.log('CLick')
    if (!currentUser || !lessons) {
      console.log('User or lessons data is missing');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userProgress = userDocSnap.data()?.userProgress || [];
      const updatedUserProgress = [...userProgress, lessons[0].lessonID];

      await updateDoc(userDocRef, { userProgress: updatedUserProgress });

      console.log('User progress updated');
      router.push('/education');
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  return(
    <div className='next-lesson__pannel-wrapper'>
      <div className='container'>
        <div className='next-lesson__pannel-inner'>
          <div className='text-content'>
            <Image
              className='next-lesson-icon'
              src={TrueIcon}
              width={70}
              height={70}
              alt={'Good'}
            />

            <p className='phrase-text'>{randomPhrase}</p>
          </div>

          {
            progressBar === 100
              ?
            <button onClick={handleFinishLesson} className='button-next'>Закончить</button>
              :
            <button onClick={handleNextQuestion} className='button-next'>Дальше</button>
          }
        </div>
      </div>
    </div>
  )
}

export default NextLessonPanel