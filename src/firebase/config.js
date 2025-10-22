// Importar las funciones necesarias desde Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // 👈 NUEVO: Realtime Database

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZZGLGarcMgs9mHokoExDiWEETVYk2rh0",
  authDomain: "miprimerfb-b2b3f.firebaseapp.com",
  projectId: "miprimerfb-b2b3f",
  storageBucket: "miprimerfb-b2b3f.firebasestorage.app",
  messagingSenderId: "426470931153",
  appId: "1:426470931153:web:da6cf326f206e84e5f23f0",
  measurementId: "G-1672TWYY81",
  databaseURL: "https://miprimerfb-b2b3f-default-rtdb.firebaseio.com", // 👈 NUEVO: URL de Realtime DB
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const rtdb = getDatabase(app); 
const googleProvider = new GoogleAuthProvider();

// Exportar todo lo necesario
export { app, auth, googleProvider, db, rtdb, analytics };
