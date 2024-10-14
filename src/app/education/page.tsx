'use client'

import './education.scss';
import { useLessonContext } from '../utils/context/LessonContext'; 
import { useState, useEffect, useRef } from 'react';
import TooltipPopup from '../components/UI/popups/tooltipPopup/TooltipPopup';
import ModuleTitle from '../components/UI/lessonListUI/ModuleTitle';
import LessonButton from '../components/UI/lessonListUI/lessonButton/LessonButton';
import { useRouter } from "next/navigation";
import { useLessonData } from '../utils/context/LessonDataContext';
import SideRightPanel from '../components/UI/sideRightPanel/SideRightPanel';
import SkeletronEducation from '../components/UI/skeletron/skeletronEducation/SkeletronEducation';
import { ILesson } from '../utils/interfaces/ILessons/ILessons';
import { auth } from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function Education() {
  const [isTooltipPopup, setIsTooltipPopup] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<ILesson | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const popupWrapperRef = useRef<HTMLDivElement>(null);

  const { lessonList, userData, fetchData } = useLessonData(); 
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchData(); 
        router.replace('/education');
      } else {
        router.replace('/login');
      }
    });
    return () => unsubscribe();
  }, [router]); 

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, был ли клик вне попапа
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
        setIsTooltipPopup(false);
        
        setCurrentLesson(null);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
    <div ref={popupWrapperRef}>
      {userData ? 
        <main className='main'>
          <ul className='lesson-list'>
            {lessonList.map((lesson, index) => {
              const showTitle = index === 0 || lessonList[index - 1].chapter !== lesson.chapter;
              const progressCount = getLessonProgress(lesson.lessonID);

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
                    progressCount={progressCount}
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

          <SideRightPanel userExperience={userData.userExperience}/>
        </main>
      :
        <SkeletronEducation />
      }
    </div>
  );
}