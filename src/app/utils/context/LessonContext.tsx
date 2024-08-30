'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ILesson } from '../interfaces/ILessons/ILessons';


interface LessonContextType {
  lessons: ILesson[];
  setLessonData: (lesson: ILesson) => void;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export const LessonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lessons, setLessons] = useState<ILesson[]>([]);
  

  const setLessonData = (lesson: ILesson) => {
    setLessons((prevLessons) => {
      const existingLessonIndex = prevLessons.findIndex(l => l.lessonPath === lesson.lessonPath);
      if (existingLessonIndex !== -1) {
        const updatedLessons = [...prevLessons];
        updatedLessons[existingLessonIndex] = lesson;
        return updatedLessons;
      } else {
        return [ lesson ];
      }
    });
  };

  return (
    <LessonContext.Provider value={{ lessons, setLessonData }}>
      {children}
    </LessonContext.Provider>
  );
};

export const useLessonContext = () => {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error('useLessonContext must be used within a LessonProvider');
  }
  return context;
};