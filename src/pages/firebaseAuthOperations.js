import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "../config/firebase";

// TODO: implement Sentry for error logging

async function handleSignUp(
  { email, password, firstName, lastName, divisi },
  setLoading,
  navigate,
  toast
) {
  try {
    setLoading(true);

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: `${firstName} ${lastName}`,
    });

    await set(ref(database, `users/${userCredential.user.uid}`), {
      firstName,
      ...(lastName && { lastName }),
      email,
      divisi,
    });

    navigate("/");
  } catch (error) {
    toast({
      title: "Email sudah terdaftar",
      status: "error",
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
}

async function handleSignIn({ email, password }, setLoading, navigate, toast) {
  try {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password);

    navigate("/");
  } catch (error) {
    toast({
      title:
        error.code === "auth/user-not-found"
          ? "Email tidak terdaftar"
          : "Password salah",
      status: "error",
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
}

async function handleSignOut(navigate) {
  try {
    await signOut(auth);

    navigate("/login");
  } catch (error) {
    console.log("SIGN OUT ERROR = " + error.message);
  }
}

async function handleForgotPassword({ email }, setLoading, toast) {
  try {
    setLoading(true);

    await sendPasswordResetEmail(auth, email);

    toast({
      title: "Email reset password telah dikirim",
      status: "success",
      duration: 3000,
    });
  } catch (error) {
    toast({
      title: "Email tidak terdaftar",
      status: "error",
      duration: 3000,
    });
  } finally {
    setLoading(false);
  }
}

export { handleSignUp, handleSignIn, handleSignOut, handleForgotPassword };
