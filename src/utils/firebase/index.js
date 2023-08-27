// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbC8e1b9zG7TxWCoG3QTAnveqx5zWPMSM",
  authDomain: "maxi-todo.firebaseapp.com",
  databaseURL: "https://maxi-todo-default-rtdb.firebaseio.com",
  projectId: "maxi-todo",
  storageBucket: "maxi-todo.appspot.com",
  messagingSenderId: "465510659511",
  appId: "1:465510659511:web:065b04b7af8404e953a432",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const auth = getAuth(app);
