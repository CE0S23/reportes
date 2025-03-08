// Importamos las funciones necesarias de Firebase
import { initializeApp } from "firebase/app"; // Inicializa la aplicación Firebase
import { getFirestore } from "firebase/firestore"; // Obtiene acceso a Firestore (base de datos)

// Configuración de Firebase con las credenciales del proyecto (actualizadas)
const firebaseConfig = {
  apiKey: "AIzaSyAN4pgUSycF0NK0oQGBnbKIblcD2ne25cE",
  authDomain: "integral-859fb.firebaseapp.com",
  projectId: "integral-859fb",
  storageBucket: "integral-859fb.firebasestorage.app",
  messagingSenderId: "837408312914",
  appId: "1:837408312914:web:62528c74bb449ed12c998b",
  measurementId: "G-94T5R8YQZV"
};

// Inicializa la aplicación Firebase con la configuración proporcionada
const app = initializeApp(firebaseConfig);

// Obtiene una instancia de la base de datos Firestore
const db = getFirestore(app);

// Exportamos la instancia de Firestore para poder usarla en otros archivos de React
export { db };
