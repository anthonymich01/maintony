import React, { Component } from "react"
import Header from "next/head"
import { loginAttempt, registerAttempt } from "../src/api"
import { Button, Form, Grid, Icon } from "semantic-ui-react"
import style from "../src/styles/Login.module.scss"
import { login } from "../src/util/auth"

export default class Login extends Component {
  state = {
    username: "",
    usernameR: "",
    password: "",
    passwordR: ""
  }

  loginSubmit = async () => {
    const { username, password } = this.state
    try {
      const res = await loginAttempt(username, password)
      if (res.data.access_token) {
        login(res.data.access_token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  registerSubmit = async () => {
    const { usernameR, passwordR } = this.state
    try {
      const res = await registerAttempt(usernameR, passwordR)
      if (res.data.access_token) {
        login(res.data.access_token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const { username, usernameR, password, passwordR } = this.state

    return (
      <>
        <Header>
          <title>Login | Maintony</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Header>
        <div className={style.root}>
          <Grid stackable divided className={style.gridBox}>
            <Grid.Column width={8}>
              <div className={style.box}>
                <h2>Login</h2>
                <Form onSubmit={this.loginSubmit}>
                  <Form.Field>
                    <label>Username</label>
                    <input
                      placeholder="Username"
                      value={username}
                      onChange={(e) => this.setState({ username: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="******"
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                    />
                  </Form.Field>
                  <Button type="submit" icon fluid primary>
                    <Icon name="key" /> Login
                  </Button>
                </Form>
              </div>
            </Grid.Column>
            <Grid.Column width={8}>
              <div className={style.box}>
                <h2>Register</h2>
                <Form onSubmit={this.registerSubmit}>
                  <Form.Field>
                    <label>Username</label>
                    <input
                      placeholder="Username"
                      value={usernameR}
                      onChange={(e) => this.setState({ usernameR: e.target.value })}
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="******"
                      value={passwordR}
                      onChange={(e) => this.setState({ passwordR: e.target.value })}
                    />
                  </Form.Field>
                  <Button type="submit" icon fluid primary>
                    <Icon name="arrow up" /> Register
                  </Button>
                </Form>
              </div>
            </Grid.Column>
          </Grid>
        </div>
      </>
    )
  }
}
