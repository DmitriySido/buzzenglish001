'use client'

import './education.scss';
import { useLessonContext } from '../utils/context/LessonContext';
import { useState, useEffect, useRef } from 'react';
import TooltipPopup from '../components/UI/popups/tooltipPopup/TooltipPopup';
import ModuleTitle from '../components/UI/lessonListUI/ModuleTitle';
import LessonButton from '../components/UI/lessonListUI/lessonButton/LessonButton';
import { useRouter } from "next/navigation";

// Firebase
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';
import { ILesson, SomeFieldType } from '../utils/interfaces/ILessons/ILessons';
import { UserDataType } from '../utils/interfaces/IUser/IUser';
import { DataType } from '../utils/interfaces/IData/IData';
import Loading from '../components/UI/loading/Loading';



export default function Education() {
  const [data, setData] = useState<DataType[]>([]);
  const [lessonList, setLessonList] = useState<ILesson[]>([]);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [isTooltipPopup, setIsTooltipPopup] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsSnapshot, usersSnapshot] = await Promise.all([
          getDocs(collection(db, "LessonsList")),
          getDocs(collection(db, "users")),
        ]);

        // Обработка данных уроков
        const lessonsData: DataType[] = lessonsSnapshot.docs.map(doc => ({
          id: doc.id,
          someField: doc.data() as SomeFieldType,
        }));
        setData(lessonsData);

        // Обработка данных пользователя
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          userDoc.exists() ?
            setUserData({ id: user.uid, ...userDoc.data() } as UserDataType)
              :
            console.log("Документ пользователя не найден!");
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    userData && console.log(userData)
  },[userData])

  useEffect(() => {
    data.length > 0 && setLessonList(data.flatMap(item => item.someField.lessonList)); // Все уроки
  }, [data]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => user ? router.replace('/education') : router.replace('/login'));

    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsTooltipPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const { setLessonData } = useLessonContext();

  const handleLessonClick = (lesson: ILesson, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setLessonData(lesson);
    setCurrentLesson(lesson);
    setIsTooltipPopup(true);
  };

  const getLessonProgress = (lessonID: string): number => {
    if (!userData || !userData.userProgress) return 0;
    return userData.userProgress.filter(id => id === lessonID).length;
  };

  return (
    <>
    {userData ? 
    <main className='main'>
        <ul className='lesson-list'>
          {lessonList.map((lesson, index) => {
            const showTitle = index === 0 || lessonList[index - 1].chapter !== lesson.chapter;
            const progressCount = getLessonProgress(lesson.lessonID); // Получаем количество повторяющихся элементов
    
            return (
              <div className='lesson-button__wrapper' key={lesson.lessonID}>
                {showTitle && (
                  <ModuleTitle
                    color={lesson.color}
                    module={lesson.module}
                    chapter={lesson.chapter}
                    lessonTitle={lesson.lessonTitle}
                  />
                )}
                <LessonButton
                  color={lesson.color}
                  lesson={lesson}
                  handleLessonClick={handleLessonClick}
                />
                
                {isTooltipPopup && currentLesson?.lessonPath === lesson.lessonPath && (
                  <TooltipPopup
                    progressCount={progressCount}
                    path={lesson.lessonPath}
                    color={lesson.color}
                    lessonSubitle={lesson.lessonSubtitle}
                    experience={lesson.lessonExperience}
                    ref={tooltipRef}
                  />
                )}
              </div>
            );
          })}
        </ul>
    </main>
    :
    <Loading />   
  }
  </>
  );
}