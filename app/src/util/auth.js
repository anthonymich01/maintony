import React, { useEffect } from "react"
import Router from "next/router"
import nextCookie from "next-cookies"
import cookie from "js-cookie"
import { getUser } from "../api"

export const login = async (token) => {
  if (token !== undefined) {
    const res = await getUser(token)
    if (res.status === 200) {
      if (res.data.id) {
        cookie.set("token", token, { expires: 30 })
        window.location = "/"
      } else {
        Router.push("/login")
      }
    }
  }
}

export const auth = async (ctx) => {
  const { token = "" } = nextCookie(ctx)
  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" })
      ctx.res.end()
    } else {
      Router.push("/login")
    }
  }

  return token
}

export const logout = () => {
  cookie.remove("token")
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now())
  Router.push("/")
}

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        console.log("logged out from storage!")
        Router.push("/login")
      }
    }

    useEffect(() => {
      window.addEventListener("storage", syncLogout)

      return () => {
        window.removeEventListener("storage", syncLogout)
        window.localStorage.removeItem("logout")
      }
    }, [])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async (ctx) => {
    auth(ctx)
    const componentProps =
      WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx))

    return { ...componentProps }
  }

  return Wrapper
}
