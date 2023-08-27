import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

import styles from "./style.module.css";

function Footer() {
  const theme = useSelector((state) => state.theme);
  const titleClass = theme === "dark" ? "colorLight" : "colorDark";
  const linkClass = theme === "dark" ? "colorBlue" : "colorBlue";
  const footerClass = theme === "dark" ? styles.footerDark : styles.footerLight;

  return (
    <footer className={`${footerClass} d-flex flex-column align-items-center justify-content-center`}>
      <div className={`${titleClass} `}>
        Made with ❤️ by&nbsp;
        <Link className={`${linkClass} fs-5 text-decoration-underline`} href="https://www.linkedin.com/in/makstosei" target="_blank">
          Seyit Maksutoğlu
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
