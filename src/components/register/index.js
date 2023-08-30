"use client";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { set, ref } from "firebase/database";

export default function Register() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const inputClass = theme === "dark" ? "inputDark" : "inputLight";
  const buttonClass = theme === "dark" ? "btnDark" : "btnLight";
  const titleClass = theme === "dark" ? "colorLight" : "colorLight";

  const [registerInformation, setRegisterInformation] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    displayName: "",
  });

  const handleRegister = () => {
    if (registerInformation.email !== registerInformation.confirmEmail) {
      alert("Emails do not match");
      return;
    }

    if (registerInformation.password !== registerInformation.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (registerInformation.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (registerInformation.displayName.length < 3) {
      alert("Display name must be at least 3 characters");
      return;
    }

    handleRegistration(registerInformation, theme);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister(); // Enter tuşuna basıldığında giriş işlemini tetikle
    }
  };
  async function handleRegistration(registerInformation, theme) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerInformation.email, registerInformation.password);
      const user = userCredential.user;

      if (auth.currentUser) {
        await set(ref(db, `db/users/${auth.currentUser.uid}`), {
          displayName: registerInformation.displayName,
          email: registerInformation.email,
          password: registerInformation.password,
          theme: theme,
        });
      }

      await router.push(`user/${registerInformation.displayName}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    }
  }

  return (
    <div className={`d-flex flex-column gap-1 justify-content-center align-items-center`}>
      <h3 className={`font-monospace ${titleClass}`}>Register</h3>
      <input
        className={` ${inputClass}`}
        type="text"
        placeholder="Display Name"
        value={registerInformation.displayName}
        onKeyDown={handleKeyPress}
        onChange={(e) => setRegisterInformation({ ...registerInformation, displayName: e.target.value })}
      />
      <input
        className={`${inputClass}`}
        type="email"
        placeholder="Email"
        value={registerInformation.email}
        onKeyDown={handleKeyPress}
        onChange={(e) => setRegisterInformation({ ...registerInformation, email: e.target.value })}
      />
      <input
        className={` ${inputClass}`}
        type="email"
        placeholder="Confirm Email"
        value={registerInformation.confirmEmail}
        onKeyDown={handleKeyPress}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmEmail: e.target.value })}
      />

      <input
        className={` ${inputClass}`}
        type="password"
        placeholder="Password"
        value={registerInformation.password}
        onKeyDown={handleKeyPress}
        onChange={(e) => setRegisterInformation({ ...registerInformation, password: e.target.value })}
      />
      <input
        className={` ${inputClass}`}
        type="password"
        placeholder="Confirm Password"
        value={registerInformation.confirmPassword}
        onKeyDown={handleKeyPress}
        onChange={(e) => setRegisterInformation({ ...registerInformation, confirmPassword: e.target.value })}
      />

      <button className={`${buttonClass} px-5 py-2`} onClick={handleRegister}>
        Sign In
      </button>
    </div>
  );
}
