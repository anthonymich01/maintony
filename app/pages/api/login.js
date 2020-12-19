import { loginUserByUsernamePassword } from "../../src/controllers/User"

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body
    const response = await loginUserByUsernamePassword(username, password)
    if (response.access_token) {
      res.status(200).json(response)
    } else {
      res.status(500).send("Credential Error.")
    }
  } else {
    res.status(401).send("Method not supported.")
  }
}
