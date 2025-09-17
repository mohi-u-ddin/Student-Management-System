import React, { useState } from "react";

function StudentForm({ onSubmit, initialData = {}, isUpdate = false }) {
  const [form, setForm] = useState({
    id: initialData.id || "",
    name: initialData.name || "",
    semester: initialData.semester || "",
    dateofbirth: initialData.dateofbirth
      ? new Date(initialData.dateofbirth).toISOString().split("T")[0]
      : "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form, imageFile);
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      {!isUpdate && (
        <input
          type="number"
          name="id"
          value={form.id}
          onChange={handleChange}
          placeholder="ID"
          required
        />
      )}
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="semester"
        value={form.semester}
        onChange={handleChange}
        placeholder="Semester"
        required
      />
      <input
        type="date"
        name="dateofbirth"
        value={form.dateofbirth}
        onChange={handleChange}
      />
      <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
      <button type="submit">{isUpdate ? "Update Student" : "Add Student"}</button>
    </form>
  );
}

export default StudentForm;
