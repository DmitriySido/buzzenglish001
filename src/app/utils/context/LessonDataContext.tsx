'use client'

import { useEffect, useState, createContext, useContext } from "react";
import { auth, db } from "../../../../firebaseConfig"; // Ensure correct import paths
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { UserDataType } from '../interfaces/IUser/IUser';
import { ILesson, SomeFieldType } from '../interfaces/ILessons/ILessons';
import { DataType } from '../interfaces/IData/IData';

// Define the context type
interface LessonDataContextType {
  data: DataType[];
  lessonList: ILesson[];
  userData: UserDataType | null;
  fetchData: () => Promise<void>; // Ensure fetchData is part of the context
}

// Create context
const LessonDataContext = createContext<LessonDataContextType | undefined>(undefined);

// Context provider component
export const LessonDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [lessonList, setLessonList] = useState<ILesson[]>([]);
  const [userData, setUserData] = useState<UserDataType | null>(null);

  const fetchData = async () => {
    try {
      const lessonsSnapshot = await getDocs(collection(db, "LessonsList"));
      const lessonsData: DataType[] = lessonsSnapshot.docs.map(doc => ({
        id: doc.id,
        someField: doc.data() as SomeFieldType,
      }));
      setData(lessonsData);

      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        userDoc.exists() ?
          setUserData({ id: user.uid, ...userDoc.data() } as UserDataType)
          :
          console.log("User document not found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Fetch data when the provider mounts
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      setLessonList(data.flatMap(item => item.someField.lessonList));
    }
  }, [data]);

  return (
    <LessonDataContext.Provider value={{ data, lessonList, userData, fetchData }}>
      {children}
    </LessonDataContext.Provider>
  );
};

// Custom hook to use the context
export const useLessonData = () => {
  const context = useContext(LessonDataContext);
  if (!context) {
    throw new Error("useLessonData must be used within a LessonDataProvider");
  }
  return context;
};