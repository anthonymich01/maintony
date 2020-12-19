import { getUserByToken } from "../../src/controllers/User"

export default async (req, res) => {
  if (req.method === "GET") {
    const { token } = req.query
    const response = await getUserByToken(token)
    console.log(response)
    if (response) {
      res.status(200).json({ id: response })
    } else {
      res.status(500).send("User is wrong.")
    }
  } else {
    res.status(401).send("Method not supported.")
  }
}
