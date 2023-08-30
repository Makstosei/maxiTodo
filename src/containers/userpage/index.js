"use client";
import React from "react";
import { useSelector } from "react-redux";
import { db } from "../../utils/firebase";

import Header from "../../components/header";
import Footer from "../../components/footer";

import stars from "../../media/stars.jpeg";
import sky from "../../media/sky.jpg";
import { auth } from "@/utils/firebase";
import { onValue, ref, get } from "firebase/database";

function UserContainer({ children, ...props }) {
  const theme = useSelector((state) => state.theme);
  const backgroundThemeImage = theme === "dark" ? stars : sky;

  auth.onAuthStateChanged((user) => {
    if (user) {
      onValue(
        ref(db, `db/users/${auth.currentUser.uid}`),

        (snapshot) => {
          const data = snapshot.val();
          const displayName = data.displayName;
          console.log(displayName);
          const currentURL = `/users/${displayName}`;
          window.history.replaceState(null, "", currentURL);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  });

  const bodyStyle = {
    backgroundImage: `url(${backgroundThemeImage.src})`, // Arkaplan resmi
    backgroundColor: "rgba(0, 0, 0, 0)", // Siyah renk, %50 opaklık
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="d-flex flex-column minvh100 " style={bodyStyle}>
      <Header />
      <main className="d-flex justify-content-center flex-grow-1">{children}</main>
      <Footer />
    </div>
  );
}

export default UserContainer;
