import React from "react";

function StudentList({ students, onDelete, onEdit, showDelete, showEdit }) {
  if (!students || students.length === 0) {
    return <p>No students found.</p>;
  }

  return (
    <ul className="student-list">
      {students.map((s) => (
        <li key={s.id} className="student-card">
          <div className="student-info">
            <p><strong>ID:</strong> {s.id}</p>
            <p><strong>Name:</strong> {s.name}</p>
            <p><strong>Semester:</strong> {s.semester}</p>
            <p>
              <strong>DOB:</strong>{" "}
              {s.dateofbirth ? new Date(s.dateofbirth).toLocaleDateString() : ""}
            </p>
          </div>
          {s.id && (
            <img
              src={`http://localhost:8080/api/student/${s.id}/image`}
              alt={s.name}
              className="student-image"
            />
          )}
          {showDelete && (
            <button onClick={() => onDelete(s.id)} className="delete-btn">
              Delete
            </button>
          )}
          {showEdit && (
            <button onClick={() => onEdit(s)} className="update-btn">
              Update
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

export default StudentList;
