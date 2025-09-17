import React, { useEffect, useState } from "react";
import api from "./api";
import Navbar from "./components/Navbar";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [view, setView] = useState("home"); // home | add | manage | search
  const [editingStudent, setEditingStudent] = useState(null);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      console.error("fetchStudents error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Search by ID
  const handleSearch = async (id) => {
    try {
      const res = await api.get(`/student/${id}`);
      setSearchResult(res.data);
      setView("search");
    } catch (err) {
      alert("❌ Student not found");
      setSearchResult(null);
    }
  };

  // Add student
  const handleAdd = async (payload, imageFile) => {
    try {
      const formData = new FormData();

      const formattedPayload = {
        ...payload,
        dateofbirth: payload.dateofbirth
          ? new Date(payload.dateofbirth).toISOString().split("T")[0]
          : null,
      };

      formData.append(
        "student1", // must match backend
        new Blob([JSON.stringify(formattedPayload)], { type: "application/json" }),
        "student.json"
      );

      if (imageFile) {
        formData.append("imagefile", imageFile);
      }

      const res = await api.post("/student", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStudents((prev) => [...prev, res.data]);
      setView("home");
      alert("✅ Student added successfully!");
      return true;
    } catch (err) {
      console.error("Add failed:", err.response?.data || err.message);
      alert("❌ Failed to add student: " + (err.response?.data || err.message));
      return false;
    }
  };

  // Update student
  const handleUpdate = async (id, payload, imageFile) => {
    try {
      const formData = new FormData();

      const formattedPayload = {
        ...payload,
        dateofbirth: payload.dateofbirth
          ? new Date(payload.dateofbirth).toISOString().split("T")[0]
          : null,
      };

      formData.append(
        "student0", // must match backend param name
        new Blob([JSON.stringify(formattedPayload)], { type: "application/json" }),
        "student.json"
      );

      if (imageFile) {
        formData.append("imagefile", imageFile);
      }

      const res = await api.put(`/student/${id}/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Update successful: " + res.data);
      await fetchStudents();
      setEditingStudent(null);
      setView("manage");
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("❌ Update failed: " + (err.response?.data || err.message));
    }
  };

  // Delete student
  const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      alert("✅ Student deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
      alert("❌ Delete failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} onNavigate={setView} />

      {view === "home" && (
        <div className="content">
          <h2>All Students</h2>
          <StudentList students={students} onDelete={handleDelete} />
        </div>
      )}

      {view === "search" && searchResult && (
        <div className="content">
          <h2>Search Result</h2>
          <StudentList students={[searchResult]} onDelete={handleDelete} />
        </div>
      )}

      {view === "add" && (
        <div className="content">
          <h2>Add Student</h2>
          <StudentForm onSubmit={handleAdd} />
        </div>
      )}

      {view === "manage" && (
        <div className="content">
          <h2>Manage / Delete Students</h2>
          {editingStudent ? (
            <StudentForm
              onSubmit={(data, image) => handleUpdate(editingStudent.id, data, image)}
              initialData={editingStudent}
              isUpdate
            />
          ) : (
            <StudentList
              students={students}
              onDelete={handleDelete}
              onEdit={(s) => setEditingStudent(s)}
              showDelete
              showEdit
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
