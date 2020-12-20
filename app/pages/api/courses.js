import { getCoursesList, addCourse, deleteCourse } from "../../src/controllers/Course"
import auth from "../../src/middleware/auth"

const courses = async (req, res) => {
  if (req.method === "GET") {
    const response = await getCoursesList()
    res.status(200).json({ courses: response })
  } else if (req.method === "POST") {
    const { name } = req.body
    const response = await addCourse(name)
    if (response) {
      res.status(200).send("Successfully Add Course.")
    } else {
      res.status(500).send("Fail to Add Course.")
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query
    const response = await deleteCourse(id)
    if (response) {
      res.status(200).send("Successfully Delete Course.")
    } else {
      res.status(500).send("Fail to Delete Course.")
    }
  } else {
    res.status(401).send("Method not supported.")
  }
}

export default auth(courses)
