import React, { useState } from "react";
import { auth, db } from "../../utils/firebase";
import { set, ref } from "firebase/database";

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

function UpdateToDoModal({ showModal, closeModal, todo }) {
  const [updatedTitle, setUpdatedTitle] = useState(todo.todo);

  const handleUpdateTodo = () => {
    const timestamp = Date.now();
    const formattedTimestamp = formatTimestamp(timestamp);

    if (!updatedTitle) return;

    const updatedHistory = [
      ...todo.history,
      {
        date: formattedTimestamp,
        action: "Todo updated",
        owner: auth.currentUser.uid,
      },
    ];

    set(ref(db, `todos/${auth.currentUser.uid}/${todo.section}/${todo.uidd}`), {
      todo: updatedTitle,
      created: formattedTimestamp,
      uidd: todo.uidd,
      section: todo.section,
      history: updatedHistory,
    });

    closeModal();
  };

  return (
    <div
      className={`modal ${showModal ? "show d-flex align-items-center bgGradient" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog w-100" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Todo</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Enter updated todo title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleUpdateTodo}>
              Update Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateToDoModal;
