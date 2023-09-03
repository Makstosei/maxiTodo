import React from "react";
import TodoList from "../todolist";

import { auth, db } from "../../utils/firebase";
import { useState, useEffect } from "react";
import { onValue, ref, get } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { remove, set } from "firebase/database";

export default function UserPage() {
  const [todos, setTodos] = useState([]);
  const [workingTodo, setWorkingTodo] = useState([]);
  const [completedTodo, setCompletedTodo] = useState([]);
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const timestamp = Date.now();

  const moveTodo = (uidd, to) => {
    let result = () => {
      let foundTodo = null;

      if (foundTodo === undefined || foundTodo === null) {
        foundTodo = workingTodo.find((todo) => todo.uidd === uidd);
        if (foundTodo) {
          return foundTodo;
        }
      }

      if (foundTodo === undefined || foundTodo === null) {
        foundTodo = completedTodo.find((todo) => todo.uidd === uidd);
        if (foundTodo) {
          return foundTodo;
        }
      }

      if (foundTodo === undefined || foundTodo === null) {
        foundTodo = todos.find((todo) => todo.uidd === uidd);
        if (foundTodo) {
          return foundTodo;
        }
      }

      return foundTodo;
    };

    let todo = result();

    const newHistoryItem = {
      date: timestamp,
      action: "Todo moved to " + to,
      owner: auth.currentUser.uid,
    };

    const edittedtext = (text) => {
      const lowercase = text.toLowerCase();
      const removedSpace = lowercase.replace(/\s/g, "");
      return removedSpace;
    };

    const current = edittedtext(todo.section);
    const target = edittedtext(to);

    console.log(current, target);

    const updatedHistory = [...todo.history, newHistoryItem]; // Yeni öğeyi ekleyerek güncellenmiş tarihçe dizisi

    remove(ref(db, `db/todos/${auth.currentUser.uid}/${current}/${uidd}`));

    set(ref(db, `db/todos/${auth.currentUser.uid}/${target}/${uidd}`), {
      todo: todo.todo,
      lastupdate: timestamp,
      uidd: uidd,
      section: to,
      history: updatedHistory, // Güncellenmiş tarihçe dizisini kaydet
    });
  };

  const onDragEnd = (e) => {
    const { active, over } = e;
    moveTodo(active.id, over.id);
  };

  const updateTheme = async () => {
    try {
      const snapshot = await get(ref(db, `db/users/${auth.currentUser.uid}`));
      const data = snapshot.val();

      //setTheme çalışmadı.!!!!!!!!
      if (data && theme !== data.theme) {
        await dispatch(toggleTheme({ theme: data.theme }));
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

            if (data.workingon) {
              Object.values(data.workingon).map((todo) => {
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
      <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          <TodoList className="" title="To Do" section="todo" todos={todos} moveTodo={moveTodo} />
          <TodoList className="" title="Working On" section="workingon" todos={workingTodo} moveTodo={moveTodo} />
          <TodoList className="" title="Completed" section="completed" todos={completedTodo} moveTodo={moveTodo} />
        </SortableContext>
      </DndContext>
    </div>
  );
}
