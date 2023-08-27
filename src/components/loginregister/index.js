"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { auth, db } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Login from "../../components/Login";
import Register from "../../components/Register";
import { useRouter } from "next/navigation"; // useRouter ekledik

import styles from "./style.module.css";

function LoginRegister() {
  const [isRegister, setIsRegister] = React.useState(false);
  const theme = useSelector((state) => state.theme);
  const router = useRouter(); // useRouter kullanımı

  const titleClass = theme === "dark" ? styles.titleDark : styles.titleLight;

  const handleToggleForm = () => {
    setIsRegister(!isRegister);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/user/1");
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <div className="welcome d-flex flex-column">
      {isRegister ? <Register /> : <Login />}
      <button className={`${titleClass} mt-3`} onClick={handleToggleForm}>
        {isRegister ? "Already have an account?" : "Don't have an account? Register here."}
      </button>
    </div>
  );
}

export default LoginRegister;
