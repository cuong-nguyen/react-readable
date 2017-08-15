import { GET_POSTS } from '../actions/actionTypes'

const posts = (state = [], action) => {
	switch (action.type) {
		case GET_POSTS:
			return action.posts.filter(p => !p.deleted)

		default:
			return state
	}
}

export default posts