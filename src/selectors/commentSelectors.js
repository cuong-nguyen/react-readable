import * as commentReducer from '../reducers/comments'

export const getPostComments = (state, postId) => commentReducer.getPostComments(state.comments, postId)

export const getComment = (state, id, postId) => commentReducer.getComment(state.comments, id, postId)