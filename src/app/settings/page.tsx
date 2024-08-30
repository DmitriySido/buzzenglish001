'use client'

import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "../../../firebaseConfig"
import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const Settings = () => {
  const router = useRouter()

  useEffect(()=>{
    const listen = onAuthStateChanged(auth, (user: any) => {
      if(user){
        console.log(user)
        router.replace('/settings');
      }else{
        router.replace('/login');
      }
    })

    return () => {
      listen()
    }
  },[])

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log('Вы вышли'))
      .catch((error) => console.log(error))
  }

  return(
    <>
      <div>Settings</div>
    
      <button onClick={userSignOut}>Выйти</button>
    </>
  )
}

export default Settings