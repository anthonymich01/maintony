import db from "../db"
import { getStudents } from "../db/query"

export const getStudentsList = async (limit, offset) => {
  try {
    const res = await db.query(getStudents, [limit, offset])
    return res.rows
  } catch (error) {
    console.log(error)
    return []
  }
}
