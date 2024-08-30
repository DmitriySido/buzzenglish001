'use client'

import { useEffect, useState } from "react";
import { auth, db } from "../../../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { SomeFieldType } from "../utils/interfaces/ILessons/ILessons";
import { UserDataType } from "../utils/interfaces/IUser/IUser";
import { DataType } from "../utils/interfaces/IData/IData";


const Profile = () => {
  const [userData, setUserData] = useState<UserDataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersSnapshot] = await Promise.all([
          getDocs(collection(db, "users")),
        ]);

        // Обработка данных уроков
        const usersData: DataType[] = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          someField: doc.data() as SomeFieldType,
        }));

        // Обработка данных пользователя
        const user = auth.currentUser;
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            setUserData({ id: user.uid, ...userDoc.data() } as UserDataType);
          } else {
            console.log("Документ пользователя не найден!");
          }
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

  return (
    <div>
      <h1>Мой профиль</h1><br />
      {userData ? <h2>Привет {userData && userData.userName}!</h2> : <h1>ЖДИ</h1>}
    </div>
  );
}

export default Profile;