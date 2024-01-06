import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBFgd1a4GVT-SEz9Sy38ALFwO4Zt2NuxF4",
  authDomain: "react-fb-course.firebaseapp.com",
  projectId: "react-fb-course",
  storageBucket: "react-fb-course.appspot.com",
  messagingSenderId: "435266834037",
  appId: "1:435266834037:web:4e477162848a9746d7723c",
  measurementId: "G-XQYQH2EBDL",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
