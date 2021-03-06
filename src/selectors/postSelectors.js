import * as postReducer from '../reducers/posts'
import { FILTER_TYPE } from '../constants'

export const getSortedPosts = state =>
  postReducer.getSortedPosts(state.posts, state.filter[FILTER_TYPE.POST])

export const getPostsByCategory = (state, categoryName) => {
  const posts = postReducer.getPostsByCategory(state.posts, categoryName)
  return postReducer.getSortedPosts(posts, state.filter[FILTER_TYPE.POST])
}

export const getPost = (state, id) => postReducer.getPost(state.posts, id)
