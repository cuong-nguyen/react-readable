import * as postReducer from '../reducers/posts'
import { FILTER_TYPE } from '../constants'

export const getSortedPosts = state =>
  postReducer.getSortedPosts(state.entities.posts, state.filter[FILTER_TYPE.POST])

export const getPostsByCategory = (state, categoryName) => {
  const posts = postReducer.getPostsByCategory(state.entities.posts, categoryName)
  return postReducer.getSortedPosts(posts, state.filter[FILTER_TYPE.POST])
}

export const getPost = (state, id) => postReducer.getPost(state.entities.posts, id)
