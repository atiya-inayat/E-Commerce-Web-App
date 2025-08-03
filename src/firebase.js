// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPJtWHmkHMtZt4kw6Bo3OPGoFUAr9-mzM",
  authDomain: "e-com-app-8c1cc.firebaseapp.com",
  projectId: "e-com-app-8c1cc",
  storageBucket: "e-com-app-8c1cc.firebasestorage.app",
  messagingSenderId: "338286214652",
  appId: "1:338286214652:web:68ab6b3f7c25a79b7c8679",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
