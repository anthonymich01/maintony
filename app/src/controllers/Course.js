import db from "../db"
import { getCourses, getCoursesByStudentId, addCourseByName, deleteCourseById } from "../db/query"

export const getCoursesList = async () => {
  try {
    const res = await db.query(getCourses)
    return res.rows
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getCoursesListByStudentId = async (id) => {
  try {
    const res = await db.query(getCoursesByStudentId, [id])
    return res.rows
  } catch (error) {
    console.log(error)
    return []
  }
}

export const addCourse = async (name) => {
  try {
    await db.query(addCourseByName, [name])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteCourse = async (id) => {
  try {
    await db.query(deleteCourseById, [id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
