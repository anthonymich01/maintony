import React, { Component } from "react"
import { getCourses, addCourse, deleteCourseById } from "../src/api"
import { withAuthSync } from "../src/util/auth"
import Layout from "../src/components/Layout"
import CoursesList from "../src/components/CourseList"
import { Button, Input, Label, Placeholder } from "semantic-ui-react"

class Courses extends Component {
  state = { courses: null, s: "" }

  componentDidMount = async () => {
    try {
      const res = await getCourses()
      this.setState({ courses: res.data.courses })
    } catch (error) {
      console.log(error)
    }
  }

  handleAddCourse = async () => {
    const { s } = this.state
    const trimmedName = s.trim()
    try {
      await addCourse(trimmedName)
      const res = await getCourses()
      this.setState({ courses: res.data.courses })
    } catch (error) {
      console.log(error)
    }
    this.setState({ s: "" })
  }

  handleDeleteCourse = async (id) => {
    try {
      await deleteCourseById(id)
      const res = await getCourses()
      this.setState({ courses: res.data.courses })
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { courses, s } = this.state
    return (
      <Layout title="Manage Courses" contentTitle="Manage Courses">
        <Input
          label={<Label content="Add Course" />}
          placeholder="Math & Integral"
          value={s}
          onChange={(e) => this.setState({ s: e.target.value })}
          action={<Button icon="add" content="Add" color="blue" onClick={this.handleAddCourse} />}
        />
        {courses === null ? (
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
          courses.map((v, i) => <CoursesList key={v.id} course={v} num={i + 1} deleteCourse={this.handleDeleteCourse} />)
        )}
      </Layout>
    )
  }
}

export default withAuthSync(Courses)
