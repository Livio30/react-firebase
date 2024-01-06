import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Successfully created user account");
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Successfully created user account");
    } catch (error) {
      console.error(error);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      alert("Successfully Logged out");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input
        type='password'
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signIn}>Login</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
