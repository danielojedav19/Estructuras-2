// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZGLGarcMgs9mHokoExDiWEETVYk2rh0",
  authDomain: "miprimerfb-b2b3f.firebaseapp.com",
  projectId: "miprimerfb-b2b3f",
  storageBucket: "miprimerfb-b2b3f.firebasestorage.app",
  messagingSenderId: "426470931153",
  appId: "1:426470931153:web:da6cf326f206e84e5f23f0",
  measurementId: "G-1672TWYY81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const analytics = getAnalytics(app);
const db = getFirestore()
const googleProvider = new GoogleAuthProvider();

export {app, auth, googleProvider}