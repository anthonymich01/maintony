import db from "../db"
import { getStudents, addStudentByFullName, deleteStudentById } from "../db/query"

export const getStudentsList = async (limit, offset) => {
  try {
    const res = await db.query(getStudents, [limit, offset])
    return res.rows
  } catch (error) {
    console.log(error)
    return []
  }
}

export const addStudent = async (full_name) => {
  try {
    await db.query(addStudentByFullName, [full_name])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteStudent = async (id) => {
  try {
    await db.query(deleteStudentById, [id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
