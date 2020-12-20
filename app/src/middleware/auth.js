import { getUserByToken } from "../controllers/User"

const auth = (handler) => async (req, res) => {
  const token = req.cookies["token"]
  const response = await getUserByToken(token)
  if (!token || !response) {
    res.status(401).send("Token is not available / invalid")
  } else {
    return handler(req, res)
  }
}

export default auth
