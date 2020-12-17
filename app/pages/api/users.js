import db from "../../src/db"

export default async (req, res) => {
  if (req.method === "GET") {
    // Process a GET request
    const response = await db.query("select * from students")
    res.statusCode = 200
    res.json({ name: response.rows })
  } else if (req.method === "POST") {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
