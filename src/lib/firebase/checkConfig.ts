import "dotenv/config";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, listAll } from "firebase/storage";

async function checkFirebaseConfig() {
  console.log("Verificando configuración de Firebase...\n");

  // Verificar variables de entorno
  const requiredEnvVars = [
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];

  console.log("Variables de entorno encontradas:");
  for (const envVar of requiredEnvVars) {
    const value = process.env[envVar];
    console.log(`${envVar}: ${value ? "✓ Presente" : "✗ Faltante"}`);
  }

  try {
    // Intentar inicializar Firebase
    if (getApps().length === 0) {
      const app = initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      });

      console.log("\nConexión a Firebase exitosa ✓");

      // Verificar Firestore
      const db = getFirestore(app);
      try {
        await getDocs(collection(db, "products"));
        console.log("Conexión a Firestore exitosa ✓");
      } catch (error) {
        console.error("Error al conectar con Firestore:", error);
      }

      // Verificar Storage
      const storage = getStorage(app);
      try {
        await listAll(ref(storage, "products"));
        console.log("Conexión a Storage exitosa ✓");
      } catch (error) {
        console.error("Error al conectar con Storage:", error);
      }
    }
  } catch (error) {
    console.error("\nError al inicializar Firebase:", error);
  }
}

// Ejecutar la verificación
checkFirebaseConfig();
