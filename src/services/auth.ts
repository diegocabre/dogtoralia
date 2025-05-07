import { signIn, signOut } from "next-auth/react";

export async function signInWithGoogle() {
  try {
    await signIn("google", { callbackUrl: "/" });
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await signOut({ callbackUrl: "/" });
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}
