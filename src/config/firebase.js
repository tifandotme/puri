import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD6eq4vdO_B0ivZN5oa68W97f_hSd0lMuk",
  projectId: "puri-systems",
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

// Do not use emulator in production! delete this line before deploying
// import { connectAuthEmulator } from "firebase/auth";
// import { connectDatabaseEmulator } from "firebase/database";
// connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
// connectDatabaseEmulator(database, "localhost", 9000);

export { auth, database };
