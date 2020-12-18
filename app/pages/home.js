import React, { Component } from "react"
import { Grid } from "semantic-ui-react"
import GoToSegment from "../src/components/GoToSegment"
import Layout from "../src/components/Layout"
import style from "../src/styles/Home.module.scss"

export default class index extends Component {
  render() {
    return (
      <Layout title="Home" contentTitle="Home">
        <Grid stackable columns={2}>
          <Grid.Column>
            <GoToSegment
              title="Students List"
              iconTitle="users"
              desc="In this section, you can manage your students, add / remove courses from the student, add new student, &amp;
                remove student from your list."
              color="teal"
              actionText="Go to Students List"
              link="/students"
            />
          </Grid.Column>
          <Grid.Column>
            <GoToSegment
              title="Courses List"
              iconTitle="book"
              desc="In this section, you can manage your courses, add / remove courses from the student, add new course, &amp; remove
                course from your list."
              color="blue"
              actionText="Go to Courses List"
              link="/courses"
            />
          </Grid.Column>
        </Grid>
      </Layout>
    )
  }
}
