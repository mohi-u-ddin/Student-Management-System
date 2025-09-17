import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchStudents = () => api.get("/students");
export const addStudent = (student) => api.post("/student", student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);
export const getStudentById = (id) => api.get(`/students/${id}`); // ✅ new
