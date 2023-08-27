import React, { useState } from "react";
import { auth, db } from "../../utils/firebase"; // Firebase db import ediliyor
import { uid } from "uid";
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

function AddToDoModal({ showModal, closeModal }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleAddTodo = () => {
    const timestamp = Date.now();
    const formattedTimestamp = formatTimestamp(timestamp);
    setTodoTitle(todoTitle.trim()); // Başta ve sonda boşluk varsa sil
    if (!todoTitle) return; // Eğer todoTitle boşsa fonksiyondan çık

    const uidd = uid(); // uid oluşturuluyor
    set(ref(db, `todos/${auth.currentUser.uid}/todo/${uidd}`), {
      // uid ile todos collection'ına todo ekleniyor
      todo: todoTitle,
      lastupdate: timestamp,
      uidd: uidd,
      section: "todo",
      history: [
        {
          date: timestamp,
          action: "Todo created",
          owner: auth.currentUser.uid,
        },
      ],
    });

    setTodoTitle(""); // Input alanını temizle
    closeModal(); // Modalı kapat
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
            <h5 className="modal-title">Add Todo</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              className="form-control"
              placeholder="Enter todo title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeModal}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAddTodo}>
              Add Todo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToDoModal;
