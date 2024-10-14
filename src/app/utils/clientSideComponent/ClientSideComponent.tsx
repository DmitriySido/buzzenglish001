'use client'

import { usePathname } from 'next/navigation';
import SideNavigation from '../../components/UI/sideNavigation/SideNavigation';
import { use, useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../../firebaseConfig';
import { DataType } from '../interfaces/IData/IData';
import { SomeFieldType } from '../interfaces/ILessons/ILessons';
import SkeletronSideNavigation from '@/app/components/UI/skeletron/skeletronNavigation/SkeletronSideNavigation';

const ClientSideComponent = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<DataType[]>([]);
  const pathname = usePathname();

  const pathList = ['/education', '/profile', '/shop', '/settings'];
  const shouldShowSideNavigation = pathList.includes(pathname);
console.log(shouldShowSideNavigation)
  useEffect(() => {
    console.log('reload')
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
        console.log(lessonsData.length)
        setData(lessonsData);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    fetchData();
  }, []);

  const user = auth.currentUser;
  console.log(user)

  return (
    <div className={shouldShowSideNavigation ? 'main-container' : ''}>
      {user === null && !shouldShowSideNavigation ? '' : 
        (user !== null && shouldShowSideNavigation ? <SideNavigation /> :
          (shouldShowSideNavigation ? <SkeletronSideNavigation/> : '')
        )
      }
      {children}
    </div>
  );
};

export default ClientSideComponent;