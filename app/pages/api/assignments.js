import { getCoursesListByStudentId } from "../../src/controllers/Course"
import {
  deleteAssignment,
  addAssignment,
  checkDuplicatedAssignment
} from "../../src/controllers/Assignment"
import auth from "../../src/middleware/auth"

const assignments = async (req, res) => {
  if (req.method === "GET") {
    const { student_id } = req.query
    const response = await getCoursesListByStudentId(student_id)
    res.status(200).json({ courses: response })
  } else if (req.method === "POST") {
    const { student_id, course_id } = req.body
    const responseCheck = await checkDuplicatedAssignment(student_id, course_id)
    if (responseCheck) {
      res.status(405).send("Course Already Assigned.")
    }
    const responseAdd = await addAssignment(student_id, course_id)
    if (responseAdd) {
      res.status(200).send("Successfully Add Assignment")
    } else {
      res.status(500).send("Internal Server Error.")
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query
    const response = await deleteAssignment(id)
    if (response) {
      res.status(200).send("Successfully Delete Assignment")
    } else {
      res.status(500).send("Internal Server Error.")
    }
  } else {
    res.status(405).send("Method not supported.")
  }
}

export default auth(assignments)
