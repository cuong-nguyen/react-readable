const LOGGEDIN_TOKEN_ID = 'UdaciReadable:LogIn'

const isLoggedIn = () => {
  return localStorage.getItem(LOGGEDIN_TOKEN_ID)
}

const setAuthToken = token => {
  localStorage.setItem(LOGGEDIN_TOKEN_ID, token)
}

const clearToken = () => localStorage.removeItem(LOGGEDIN_TOKEN_ID)

const logOut = () => {
  clearToken()
  return Promise.resolve()
}

export { isLoggedIn, setAuthToken, logOut }
