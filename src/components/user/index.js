import React from "react";
import TodoList from "../todolist";

import { auth, db } from "../../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { onValue, ref, remove, set } from "firebase/database";

function formatTimestamp(timestamp) {
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return new Date(timestamp).toLocaleString("tr-TR", options);
}

export default function UserPage() {
  const [todos, setTodos] = useState([]);
  const [workingTodo, setWorkingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const [edit, setEdit] = useState(false);
  const timestamp = Date.now();
  const formattedTimestamp = formatTimestamp(timestamp);

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
