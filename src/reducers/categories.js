import { RECEIVE_CATEGORIES, ADD_CATEGORY } from '../actions/actionTypes'

const initialState = {
  byIds: {},
  allIds: [],
}

const categories = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return {
        byIds: action.categories.reduce((ids, category) => {
          ids[category.name] = category
          return ids
        }, {}),
        allIds: action.categories.map(category => category.name),
      }

    case ADD_CATEGORY:
      return {
        ...state,
        byIds: {
          ...state.byIds,
          [action.category.name]: action.category,
        },
        allIds: [...state.allIds, action.category.name],
      }

    default:
      return state
  }
}

export default categories

export const getIds = state => state.allIds
export const getCategoryById = (state, id) => state.byIds[id]
