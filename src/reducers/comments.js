import * as actionTypes from '../actions/actionTypes'
import { updateObject, updateItemInArray } from '../utils/reducer'
import { SORT_ASC, SORT_BY_DATE, SORT_BY_VOTES } from '../constants'

const comments = (state = {}, action) => {
  let postId

  switch (action.type) {
    case actionTypes.GET_COMMENTS:
      return updateObject(state, { [action.postId]: action.comments })

    case actionTypes.ADD_COMMENT:
      postId = action.comment.parentId

      return {
        ...state,
        [postId]: [...state[postId], action.comment],
      }

    case actionTypes.VOTE_COMMENT:
      postId = action.comment.parentId

      return {
        ...state,
        [postId]: updateItemInArray(state[postId], action.comment.id, item => {
          return updateObject(item, { voteScore: action.comment.voteScore })
        }),
      }

    case actionTypes.DELETE_COMMENT:
      const { id: commentId, parentId: pId } = action.deletedComment

      return {
        ...state,
        [pId]: state[pId].filter(c => c.id !== commentId),
      }

    case actionTypes.EDIT_COMMENT:
      postId = action.comment.parentId

      return {
        ...state,
        [postId]: updateItemInArray(state[postId], action.comment.id, item => {
          return updateObject(item, { ...action.comment })
        }),
      }

    default:
      return state
  }
}

export default comments

export const getPostComments = (state, postId) => state[postId]

export const sortPostComments = (state, postId, { sortBy, sortDir }) => {
  const comments = state[postId]
  if (!comments) return undefined

  switch (sortBy) {
    case SORT_BY_VOTES:
      return comments.sort(
        (a, b) =>
          sortDir === SORT_ASC
            ? a.voteScore - b.voteScore
            : b.voteScore - a.voteScore
      )

    case SORT_BY_DATE:
      return comments.sort(
        (a, b) =>
          sortDir === SORT_ASC
            ? a.timestamp - b.timestamp
            : b.timestamp - a.timestamp
      )

    default:
      return comments
  }
}

export const getComment = (state, id, postId) =>
  state[postId].find(comment => comment.id === id)
