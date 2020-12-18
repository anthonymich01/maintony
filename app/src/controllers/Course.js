import db from "../db"
import { getCoursesByStudentId } from "../db/query"

export const getCoursesListByStudentId = async (id) => {
  try {
    const res = await db.query(getCoursesByStudentId, [id])
    return res.rows
  } catch (error) {
    console.log(error)
    return []
  }
}
