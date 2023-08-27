// TodoList.js
import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddToDoModal from "../addtodomodal";
import TodoItem from "../todoitem";
import { FaPlusCircle } from "react-icons/fa";

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

function TodoList({ title, section, todos, deleteTodo, moveTodo }) {
  const theme = useSelector((state) => state.theme);
  const [showModal, setShowModal] = useState(false);
  const isDarkTheme = theme === "dark";
  const backgroundClass = isDarkTheme ? "bgDark" : "bgBlue2";
  const borderClass = isDarkTheme ? "border-primary" : "border-light";
  const textClass = isDarkTheme ? "colorBlue" : "colorLight";

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sortedTodos = [...todos].sort((b, a) => b.lastupdate - a.lastupdate);

  return (
    <div className={`${borderClass} ${backgroundClass} border d-flex flex-column flex-grow-1 col-12 col-lg-3 p-3 rounded-4`}>
      <div className={`${borderClass} d-flex justify-content-between border-bottom mb-2`}>
        <h3 className={`${textClass} fw-bold`}>{title}</h3>
        {section === "todo" && (
          <button onClick={openModal} className={`${textClass} fw-bold p-0 m-0`}>
            <FaPlusCircle className="fs-2 p-0 m-0" />
          </button>
        )}
      </div>
      <ul className={`${backgroundClass} d-flex flex-column gap-2 p-0 m-0`}>
        {sortedTodos.map((todo) => (
          <TodoItem
            todos={todos}
            key={todo.uidd}
            uidd={todo.uidd}
            section={section}
            task={todo.todo}
            entrydata={formatTimestamp(todo.lastupdate)}
            deleteTodo={deleteTodo}
            moveTodo={moveTodo}
          />
        ))}
      </ul>
      <AddToDoModal showModal={showModal} closeModal={closeModal} />
    </div>
  );
}

export default TodoList;
