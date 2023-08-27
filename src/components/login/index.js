"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../utils/firebase";
import styles from "./style.module.css";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const inputClass = theme === "dark" ? "inputDark" : "inputLight";
  const buttonClass = theme === "dark" ? "btnDark" : "btnLight";
  const titleClass = theme === "dark" ? "colorLight" : "colorLight";

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      }
    });
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log("singed in succesfully");
        const user = userCredential.user;
        router.push(`user/1`);
      })
      .catch((error) => {
        console.log("error");
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center gap-1`}>
      <h3 className={`font-monospace ${titleClass}`}>Login</h3>
      <input className={`${styles.email} ${inputClass}`} type="email" placeholder="Email" onChange={handleEmailChange} value={email} />
      <input className={`${styles.password} ${inputClass}`} type="password" placeholder="Password" onChange={handlePasswordChange} value={password} />
      <button className={`${buttonClass} px-5 py-2`} onClick={handleSignIn}>
        Login
      </button>
    </div>
  );
}
