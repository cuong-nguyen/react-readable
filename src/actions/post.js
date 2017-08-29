import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'
import { FILTER_TYPE } from '../constants'

const fetchPosts = () => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts`, { headers })
			.then(response => response.json())
			.then(posts => {
				dispatch({ type: actionTypes.GET_POSTS, posts })
			})
	}
}

const fetchPost = (postId) => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(`${hostOrigin}/posts/${postId}`, { headers })
			.then(response => response.json())
			.then(post => {
				dispatch({ type: actionTypes.GET_POST, post })
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

const deletePost = (postId) => {
	return (dispatch) => {
		const headers = createRequestHeaders()
		const init = {
			method: 'DELETE',
			headers
		}

		fetch(`${hostOrigin}/posts/${postId}`, init)
			.then(response => response)
			.then(() => {
				dispatch({ type: actionTypes.DELETE_POST, deletedPostId: postId })
			})
			.catch(err => console.log(err))
	}
}

const sortPost = (sortBy) => {
	return { type: actionTypes.SORT_POST, sortBy, filterType: FILTER_TYPE.POST }
}

const addPost = (post) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ "Content-Type": "application/json" })

		const init = {
			method: 'POST',
			headers,
			body: JSON.stringify({ ...post })
		}

		fetch(`${hostOrigin}/posts`, init)
			.then(response => response.json())
			.then(post => {
				dispatch({ type: actionTypes.ADD_POST, post })
			})
	}
}

const editPost = (post) => {
	return (dispatch) => {
		const headers = createRequestHeaders({ "Content-Type": "application/json" })

		const init = {
			method: 'PUT',
			headers,
			body: JSON.stringify({ ...post })
		}

		fetch(`${hostOrigin}/posts/${post.id}`, init)
			.then(response => response.json())
			.then(post => {
				dispatch({ type: actionTypes.EDIT_POST, post })
			})
	}
}

export {
	fetchPosts,
	fetchPost,
	votePost,
	deletePost,
	sortPost,
	addPost,
	editPost,
}