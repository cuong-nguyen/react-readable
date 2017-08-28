import * as postReducer from '../reducers/posts'

export const getSortedPosts = (state) => postReducer.getSortedPosts(state.posts, state.postFilter)

export const getPostsByCategory = (state, categoryName) => {
	const posts = postReducer.getPostsByCategory(state.posts, categoryName)
	return postReducer.getSortedPosts(posts, state.postFilter)
}

export const getPost = (state, id) => postReducer.getPost(state.posts, id)