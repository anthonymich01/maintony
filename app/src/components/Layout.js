import React, { Component } from "react"
import Header from "next/head"
import Router from "next/router"
import Link from "next/link"
import { logout } from "../util/auth"
import { Icon, Menu } from "semantic-ui-react"
import style from "../styles/Layout.module.scss"

export default class Layout extends Component {
  render() {
    const { children, title, contentTitle } = this.props
    return (
      <>
        <Header>
          <title>{title} | Maintony</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Header>
        <div className={style.root}>
          <div className={style.sidebar}>
            <Link href="/" passHref>
              <p className={style.title}>Maintony</p>
            </Link>
            <Menu vertical fluid borderless secondary inverted style={{ margin: 0 }}>
              <Menu.Item name="home" onClick={() => Router.push("/")}>
                <Icon name="home" />
                Home
              </Menu.Item>
              <Menu.Item name="students" onClick={() => Router.push("/students")}>
                <Icon name="users" />
                Students
              </Menu.Item>
              <Menu.Item name="courses" onClick={() => Router.push("/courses")}>
                <Icon name="book" />
                Courses
              </Menu.Item>
              <Menu.Item name="sign out" onClick={logout}>
                <Icon name="sign out" />
                Logout
              </Menu.Item>
            </Menu>
          </div>
          <div className={style.sidebarMobile}>
            <p onClick={() => Router.push("/")}>
              <Icon name="home" size="large" fitted />
            </p>
            <p onClick={() => Router.push("/students")}>
              <Icon name="users" size="large" fitted />
            </p>
            <p onClick={() => Router.push("/courses")}>
              <Icon name="book" size="large" fitted />
            </p>
            <p onClick={logout}>
              <Icon name="sign out" size="large" fitted />
            </p>
          </div>
          <div className={style.content}>
            <p className={style.contentTitle}>{contentTitle}</p>
            {children}
          </div>
        </div>
      </>
    )
  }
}
