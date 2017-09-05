import { GET_CATEGORIES, ADD_CATEGORY } from '../actions/actionTypes'

const categories = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories

    case ADD_CATEGORY:
      return [...state, action.category]

    default:
      return state
  }
}

export default categories
