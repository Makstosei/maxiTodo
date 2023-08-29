"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { set, ref } from "firebase/database";

import styles from "./style.module.css";

export default function Register() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const inputClass = theme === "dark" ? "inputDark" : "inputLight";
  const buttonClass = theme === "dark" ? "btnDark" : "btnLight";
  const titleClass = theme === "dark" ? "titleDark" : "titleLight";

  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    displayName: "",
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
        const user = userCredential.user;
        firebaseUserSave(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

    const firebaseUserSave = async (user) => {
      await set(ref(db, "users/" + user.uid), {
        email: user.email,
        displayName: registerInformation.displayName,
        uid: user.uid,
        photoURL: user.photoURL,
      });
      router.push(`/user/${displayName}`);
    };
  }

  return (
    <div className={`d-flex flex-column gap-1 justify-content-center align-items-center`}>
      <h3 className={`font-monospace ${titleClass}`}>Register</h3>
      <input
        className={` ${inputClass}`}
        type="text"
        placeholder="Display Name"
        value={registerInformation.displayName}
        onChange={(e) => setRegisterInformation({ ...registerInformation, displayName: e.target.value })}
      />
      <input
        className={`${inputClass}`}
        type="email"
        placeholder="Email"
        value={registerInformation.email}
        onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })}
      />
      <input
        className={` ${inputClass}`}
        type="email"
        placeholder="Confirm Email"
        value={registerInformation.confirmEmail}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })}
      />

      <input
        className={` ${inputClass}`}
        type="password"
        placeholder="Password"
        value={registerInformation.password}
        onChange={(e) => setRegisterInformation({ ...registerInformation, password: e.target.value })}
      />
      <input
        className={` ${inputClass}`}
        type="password"
        placeholder="Confirm Password"
        value={registerInformation.confirmPassword}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmPassword: e.target.value })}
      />

      <button className={`${buttonClass} px-5 py-2`} onClick={handleRegister}>
        Sign In
      </button>
    </div>
  );
}
