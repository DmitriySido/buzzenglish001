'use client'

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { auth } from "../../firebaseConfig";

export default function Home() {
  const router = useRouter()

  const [authUser, setAuthUser] = useState(null)

  useEffect(()=>{
    const listen = onAuthStateChanged(auth, (user: any) => {
      if(user){
        router.replace('/education');
        setAuthUser(user)
      }else{
        router.replace('/login');
        setAuthUser(null)
      }
    })

    return () => {
      listen()
    }
  },[])


  // useEffect(() => {
  //   const userData = localStorage.getItem('userData');
  //   if (userData) {
  //     console.log('YES')
  //     router.replace('/education');
  //   }else{
  //     console.log('NO')
  //     router.replace('/login');
  //   }
  // }, []);

  return (
    <main>
      <h1>Подождите...</h1>
    </main>
  );
}