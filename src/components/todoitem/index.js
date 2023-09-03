"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { ref, remove, set } from "firebase/database";
import { auth, db } from "../../utils/firebase";
import UpdateTodoModal from "../updatetodomodal";

import { FaTrash, FaPenAlt, FaArrowAltCircleRight, FaArrowAltCircleLeft, FaCheck, FaUndo } from "react-icons/fa";

function TodoItem({ section, task, entrydata, uidd, todos, moveTodo }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({
    id: uidd,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

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
    moveTodo(uidd, "workingon");
  };
  const handleMoveToTodo = () => {
    moveTodo(uidd, "todo");
  };
  const handleMoveToCompleted = () => {
    moveTodo(uidd, "completed");
  };

  const handleDelete = async () => {
    console.log(uidd, section);
    await deleteTodo(uidd, section);
  };

  const deleteTodo = (uidd, section) => {
    if (section == "workingon") {
      remove(ref(db, `db/todos/${auth.currentUser.uid}/workingon/${uidd}`));
    }
    if (section == "completed") {
      remove(ref(db, `db/todos/${auth.currentUser.uid}/completed/${uidd}`));
    }
    if (section == "todo") {
      remove(ref(db, `db/todos/${auth.currentUser.uid}/todo/${uidd}`));
    }
  };

  return (
    <li ref={setNodeRef} style={style} className={`${borderClass} border border rounded-4 p-2 d-flex align-items-center justify-content-between`}>
      <div {...listeners} {...attributes} className={`${bgTextClass} d-flex flex-column ps-2 rounded-start-3 w-100 h-100 justify-content-center`}>
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
          {section == "workingon" && (
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
