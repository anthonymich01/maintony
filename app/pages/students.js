import React, { Component } from "react"
import { getStudents } from "../src/api"
import Layout from "../src/components/Layout"
import StudentList from "../src/components/StudentList"

export default class Students extends Component {
  state = { students: [] }

  componentDidMount = async () => {
    const res = await getStudents()
    this.setState({ students: res.data.students })
  }

  render() {
    const { students } = this.state
    return (
      <Layout title="Manage Students" contentTitle="Students List">
        {students.map((v, i) => (
          <StudentList key={v.id} student={v} num={i + 1} />
        ))}
      </Layout>
    )
  }
}
