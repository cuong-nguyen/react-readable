import * as actionTypes from '../actions/actionTypes'

const posts = (state = [], action) => {
	switch (action.type) {
		case actionTypes.GET_POSTS:
			return action.posts.filter(p => !p.deleted)

		case actionTypes.GET_COMMENTS:
			return state.map(post => {
				if (post.id === action.postId) {
					return Object.assign({}, post, { comments: action.comments })
				}

				return post
			})

		case actionTypes.VOTE_POST:
			return state.map(post => {
				if (post.id === action.post.id) {
					post.voteScore = action.post.voteScore
				}

				return post
			})

		case actionTypes.DELETE_POST:
			return state.filter(p => p.id !== action.deletedPostId)

		default:
			return state
	}
}

export default posts