import { LOGGED_IN_SUCCESS } from '../actions'
import { isLoggedIn } from '../utils/auth'

const initialState = {
  isAuthenticated: isLoggedIn() !== null,
  username: null,
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      }

    default:
      return state
  }
}

export default user
