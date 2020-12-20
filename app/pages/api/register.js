import { createUserByUsernamePassword } from "../../src/controllers/User"

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body
    const response = await createUserByUsernamePassword(username, password)
    if (response.access_token) {
      res.status(200).json(response)
    } else {
      res.status(403).send("Username is already taken.")
    }
  } else {
    res.status(405).send("Method not supported.")
  }
}
