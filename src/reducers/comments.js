import * as actionTypes from '../actions/actionTypes'

const comments = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.GET_COMMENTS:
			return Object.assign({}, state, { [action.postId]: action.comments })

		case actionTypes.ADD_COMMENT:
			const postId = action.comment.parentId

			return {
				...state,
				[postId]: [
					...state[postId],
					action.comment,
				]
			}

		case actionTypes.VOTE_COMMENT:
			const id = action.comment.parentId

			return {
				...state,
				[id]: state[id].map(comment => {
					if (comment.id === action.comment.id) {
						comment.voteScore = action.comment.voteScore
					}
					return comment
				})
			}

		case actionTypes.DELETE_COMMENT:
			const { id: commentId, parentId: pId } = action.deletedComment

			return {
				...state,
				[pId]: state[pId].filter(c => c.id !== commentId)
			}

		default:
			return state
	}
}

export default comments

export const getPostComments = (state, postId) => state[postId]

export const getComment = (state, id, postId) => state[postId].find(comment => comment.id === id)