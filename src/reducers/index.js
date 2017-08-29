import { combineReducers } from 'redux'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import filter from './filter'

export default combineReducers({
  categories,
  posts,
  comments,
  filter,
})
