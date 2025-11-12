// Importar módulos de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBZZGLGarcMgs9mHokoExDiWEETVYk2rh0",
  authDomain: "miprimerfb-b2b3f.firebaseapp.com",
  projectId: "miprimerfb-b2b3f",
  storageBucket: "miprimerfb-b2b3f.firebasestorage.app",
  messagingSenderId: "426470931153",
  appId: "1:426470931153:web:da6cf326f206e84e5f23f0",
  measurementId: "G-1672TWYY81"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider();

// Exportar servicios para usar en toda la app
export { app, auth, db, googleProvider, analytics };
