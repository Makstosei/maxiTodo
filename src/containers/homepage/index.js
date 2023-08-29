"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../../components/header";
import Footer from "../../components/footer";

import stars from "../../media/stars.jpeg";
import sky from "../../media/sky.jpg";

function HomeContainer({ children, ...props }) {
  const theme = useSelector((state) => state.theme);

  const backgroundThemeImage = theme === "dark" ? stars : sky;

  const bodyStyle = {
    backgroundImage: `url(${backgroundThemeImage.src})`, // Arkaplan resmi
    backgroundColor: "rgba(0, 0, 0, 0)", // Siyah renk, %50 opaklık
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  return (
    <div className="minvh100 d-flex flex-column" style={bodyStyle}>
      <Header />
      <main className="flex-grow-1 d-flex align-items-center justify-content-center">{children}</main>
      <Footer />
    </div>
  );
}

export default HomeContainer;
