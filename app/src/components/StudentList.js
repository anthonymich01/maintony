import React, { Component } from "react"
import { addAssignmentById, deleteAssignmentById, getCoursesByStudentId } from "../api"
import handleError from "../util/handleError"
import { Button, Dropdown, Icon, Label, Placeholder, Segment } from "semantic-ui-react"
import style from "../styles/StudentList.module.scss"

export default class StudentList extends Component {
  state = { open: false, courses: [], loading: false }

  handleOpen = () => {
    const { open } = this.state
    this.setState({ loading: true })
    if (!open) {
      this.getCoursesDetail()
    }
    this.setState({ open: !open, loading: false })
  }

  handleAddAssignment = async (course_id) => {
    const { id } = this.props.student
    try {
      await addAssignmentById(id, course_id)
      await this.getCoursesDetail()
    } catch (error) {
      handleError(error)
    }
  }

  handleDeleteAssignment = async (id) => {
    try {
      await deleteAssignmentById(id)
      await this.getCoursesDetail()
    } catch (error) {
      handleError(error)
    }
  }

  getCoursesDetail = async () => {
    const { student } = this.props
    try {
      const res = await getCoursesByStudentId(student.id)
      this.setState({ courses: res.data.courses })
    } catch (error) {
      handleError(error)
    }
  }

  render() {
    const { student, num, handleDeleteStudent } = this.props
    const { open, courses, loading } = this.state
    const attendCourses = courses.filter((v) => v.assignment_id)
    const remainingCourses = courses.filter((v) => v.assignment_id === null)
    const firstName = student.full_name.split(" ")[0]

    return (
      <Segment className={style.studentSegment}>
        <p className={style.studentName} onClick={this.handleOpen}>
          <span>{num}.</span>
          {student.full_name}
        </p>
        {open &&
          (loading ? (
            <Placeholder style={{ marginBottom: "20px" }}>
              <Placeholder.Line length="medium" />
              <Placeholder.Line length="short" />
              <Placeholder.Line length="medium" />
            </Placeholder>
          ) : (
            <>
              {attendCourses.length > 0 ? (
                <Segment raised basic compact>
                  <p className={style.subTitle}>Courses:</p>
                  {attendCourses.map((v) => (
                    <p className={style.assignment} key={v.assignment_id}>
                      <Label
                        as="a"
                        size="large"
                        onClick={() => this.handleDeleteAssignment(v.assignment_id)}
                      >
                        {v.course_name}
                        <Icon name="delete" />
                      </Label>
                    </p>
                  ))}
                </Segment>
              ) : (
                <h4>{firstName} doesn't have course assigned.</h4>
              )}
              <div>
                <Dropdown text="Add Course" className="teal" floating button>
                  <Dropdown.Menu>
                    {remainingCourses.map((v) => (
                      <Dropdown.Item
                        key={v.course_id}
                        onClick={() => this.handleAddAssignment(v.course_id)}
                      >
                        {v.course_name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <Button
                  floated="right"
                  negative
                  icon
                  labelPosition="right"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Remove Student
                  <Icon name="trash" />
                </Button>
              </div>
            </>
          ))}
      </Segment>
    )
  }
}
