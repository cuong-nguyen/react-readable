import { combineReducers } from 'redux'
import categories from './categories'
import comments, * as commentSelectors from './comments'
import posts, * as postSelectors from './posts'
import postFilter from './postFilter'

export default combineReducers({
	categories,
	posts,
	comments,
	postFilter,
})

export const getSortedPosts = (state) => postSelectors.getSortedPosts(state.posts, state.postFilter)

export const getPostsByCategory = (state, categoryName) => postSelectors.getPostsByCategory(state.posts, categoryName)

export const getPost = (state, id) => postSelectors.getPost(state.posts, id)

export const getPostComments = (state, postId) => commentSelectors.getPostComments(state.comments, postId)

export const getComment = (state, id, postId) => commentSelectors.getComment(state.comments, id, postId)