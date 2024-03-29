import { useToast } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";
import { FieldValues } from "react-hook-form";
import { redirect } from "react-router-dom";
import { auth, database } from "../../config/firebase";

async function handleSignUp(
  data: FieldValues,
  toast: ReturnType<typeof useToast>
) {
  const { firstName, lastName, email, password, division } = data;

  try {
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
      division,
    });

    redirect("/");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast({
        title:
          error.code === "auth/email-already-in-use"
            ? "Email sudah terdaftar"
            : error.code,
        status: "error",
      });
    }
  }
}

async function handleSignIn(
  data: FieldValues,
  toast: ReturnType<typeof useToast>
) {
  const { email, password } = data;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    redirect("/");
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast({
        title:
          error.code === "auth/user-not-found"
            ? "Email tidak terdaftar"
            : error.code === "auth/wrong-password"
            ? "Password salah"
            : error.message,
        status: "error",
      });
    }
  }
}

async function handleForgotPassword(
  data: FieldValues,
  toast: ReturnType<typeof useToast>
) {
  const { email } = data;

  try {
    await sendPasswordResetEmail(auth, email);

    toast({
      title: "Email reset password telah dikirim",
      status: "success",
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      toast({
        title:
          error.code === "auth/invalid-email"
            ? "Email tidak valid"
            : error.code,
        status: "error",
      });
    }
  }
}

function handleSignOut() {
  signOut(auth);
}

export { handleSignUp, handleSignIn, handleForgotPassword, handleSignOut };
