import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

export const getCategories = () => {
  return dispatch => {
    const headers = createRequestHeaders()

    fetch(`${hostOrigin}/categories`, { headers })
      .then(response => response.json())
      .then(({ categories }) => {
        dispatch({ type: actionTypes.GET_CATEGORIES, categories })
      })
  }
}
