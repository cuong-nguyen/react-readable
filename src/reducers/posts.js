import * as actionTypes from '../actions/actionTypes'
import { updateObject, updateItemInArray } from '../utils/reducer'
import { SORT_ASC, SORT_BY_DATE, SORT_BY_VOTES } from '../constants'

const posts = (state = [], action) => {
	let post

	switch (action.type) {
		case actionTypes.GET_POSTS:
			return action.posts.filter(p => !p.deleted)

		case actionTypes.GET_POST:
			return [
				...state.filter(p => p.id !== action.post.id),
				action.post
			]

		case actionTypes.VOTE_POST:
			return updateItemInArray(state, action.post.id, (item) => {
				return updateObject(item, { voteScore: action.post.voteScore })
			})

		case actionTypes.DELETE_POST:
			return state.filter(p => p.id !== action.deletedPostId)

		case actionTypes.ADD_POST:
			return [...state, action.post]

		case actionTypes.EDIT_POST:
			return updateItemInArray(state, action.post.id, (item) => {
				return updateObject(item, { ...action.post })
			})

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

export const getPost = (state, id) => state.find(p => p.id === id)