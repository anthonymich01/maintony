import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import styles from "../src/styles/Home.module.scss"

export default class index extends Component {
  render() {
    return (
      <Menu stackable>
        <Menu.Item>
          <img src="/logo.png" />
        </Menu.Item>
        <Menu.Item>Features</Menu.Item>
        <Menu.Item>Testimonials</Menu.Item>
        <Menu.Item>Sign-in</Menu.Item>
      </Menu>
    )
  }
}
