import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";

// import { connectAuthEmulator } from "firebase/auth";
// import { connectDatabaseEmulator } from "firebase/database";

// IN CASE ACCESS FROM LOCALHOST IS BLOCKED:
// https://stackoverflow.com/questions/43850238/localhost-requests-from-referer-are-blocked

const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  projectId: "puri-systems",
  authDomain: "puri-systems.web.app",
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: "684555146850",
  appId: "1:684555146850:web:158162497d3aff2b73233b",
};

const app: FirebaseApp = initializeApp(firebaseConfig);

const auth: Auth = getAuth(app);
const database: Database = getDatabase(
  app,
  "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app"
);

// local emulator in development mode
// if (!import.meta.env.DEV) {
//   connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
//   connectDatabaseEmulator(database, "localhost", 9000);
// }

export { auth, database };
