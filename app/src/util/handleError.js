import { logout } from "./auth"

const handleError = (error) => {
  if (error.response.status === 401) {
    console.log(error)
    logout()
  }
}
export default handleError
