import * as commentReducer from '../reducers/comments'
import { FILTER_TYPE } from '../constants'

export const getPostComments = (state, postId) =>
	commentReducer.getPostComments(state.comments, postId)

export const sortPostComments = (state, postId) =>
	commentReducer.sortPostComments(state.comments, postId, state.filter[FILTER_TYPE.COMMENT])

export const getComment = (state, id, postId) =>
	commentReducer.getComment(state.comments, id, postId)