import React, { Component } from "react"
import { Button, Segment } from "semantic-ui-react"
import style from "../styles/CourseList.module.scss"

export default class CourseList extends Component {
  render() {
    const { course, num, deleteCourse } = this.props
    return (
      <Segment>
        <p className={style.courseName}>
          <span>{num}.</span>
          {course.name}
          <Button
            icon="trash"
            negative
            floated="right"
            size="mini"
            className={style.delButton}
            onClick={() => deleteCourse(course.id)}
          />
        </p>
      </Segment>
    )
  }
}
