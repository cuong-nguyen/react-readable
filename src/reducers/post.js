import { GET_POSTS, GET_COMMENTS } from '../actions/actionTypes'

const posts = (state = [], action) => {
	switch (action.type) {
		case GET_POSTS:
			return action.posts.filter(p => !p.deleted)

		case GET_COMMENTS:
			return state.map(post => {
				if (post.id === action.postId) {
					return Object.assign({}, post, { comments: action.comments })
				}

				return post
			})

		default:
			return state
	}
}

export default posts