import { combineReducers } from 'redux'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import filter from './filter'
import user from './user'

export default combineReducers({
  entities: combineReducers({
    categories,
    posts,
    comments,
  }),
  filter,
  user,
})
