import * as commentReducer from '../reducers/comments'
import { FILTER_TYPE } from '../constants'

export const getPostComments = (state, postId) =>
  commentReducer.getPostComments(state.entities.comments, postId)

export const sortPostComments = (state, postId) =>
  commentReducer.sortPostComments(
    state.entities.comments,
    postId,
    state.filter[FILTER_TYPE.COMMENT]
  )

export const getComment = (state, id, postId) =>
  commentReducer.getComment(state.entities.comments, id, postId)
