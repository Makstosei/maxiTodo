"use client";
import React from "react";
import { useSelector } from "react-redux";
import alertify from "alertifyjs";
import { auth } from "../../utils/firebase";

import Header from "../../components/header";
import Footer from "../../components/footer";

import stars from "../../media/stars.jpeg";
import sky from "../../media/sky.jpg";

function UserContainer({ children, ...props }) {
  const theme = useSelector((state) => state.theme);
  const backgroundThemeImage = theme === "dark" ? stars : sky;

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
