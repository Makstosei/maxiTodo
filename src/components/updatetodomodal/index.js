import React, { useState } from "react";
import { auth, db } from "../../utils/firebase";
import { set, ref } from "firebase/database";
import alertify from "alertifyjs";

function UpdateToDoModal({ showModal, closeModal, todo }) {
  const [updatedTitle, setUpdatedTitle] = useState(todo.todo);

  const handleUpdateTodo = () => {
    const timestamp = Date.now();

    if (!updatedTitle) return;

    const updatedHistory = [
      ...todo.history,
      {
        date: timestamp,
        action: "Todo updated from : " + todo.todo + " to : " + updatedTitle + "",
        owner: auth.currentUser.uid,
      },
    ];

    set(ref(db, `db/todos/${auth.currentUser.uid}/${todo.section}/${todo.uidd}`), {
      todo: updatedTitle,
      lastupdate: timestamp,
      uidd: todo.uidd,
      section: todo.section,
      history: updatedHistory,
    });

    alertify.notify(`Todo updated from : ${todo.todo} to : ${updatedTitle} `, "success", 2);

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
