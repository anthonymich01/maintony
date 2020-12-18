import { getStudentsList } from "../../src/controllers/Student"

export default async (req, res) => {
  if (req.method === "GET") {
    const { limit = 10, offset = 0 } = req.query
    const response = await getStudentsList(limit, offset)
    res.status(200).json({ students: response })
  } else if (req.method === "POST") {
  } else {
    res.status(401).send("Method not supported.")
  }
}
