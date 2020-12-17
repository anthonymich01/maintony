import bcrypt from "bcrypt"
import { saltRounds } from "../constant/bcrypt"
import * as db from "../db"
import { getUserByUsername, getUserIdById } from "../db/query"

export const getUserDetailById = async (id) => {
  try {
    const res = await db.query(getUserIdById, [id])
    if (res.rows[0]) {
      const userDetail = res.rows[0]
      return {
        id: userDetail.id,
        full_name: userDetail.full_name,
        email: userDetail.email,
        role: userDetail.role
      }
    }
    return null
  } catch (error) {
    console.log(error)
    return null
  }
}

const isUsernameDuplicated = async (username) => {
  try {
    const res = await db.query(getUserByUsername, [username])
    if (res.rows[0]) {
      return true
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

export const createUserByUsernamePassword = async (username, password) => {
  const trimmedUsername = username.trim()

  const checkUserUsername = await isUsernameDuplicated(trimmedUsername)
  if (checkUserUsername) return { status: false, message: "Username already taken." }

  const hashedPassword = await bcrypt.hash(password, saltRounds)

  try {
    const res = await db.query(insertNewUserByUsernamePassword, [trimmedUsername, hashedPassword])
    const newUserId = res.rows[0]["id"]
    await db.query(insertNewDefaultWatchlistByUserId, [newUserId])

    return { status: true, message: "" }
  } catch (error) {
    console.log(error)
    return { status: false, message: error }
  }
}

export const loginUserByUsernamePassword = async (username, password) => {
  try {
    const res = await db.query(getUserByUsername, [username])
    if (res.rows[0]) {
      const userData = res.rows[0]
      const checkPassword = await bcrypt.compare(password, userData.password)
      if (checkPassword) return { status: true, message: "", userId: +userData.id }
    }
    return { status: false, message: "Credentials are incorrect." }
  } catch (error) {
    console.log(error)
    return { status: false, message: error }
  }
}
