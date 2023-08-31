import React from "react";
import TodoList from "../todolist";

import { auth, db } from "../../utils/firebase";
import { useState, useEffect } from "react";
import { onValue, ref, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";

export default function UserPage() {
  const [todos, setTodos] = useState([]);
  const [workingTodo, setWorkingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const updateTheme = async () => {
    try {
      const snapshot = await get(ref(db, `db/users/${auth.currentUser.uid}`));
      const data = snapshot.val();

      //setTheme çalışmadı.!!!!!!!!
      if (data && theme !== data.theme) {
        await dispatch(toggleTheme({ theme: data.theme }));
        console.log("Theme updated:", theme);
      }
      //setTheme çalışmadı.!!!!!!!!
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    }
  };
  updateTheme();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `db/todos/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          setWorkingTodo([]);
          setCompletedTodo([]);

          const data = snapshot.val();

          if (data) {
            if (data.todo) {
              Object.values(data.todo).map((todo) => {
                setTodos((oldArray) => [...oldArray, todo]);
              });
            }

            if (data.working) {
              Object.values(data.working).map((todo) => {
                setWorkingTodo((oldArray) => [...oldArray, todo]);
              });
            }

            if (data.completed) {
              Object.values(data.completed).map((todo) => {
                setCompletedTodo((oldArray) => [...oldArray, todo]);
              });
            }
          }
        });
      } else if (!user) {
        setTodos([]);
        router.push("/");
      }
    });
  }, []);

  return (
    <div className=" container d-flex flex-wrap flex-row gap-3 justify-content-center align-items-strech">
      <TodoList className="" title="To Do" section="todo" todos={todos} />
      <TodoList className="" title="Working On" section="working" todos={workingTodo} />
      <TodoList className="" title="Completed" section="completed" todos={completedTodo} />
    </div>
  );
}
