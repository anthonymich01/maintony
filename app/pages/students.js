import React, { Component } from "react"
import { getStudents, addStudent, deleteStudentById } from "../src/api"
import Layout from "../src/components/Layout"
import { withAuthSync } from "../src/util/auth"
import StudentList from "../src/components/StudentList"
import { Button, Input, Label, Placeholder } from "semantic-ui-react"

const LIMIT = 10

class Students extends Component {
  state = { students: null, s: "", page: 1 }

  componentDidMount = async () => {
    const res = await getStudents(LIMIT, 0)
    this.setState({ students: res.data.students })
  }

  handleAddStudent = async () => {
    const { s } = this.state
    const trimmedName = s.trim()
    try {
      await addStudent(trimmedName)
    } catch (error) {
      console.log(error)
    }
    this.setState({ s: "" })
  }

  handleDeleteStudent = async (id) => {
    const { page } = this.state
    try {
      await deleteStudentById(id)
      const res = await getStudents(LIMIT, page)
      this.setState({ students: res.data.students })
    } catch (error) {
      console.log(error)
    }
  }

  handlePrevPage = async () => {
    const { page } = this.state
    if (page <= 1) {
      return
    }
    const res = await getStudents(LIMIT, LIMIT * (page - 2))
    this.setState({ students: res.data.students, page: page - 1 })
  }

  handleNextPage = async () => {
    const { students, page } = this.state
    if (students.length < LIMIT) {
      return
    }

    const res = await getStudents(LIMIT, LIMIT * page)
    if (res.data.students.length <= 0) {
      return
    }
    this.setState({ students: res.data.students, page: page + 1 })
  }

  render() {
    const { students, s, page } = this.state
    const studentNumber = LIMIT * (page - 1) + 1
    return (
      <Layout title="Manage Students" contentTitle="Manage Students">
        <Input
          label={<Label content="Add Student" />}
          placeholder="Tony Stark"
          value={s}
          onChange={(e) => this.setState({ s: e.target.value })}
          action={<Button icon="add" content="Add" color="teal" onClick={this.handleAddStudent} />}
        />
        {students === null ? (
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        ) : (
          students.map((v, i) => (
            <StudentList key={v.id} student={v} num={i + studentNumber} handleDeleteStudent={this.handleDeleteStudent} />
          ))
        )}
        <Button icon="angle left" color="teal" onClick={this.handlePrevPage} />
        <Button icon="angle right" color="teal" onClick={this.handleNextPage} />
      </Layout>
    )
  }
}

export default withAuthSync(Students)
