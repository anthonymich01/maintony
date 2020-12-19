import { getStudentsList, addStudent, deleteStudent } from "../../src/controllers/Student"

export default async (req, res) => {
  if (req.method === "GET") {
    const { limit = 10, offset = 0 } = req.query
    const response = await getStudentsList(limit, offset)
    res.status(200).json({ students: response })
  } else if (req.method === "POST") {
    const { full_name } = req.body
    const response = await addStudent(full_name)
    if (response) {
      res.status(200).send("Successfully Add Student.")
    } else {
      res.status(500).send("Fail to Add Student.")
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query
    const response = await deleteStudent(id)
    if (response) {
      res.status(200).send("Successfully Delete Student.")
    } else {
      res.status(500).send("Fail to Delete Student.")
    }
  } else {
    res.status(401).send("Method not supported.")
  }
}
