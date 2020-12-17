// USER Query
export const getUserByUsername = `
SELECT id, password FROM users WHERE username = $1 AND deleted_at IS NULL
`

export const getUserIdById = `
SELECT id, full_name, email, role FROM users WHERE id = $1 AND deleted_at IS NULL
`

export const insertNewUserByUsernamePassword = `
INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id
`
