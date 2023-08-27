"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase";

import styles from "./style.module.css";

export default function Register() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const inputClass = theme === "dark" ? styles.inputDark : styles.inputLight;
  const buttonClass = theme === "dark" ? styles.btnDark : styles.btnLight;
  const titleClass = theme === "dark" ? styles.titleDark : styles.titleLight;

  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  function handleRedirect() {
    router.push("/");
  }
  function handleRegister() {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Emails do not match");
      return;
    } else if (registerInformation.password !== registerInformation.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        router.push("/user/1");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }

  return (
    <div className={styles.login}>
      <h3 className={`font-monospace ${titleClass}`}>Register</h3>
      <input
        className={`${styles.email} ${inputClass}`}
        type="email"
        placeholder="Email"
        value={registerInformation.email}
        onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })}
      />
      <input
        className={`${styles.email} ${inputClass}`}
        type="email"
        placeholder="Confirm Email"
        value={registerInformation.confirmEmail}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })}
      />

      <input
        className={`${styles.password} ${inputClass}`}
        type="password"
        placeholder="Password"
        value={registerInformation.password}
        onChange={(e) => setRegisterInformation({ ...registerInformation, password: e.target.value })}
      />
      <input
        className={`${styles.password} ${inputClass}`}
        type="password"
        placeholder="Confirm Password"
        value={registerInformation.confirmPassword}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmPassword: e.target.value })}
      />

      <button className={buttonClass} onClick={handleRegister}>
        Sign In
      </button>
    </div>
  );
}
