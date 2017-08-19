import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

export const fetchPostComments = (postId) => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts/${postId}/comments`, { headers })
			.then(response => response.json())
			.then(comments => {
				dispatch({ type: actionTypes.GET_COMMENTS, postId, comments })
			})
	}
}