import { createRequestHeaders, hostOrigin } from '../utils/helpers'
import * as actionTypes from './actionTypes'
import { FILTER_TYPE } from '../constants'

const fetchPosts = () => {
  return async dispatch => {
    const headers = createRequestHeaders()

    const response = await fetch(`${hostOrigin}/posts`, { headers })
    const posts = await response.json()
    dispatch({ type: actionTypes.RECEIVE_POSTS, posts })
  }
}

const fetchPost = postId => {
  return async dispatch => {
    const headers = createRequestHeaders()

    const response = await fetch(`${hostOrigin}/posts/${postId}`, { headers })
    const post = await response.json()
    dispatch({ type: actionTypes.GET_POST, post })
  }
}

const votePost = (postId, option) => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })

    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify({ option }),
    }

    const response = await fetch(`${hostOrigin}/posts/${postId}`, init)
    const post = await response.json()
    dispatch({ type: actionTypes.VOTE_POST, post })
  }
}

const deletePost = postId => {
  return async dispatch => {
    const headers = createRequestHeaders()
    const init = {
      method: 'DELETE',
      headers,
    }

    await fetch(`${hostOrigin}/posts/${postId}`, init)
    dispatch({ type: actionTypes.DELETE_POST, deletedPostId: postId })
  }
}

const sortPost = sortBy => {
  return { type: actionTypes.SORT_POST, sortBy, filterType: FILTER_TYPE.POST }
}

const addPost = post => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })

    const init = {
      method: 'POST',
      headers,
      body: JSON.stringify({ ...post }),
    }

    const response = await fetch(`${hostOrigin}/posts`, init)
    const addedPost = await response.json()
    dispatch({ type: actionTypes.ADD_POST, post: addedPost })
  }
}

const editPost = post => {
  return async dispatch => {
    const headers = createRequestHeaders({ 'Content-Type': 'application/json' })

    const init = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ ...post }),
    }

    const response = await fetch(`${hostOrigin}/posts/${post.id}`, init)
    const editedPost = await response.json()
    dispatch({ type: actionTypes.EDIT_POST, post: editedPost })
  }
}

export { fetchPosts, fetchPost, votePost, deletePost, sortPost, addPost, editPost }
