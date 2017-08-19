import { combineReducers } from 'redux'
import categories from './category'
import posts, * as postSelectors from './post'
import filter from './filter'

export default combineReducers({
	categories,
	posts,
	filter,
})

export const getSortedPosts = (state, filter) => postSelectors.getSortedPosts(state.posts, filter)

export const getPostsByCategory = (state, categoryName) => postSelectors.getPostsByCategory(state.posts, categoryName)