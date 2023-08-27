"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";

import { auth } from "../../utils/firebase";
import { toggleTheme } from "../../redux/reducers/themeReducer";

import styles from "./style.module.css";
import Image from "next/image";
import cloudyMoon from "../../media/cloudynight.png";
import sunny from "../../media/sunizup.png";

function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.theme);

  const moonImage = theme === "dark" ? cloudyMoon : sunny;
  const headerClass = theme === "dark" ? styles.headerDark : styles.headerLight;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
        alert("An error happened.");
      });
  };

  return (
    <header className={`${headerClass} fluid d-flex`}>
      <div className={` container d-flex flex-row align-items-center justify-content-between`}>
        <div className="d-flex border-bottom border-primary">
          <Link href="/" className={`d-flex justify-content-center text-primary gap-3 fs-1 fw-bold text-decoration-none`}>
            Wha-T
          </Link>
          <button className="p-0 m-0 colorLight" onClick={() => dispatch(toggleTheme())}>
            <Image src={moonImage} width={50} height={50} alt="Moon" />
          </button>
          <Link href="/" className={`d-flex align-items-center colorBlue fs-2 fw-bold  text-decoration-none`}>
            DO
          </Link>
        </div>
        <div className="d-flex text-center fs-3 py-4">
          <div>
            {user ? (
              <button className="btnLight fs-6 px-3 py-1" onClick={handleSignOut}>
                X
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
