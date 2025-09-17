import React from "react";

export default function DeleteModal({ open, onClose, students, onDelete }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Manage / Delete students</h3>

        <div style={{ maxHeight: "50vh", overflowY: "auto", marginTop: 10 }}>
          <table className="table">
            <thead>
              <tr><th>ID</th><th>Name</th><th>Semester</th><th>DOB</th><th></th></tr>
            </thead>
            <tbody>
              {students.length === 0 && (
                <tr><td colSpan="5" className="muted">No students</td></tr>
              )}
              {students.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td>{s.name}</td>
                  <td>{s.semester}</td>
                  <td>{s.dateofbirth ? new Date(s.dateofbirth).toLocaleDateString() : "-"}</td>
                  <td>
                    <button className="btn danger small" onClick={() => onDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
