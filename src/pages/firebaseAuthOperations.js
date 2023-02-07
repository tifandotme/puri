import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../config/firebase";

function handleSignUp({ email, password, firstName, lastName, divisi }) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // add displayName
      updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });
      // add user to realtime database
      set(ref(database, `users/${userCredential.user.uid}`), {
        firstName,
        ...(lastName && { lastName }),
        email,
        divisi,
      });
    })
    .catch((error) => {
      console.log("SIGN UP ERROR = " + error.message);
    });
}

function handleSignIn({ email, password }) {
  signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.log("SIGN IN ERROR = " + error.message);
  });
}

function handleSignOut() {
  signOut(auth).catch((error) => {
    console.log("SIGN OUT ERROR = " + error.message);
  });
}

export { handleSignUp, handleSignIn, handleSignOut };
