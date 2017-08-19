import * as actionTypes from '../actions/actionTypes'
import { SORT_ASC, SORT_BY_DATE, SORT_BY_VOTES } from '../constants'

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

export const getSortedPosts = (state, { sortBy, sortDir }) => {
	switch (sortBy) {
		case SORT_BY_VOTES:
			return state.sort((a, b) =>
				sortDir === SORT_ASC
					? a.voteScore - b.voteScore
					: b.voteScore - a.voteScore)

		case SORT_BY_DATE:
			return state.sort((a, b) =>
				sortDir === SORT_ASC
					? a.timestamp - b.timestamp
					: b.timestamp - a.timestamp)

		default:
			return state
	}
}

export const getPostsByCategory = (state, categoryName) => state.filter(p => p.category === categoryName)