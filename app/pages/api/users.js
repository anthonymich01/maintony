import * as db from "../../src/db"

export default (req, res) => {
  if (req.method === "GET") {
    // Process a GET request
    res.statusCode = 200
    res.json({ name: "John Doe" })
  } else if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
