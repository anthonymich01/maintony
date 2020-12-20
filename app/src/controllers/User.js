import bcrypt from "bcrypt"
import { hashRounds } from "../constant/bcrypt"
import db from "../db"
import jwt from "jsonwebtoken"
import { getUserByUsername, getUserById, insertNewUserByUsernamePassword } from "../db/query"

export const getUserByToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return null
    }
    const res = await db.query(getUserById, [decoded.userId])
    if (res.rows[0]) {
      return res.rows[0]["id"]
    }
    return null
  } catch (error) {
    console.log(error.message)
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
  if (checkUserUsername) return { access_token: "" }

  const hashedPassword = await bcrypt.hash(password, hashRounds)

  try {
    const res = await db.query(insertNewUserByUsernamePassword, [trimmedUsername, hashedPassword])
    const newUserId = res.rows[0]["id"]
    const data = {
      userId: +newUserId
    }
    const accessToken = jwt.sign(data, process.env.JWT_SECRET)
    return { access_token: accessToken }
  } catch (error) {
    console.log(error)
    return { access_token: "" }
  }
}

export const loginUserByUsernamePassword = async (username, password) => {
  try {
    const res = await db.query(getUserByUsername, [username])
    if (res.rows[0]) {
      const userData = res.rows[0]
      const checkPassword = await bcrypt.compare(password, userData.password)
      if (checkPassword) {
        const data = {
          userId: +res.rows[0]["id"]
        }
        const accessToken = jwt.sign(data, process.env.JWT_SECRET)
        return { access_token: accessToken }
      }
    }
    return { access_token: "" }
  } catch (error) {
    console.log(error)
    return { access_token: "" }
  }
}
