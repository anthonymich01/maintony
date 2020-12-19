import axios from "axios"
import Cookie from "js-cookie"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api"
})

export const loginAttempt = (username, password) => {
  return api.post("/login", { username, password })
}

export const registerAttempt = (username, password) => {
  return api.post("/register", { username, password })
}

export const getUser = (token) => {
  return api.get("/users", { params: { token } })
}

export const addStudent = (full_name) => {
  return api.post("/students", { full_name })
}

export const getStudents = (limit = 10, offset = 0) => {
  return api.get("/students", {
    params: { limit, offset }
  })
}

export const deleteStudentById = (id) => {
  return api.delete("/students", {
    params: { id }
  })
}

export const addCourse = (name) => {
  return api.post("/courses", { name })
}

export const getCourses = () => {
  return api.get("/courses")
}

export const getCoursesByStudentId = (id) => {
  return api.get(`/students/${id}`)
}

export const deleteCourseById = (id) => {
  return api.delete("/courses", {
    params: { id }
  })
}

export const addAssignmentById = (student_id, course_id) => {
  return api.post("/assignments", { student_id, course_id })
}

export const deleteAssignmentById = (id) => {
  return api.delete("/assignments", {
    params: { id }
  })
}
