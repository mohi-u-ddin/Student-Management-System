import React, { useState } from "react";

function Navbar({ onSearch, onNavigate }) {
  const [id, setId] = useState("");

  const handleSearch = () => {
    if (id.trim()) {
      onSearch(id.trim());
      setId("");
    }
  };

  return (
    <div className="navbar">
      <h1>Student Management</h1>
      <div className="nav-actions">
        <input
          type="number"
          placeholder="Search by ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={() => onNavigate("add")}>Add Student</button>
        <button onClick={() => onNavigate("manage")}>Manage/Delete</button>
        <button onClick={() => onNavigate("home")}>Home</button>
      </div>
    </div>
  );
}

export default Navbar;
