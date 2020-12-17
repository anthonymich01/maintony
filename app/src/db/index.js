import { Pool } from "pg"

const pool = new Pool()

const query = (text, params) => pool.query(text, params)
const end = () => pool.end()

export default { query, end }
