import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

export const getCategories = () => {
  return async dispatch => {
    const headers = createRequestHeaders()

    const response = await fetch(`${hostOrigin}/categories`, { headers })
    const { categories } = await response.json()

    dispatch({ type: actionTypes.GET_CATEGORIES, categories })
  }
}
