import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'

const fetchPostComments = (postId) => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts/${postId}/comments`, { headers })
			.then(response => response.json())
			.then(comments => {
				dispatch({ type: actionTypes.GET_COMMENTS, postId, comments })
			})
	}
}

const addComment = (comment) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
		const init = {
			method: 'POST',
			headers,
			body: JSON.stringify(comment)
		}

		fetch(`${hostOrigin}/comments`, init)
			.then(response => response.json())
			.then(comment => {
				dispatch({ type: actionTypes.ADD_COMMENT, comment })
			})
			.catch(err => console.log(err))
	}
}

const voteComment = (commentId, option) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
		const init = {
			method: 'POST',
			headers,
			body: JSON.stringify({ option })
		}

		fetch(`${hostOrigin}/comments/${commentId}`, init)
			.then(response => response.json())
			.then(comment => {
				dispatch({ type: actionTypes.VOTE_COMMENT, comment })
			})
	}
}

const deleteComment = (commentId) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
		const init = {
			method: 'DELETE',
			headers
		}

		fetch(`${hostOrigin}/comments/${commentId}`, init)
			.then(response => response.json())
			.then(deletedComment => {
				dispatch({ type: actionTypes.DELETE_COMMENT, deletedComment })
			})
	}
}

export {
	fetchPostComments,
	addComment,
	voteComment,
	deleteComment,
}