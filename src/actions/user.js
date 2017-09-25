import { LOGGED_IN_SUCCESS } from '.'
import { createRequestHeaders, hostOrigin } from '../utils/helpers'

const setAuthenticationInfo = () => {
  return {
    type: LOGGED_IN_SUCCESS,
  }
}

const logIn = (username, password) => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })

    const init = {
      headers,
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }

    const response = await fetch(`${hostOrigin}/auth`, init)
    return response.json()
  }
}

export { logIn, setAuthenticationInfo }
