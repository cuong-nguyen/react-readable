import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'
import { FILTER_TYPE } from '../constants'

const fetchPostComments = postId => {
  return async dispatch => {
    const headers = createRequestHeaders()

    const response = await fetch(`${hostOrigin}/posts/${postId}/comments`, {
      headers,
    })
    const comments = await response.json()
    dispatch({ type: actionTypes.GET_COMMENTS, postId, comments })
  }
}

const addComment = comment => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify(comment),
    }

    const response = await fetch(`${hostOrigin}/comments`, init)
    const addedComment = await response.json()
    dispatch({ type: actionTypes.ADD_COMMENT, comment: addedComment })
  }
}

const voteComment = (commentId, option) => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify({ option }),
    }

    const response = await fetch(`${hostOrigin}/comments/${commentId}`, init)
    const comment = await response.json()
    dispatch({ type: actionTypes.VOTE_COMMENT, comment })
  }
}

const deleteComment = commentId => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
    const init = {
      method: 'DELETE',
      headers,
    }

    const response = await fetch(`${hostOrigin}/comments/${commentId}`, init)
    const deletedComment = await response.json()
    dispatch({ type: actionTypes.DELETE_COMMENT, deletedComment })
  }
}

const editComment = updatingComment => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })
    const init = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...updatingComment }),
    }

    const response = await fetch(
      `${hostOrigin}/comments/${updatingComment.id}`,
      init
    )
    const comment = await response.json()
    dispatch({ type: actionTypes.EDIT_COMMENT, comment })
  }
}

const sortComment = sortBy => {
  return {
    type: actionTypes.SORT_COMMENT,
    sortBy,
    filterType: FILTER_TYPE.COMMENT,
  }
}

export {
  fetchPostComments,
  addComment,
  voteComment,
  deleteComment,
  editComment,
  sortComment,
}
