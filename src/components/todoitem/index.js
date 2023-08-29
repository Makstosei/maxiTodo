import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ref, remove, set } from "firebase/database";
import { auth, db } from "../../utils/firebase";
import UpdateTodoModal from "../updatetodomodal";

import { FaTrash, FaPenAlt, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaCheck, FaUndo } from "react-icons/fa";

import styles from "./style.module.css";

function TodoItem({ section, task, entrydata, uidd, todos }) {
  const theme = useSelector((state) => state.theme);
  const [showModal, setShowModal] = useState(false);
  const todo = todos.find((todo) => todo.uidd === uidd);

  const borderClass = theme === "dark" ? "border-primary" : "border-light";
  const textClass = theme === "dark" ? "colorDark" : "colorLight";
  const bgTextClass = theme === "dark" ? "bgBlue" : "bgBlue";
  const bgButtonsClass = theme === "dark" ? "bgBlue3" : "bgBlue3";

  const timestamp = Date.now();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleMoveToWorking = () => {
    moveTodo(uidd, section, "working");
  };
  const handleMoveToTodo = () => {
    moveTodo(uidd, section, "todo");
  };
  const handleMoveToCompleted = () => {
    moveTodo(uidd, section, "completed");
  };

  const moveTodo = (uidd, current, to) => {
    const todo = todos.find((todo) => todo.uidd === uidd);
    remove(ref(db, `db/todos/${auth.currentUser.uid}/${current}/${uidd}`));

    const newHistoryItem = {
      date: timestamp,
      action: "Todo moved to " + to,
      owner: auth.currentUser.uid,
    };

    const updatedHistory = [...todo.history, newHistoryItem]; // Yeni öğeyi ekleyerek güncellenmiş tarihçe dizisi

    set(ref(db, `db/todos/${auth.currentUser.uid}/${to}/${uidd}`), {
      todo: todo.todo,
      lastupdate: timestamp,
      uidd: uidd,
      section: to,
      history: updatedHistory, // Güncellenmiş tarihçe dizisini kaydet
    });
  };

  const handleDelete = async () => {
    await deleteTodo(uidd, section);
  };

  const deleteTodo = (uidd, section) => {
    if (section == "working") {
      remove(ref(db, `db/odos/${auth.currentUser.uid}/working/${uidd}`));
    }
    if (section == "completed") {
      remove(ref(db, `db/todos/${auth.currentUser.uid}/completed/${uidd}`));
    }
    if (section == "todo") {
      remove(ref(db, `db/todos/${auth.currentUser.uid}/todo/${uidd}`));
    }
  };

  return (
    <li className={`${borderClass} border border rounded-4 p-2 d-flex align-items-center justify-content-between`}>
      <div className={`${bgTextClass} d-flex flex-column ps-2 rounded-start-3 w-100 h-100 justify-content-center`}>
        <h5 className={`${textClass} p-0 pb-2 m-0 `}>{task}</h5>
        <p className={`${textClass} p-0 m-0 `}>{entrydata}</p>
      </div>
      <div className={`${bgButtonsClass} d-flex flex-wrap align-items-center  h-100 rounded-end-3 justify-content-center p-1 m-0`}>
        <div>
          {section == "todo" && (
            <button className="col" onClick={handleMoveToWorking}>
              <FaArrowAltCircleRight className={`${textClass} fs-4`} />
            </button>
          )}
          {section == "working" && (
            <button className="col" onClick={handleMoveToTodo}>
              <FaArrowAltCircleLeft className={`${textClass} fs-4`} />
            </button>
          )}

          {section !== "completed" && section !== "todo" && (
            <button className="col-6" onClick={handleMoveToCompleted}>
              <FaCheck className={`${textClass} fs-4`} />
            </button>
          )}

          {section == "completed" && (
            <button className="col" onClick={handleMoveToWorking}>
              <FaUndo className={`${textClass} fs-4`} />
            </button>
          )}
        </div>
        <div>
          {section !== "completed" && (
            <button className="col" onClick={openModal}>
              <FaPenAlt className={`${textClass} fs-4`} />
            </button>
          )}

          <button onClick={handleDelete}>
            <FaTrash className={`${textClass} fs-4`} />
          </button>
        </div>
      </div>
      <UpdateTodoModal showModal={showModal} closeModal={closeModal} todo={todo} />
    </li>
  );
}

export default TodoItem;
