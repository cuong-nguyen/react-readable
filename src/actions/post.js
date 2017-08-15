import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

export const getPosts = () => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts`, { headers })
			.then(response => response.json())
			.then(posts => {
				dispatch({ type: actionTypes.GET_POSTS, posts })
			})
	}
}