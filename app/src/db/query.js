// USER Query
export const getUserByUsername = `
SELECT id, password FROM users WHERE username = $1 AND deleted_at IS NULL
`

export const getUserById = `
SELECT id FROM users WHERE id = $1 AND deleted_at IS NULL
`

export const insertNewUserByUsernamePassword = `
INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id
`

// STUDENT Query
export const getStudents = `
SELECT id, full_name, created_at FROM students
WHERE deleted_at IS NULL
ORDER BY full_name
LIMIT $1 OFFSET $2
`

export const addStudentByFullName = `
INSERT INTO students (full_name) VALUES ($1)
`

export const deleteStudentById = `
UPDATE students SET deleted_at = now() WHERE id = $1
`

// COURSE Query
export const getCourses = `
SELECT id, name, created_at FROM courses
WHERE deleted_at IS NULL
ORDER BY name
`

export const getCoursesByStudentId = `
SELECT c.id as course_id, c.name as course_name, d.aid as assignment_id, d.attend_at
FROM courses c
LEFT JOIN (
    SELECT a.course_id as cid, a.id as aid, a.created_at as attend_at
    FROM assignments a
    LEFT JOIN students s on a.student_id = s.id
    WHERE a.student_id = $1 AND a.deleted_at IS NULL
    ) d
ON c.id = d.cid
WHERE c.deleted_at IS NULL
ORDER BY c.name
`

export const addCourseByName = `
INSERT INTO courses (name) VALUES ($1)
`

export const deleteCourseById = `
UPDATE courses SET deleted_at = now() WHERE id = $1
`

// ASSIGNMENT Query
export const getStudentAssignment = `
SELECT id FROM assignments
WHERE student_id = $1 AND course_id = $2 AND deleted_at IS NULL
LIMIT 1
`

export const addStudentAssignment = `
INSERT INTO assignments (student_id, course_id) VALUES ($1, $2)
`

export const deleteAssignmentById = `
UPDATE assignments SET deleted_at = now() WHERE id = $1
`
