"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../utils/firebase";

import User from "../../../components/user";

function App() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/");
      } else {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="d-flex justify-content-center flex-grow-1 p-3">
      {isLoading ? <div className="d-flex align-items-center justify-content-center">Loading...</div> : <User />}
    </div>
  );
}

export default App;
