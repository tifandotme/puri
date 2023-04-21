import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// IN CASE ACCESS FROM LOCALHOST IS BLOCKED:
// https://stackoverflow.com/questions/43850238/localhost-requests-from-referer-are-blocked

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  projectId: "puri-systems",
  authDomain: "puri-systems.web.app",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL:
    "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

// import { connectAuthEmulator } from "firebase/auth";
// import { connectDatabaseEmulator } from "firebase/database";
// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, "http://localhost:9100", { disableWarnings: true });
//   connectDatabaseEmulator(database, "localhost", 9200);
// }

export { auth, database };
