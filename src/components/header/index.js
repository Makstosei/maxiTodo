"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { db } from "../../utils/firebase";
import { onValue, ref, get } from "firebase/database";

import { auth } from "../../utils/firebase";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import alertify from "alertifyjs";

import styles from "./style.module.css";
import Image from "next/image";
import cloudyMoon from "../../media/cloudynight.png";
import sunny from "../../media/sunizup.png";
import { current } from "@reduxjs/toolkit";

async function CheckUser() {
  const currentURL = window.location.pathname;
  if (currentURL.startsWith("/user/")) {
    const snapshot = await get(ref(db, `db/users/${auth.currentUser.uid}`));
    const data = snapshot.val();
    alertify.notify(`Welcome ${data.displayName}`, "success", 2);
  }
}

function Header() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const moonImage = theme === "dark" ? cloudyMoon : sunny;
  const headerClass = theme === "dark" ? styles.headerDark : styles.headerLight;

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      const currentURL = window.location.pathname;
      if (user && currentURL.startsWith("/user/")) {
        setUser(user);
        CheckUser(router);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleSignOut = () => {
    router.push("/");
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
