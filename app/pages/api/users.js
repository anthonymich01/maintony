import { getUserByToken } from "../../src/controllers/User"

const users = async (req, res) => {
  if (req.method === "GET") {
    const { token } = req.query
    const response = await getUserByToken(token)
    if (response) {
      res.status(200).json({ id: response })
    } else {
      res.status(403).send("User Credential is invalid.")
    }
  } else {
    res.status(405).send("Method not supported.")
  }
}

export default users
