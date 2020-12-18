import axios from "axios"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api"
})

export const getStudents = (limit = 10, offset = 0) => {
  return api.get("/students", {
    params: { limit, offset }
  })
}

export const getCoursesByStudentId = (id) => {
  return api.get(`/students/${id}`)
}

export const addAssignmentById = (student_id, course_id) => {
  return api.post("/assignments", { student_id, course_id })
}

export const deleteAssignmentById = (id) => {
  return api.delete("/assignments", {
    params: { id }
  })
}
