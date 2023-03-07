import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

// IN CASE YOU ARE WONDERING AGAIN WHY ACCESS FROM LOCALHOST IS BLOCKED
// https://stackoverflow.com/questions/43850238/localhost-requests-from-referer-are-blocked

const firebaseConfig = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  projectId: "puri-systems",
  authDomain: "puri-systems.web.app", // test, idk what this does
  storageBucket: "puri-systems.appspot.com",
  messagingSenderId: "684555146850",
  appId: "1:684555146850:web:158162497d3aff2b73233b",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(
  app,
  "https://puri-systems-default-rtdb.asia-southeast1.firebasedatabase.app"
);

// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
//   connectDatabaseEmulator(database, "localhost", 9000);
// }

export { auth, database };
