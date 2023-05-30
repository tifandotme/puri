import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { getMessaging } from "firebase/messaging";

// IN CASE ACCESS FROM LOCALHOST IS BLOCKED:
// https://stackoverflow.com/questions/43850238/localhost-requests-from-referer-are-blocked

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  projectId: "puri-systems",
  authDomain: "puri-systems.firebaseapp.com",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: "684555146850",
  appId: "1:684555146850:web:158162497d3aff2b73233b",
  databaseURL:
    "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const messaging = getMessaging(app);
const functions = getFunctions(app);

if (!import.meta.env.PROD) {
  // connectAuthEmulator(auth, "http://localhost:9100", { disableWarnings: true });
  // connectDatabaseEmulator(database, "localhost", 9200);
  connectFunctionsEmulator(functions, "localhost", 9300);
}

export { auth, database, messaging, functions };
