import db from "../db"
import { deleteAssignmentById, addStudentAssignment, getStudentAssignment } from "../db/query"

export const addAssignment = async (student_id, course_id) => {
  try {
    await db.query(addStudentAssignment, [student_id, course_id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const checkDuplicatedAssignment = async (student_id, course_id) => {
  try {
    const res = await db.query(getStudentAssignment, [student_id, course_id])
    if (res.rows.length > 0) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteAssignment = async (id) => {
  try {
    await db.query(deleteAssignmentById, [id])
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
