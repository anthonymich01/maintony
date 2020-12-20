import { getCoursesListByStudentId } from "../../../src/controllers/Course"
import auth from "../../../src/middleware/auth"

const id = async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query
    const response = await getCoursesListByStudentId(id)
    res.status(200).json({ courses: response })
  } else if (req.method === "POST") {
  } else {
    res.status(401).send("Method not supported.")
  }
}

export default auth(id)
