import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../utils/firebase";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { onValue, ref, get } from "firebase/database";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  const inputClass = theme === "dark" ? "inputDark" : "inputLight";
  const buttonClass = theme === "dark" ? "btnDark" : "btnLight";
  const titleClass = theme === "dark" ? "colorLight" : "colorLight";

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Signed in successfully");

      const user = userCredential.user;

      const snapshot = await get(ref(db, `db/users/${auth.currentUser.uid}`));
      const data = snapshot.val();

      router.push(`/user/${data.displayName}`);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };

  return (
    <div className={`d-flex flex-column align-items-center justify-content-center gap-1`}>
      <h3 className={`font-monospace ${titleClass}`}>Login</h3>
      <input className={` ${inputClass}`} type="email" placeholder="Email" onChange={handleEmailChange} onKeyDown={handleKeyPress} value={email} />
      <input
        className={` ${inputClass}`}
        type="password"
        placeholder="Password"
        onChange={handlePasswordChange}
        onKeyDown={handleKeyPress}
        value={password}
      />
      <button className={`${buttonClass} px-5 py-2`} onClick={handleSignIn}>
        Login
      </button>
    </div>
  );
}
