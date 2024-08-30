import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Для работы с Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCxrta66v9ulD3CKxCqBnXHS2MWg2ch_TA",
  authDomain: "learnenglish002-cddb5.firebaseapp.com",
  projectId: "learnenglish002-cddb5",
  storageBucket: "learnenglish002-cddb5.appspot.com",
  messagingSenderId: "892833880624",
  appId: "1:892833880624:web:4d71b3dcc63170e078abf5"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// Инициализация Firestore
const db = getFirestore(app);

export { db };