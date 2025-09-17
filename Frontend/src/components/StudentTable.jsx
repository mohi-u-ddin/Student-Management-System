import React from "react";

export default function StudentTable({ students, onDelete }) {
  return (
    <div className="card table-wrap">
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Semester</th><th>DOB</th><th></th></tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr><td colSpan="5" className="muted">No students found</td></tr>
          ) : (
            students.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.semester}</td>
                <td>{s.dateofbirth ? new Date(s.dateofbirth).toLocaleDateString() : "-"}</td>
                <td>
                  <button className="btn danger small" onClick={() => onDelete(s.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
