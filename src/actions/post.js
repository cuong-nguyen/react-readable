import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

const getPosts = () => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts`, { headers })
			.then(response => response.json())
			.then(posts => {
				dispatch({ type: actionTypes.GET_POSTS, posts })
			})
	}
}

const votePost = (postId, option) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ "Content-Type": "application/json" })

		const init = {
			method: 'POST',
			headers,
			body: JSON.stringify({ option })
		}

		fetch(`${hostOrigin}/posts/${postId}`, init)
			.then(response => response.json())
			.then(post => {
				dispatch({ type: actionTypes.VOTE_POST, post })
			})
	}
}

export {
	getPosts,
	votePost
}