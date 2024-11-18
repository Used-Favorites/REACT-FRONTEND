// Importando as funções necessárias do SDK do Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // Importando o Firestore

// A configuração do Firebase do seu projeto
const firebaseConfig = {
  apiKey: "AIzaSyA1vH8RWMQRhHdFcNLhezgsLe8dWZKbRgY",
  authDomain: "agoravaichat-c683c.firebaseapp.com",
  projectId: "agoravaichat-c683c",
  storageBucket: "agoravaichat-c683c.firebasestorage.app",
  messagingSenderId: "794417541049",
  appId: "1:794417541049:web:5e291003470029ce969068",
  measurementId: "G-FGWLRKSELZ"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);

// Inicializando o Firestore
const db = getFirestore(app);

// Exportando a instância do Firestore para ser usada em outros arquivos
export { db };
