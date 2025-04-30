// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Asegúrate de importar getFirestore

const firebaseConfig = {
  apiKey: "AIzaSyA37Mv8luGVWh_574Tj4auO3YUmmZKd_fo",
  authDomain: "el-campito-admin.firebaseapp.com",
  databaseURL: "https://el-campito-admin-default-rtdb.firebaseio.com", // Este es el URL de la base de datos en tiempo real, pero lo reemplazamos ya que usaremos Firestore
  projectId: "el-campito-admin",
  storageBucket: "el-campito-admin.firebasestorage.app",
  messagingSenderId: "690350204145",
  appId: "1:690350204145:web:6ea51bee4555d591787550"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Usar Firestore
const db = getFirestore(app);

export { db };
