"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { auth, db } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../../components/login";
import Register from "../../components/register";
import { useRouter } from "next/navigation"; // useRouter ekledik
import { signOut } from "firebase/auth";

import styles from "./style.module.css";

function LoginRegister() {
  const [isRegistering, setIsRegister] = React.useState(false);
  const theme = useSelector((state) => state.theme);
  const router = useRouter(); // useRouter kullanımı

  const titleClass = theme === "dark" ? styles.titleDark : styles.titleLight;

  const handleToggleForm = () => {
    const newIsRegister = !isRegistering;
    setIsRegister(newIsRegister);
    console.log(newIsRegister);
  };
  auth.signOut();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (auth.currentUser && isRegistering) {
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="welcome d-flex flex-column">
      {isRegistering ? <Register /> : <Login />}
      <button className={`${titleClass} mt-3`} onClick={handleToggleForm}>
        {isRegistering ? "Already have an account?" : "Don't have an account? Register here."}
      </button>
    </div>
  );
}

export default LoginRegister;
