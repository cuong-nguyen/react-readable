import * as actionTypes from '../actions/actionTypes'

const comments = (state = {}, action) => {
	switch (action.type) {
		case actionTypes.GET_COMMENTS:
			return Object.assign({}, state, { [action.postId]: action.comments })

		default:
			return state
	}
}

export default comments

export const getPostComments = (state, id) => state[id]