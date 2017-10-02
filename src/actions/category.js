import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

const getCategories = () => {
  return async dispatch => {
    const headers = createRequestHeaders()

    const response = await fetch(`${hostOrigin}/categories`, { headers })
    const { categories } = await response.json()

    dispatch({ type: actionTypes.RECEIVE_CATEGORIES, categories })
  }
}

const addCategory = newCategory => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })

    const init = {
      headers,
      method: 'POST',
      body: JSON.stringify({ name: newCategory }),
    }

    const response = await fetch(`${hostOrigin}/categories`, init)
    const addedCategory = await response.json()

    dispatch({ type: actionTypes.ADD_CATEGORY, category: addedCategory })
  }
}

export { getCategories, addCategory }
