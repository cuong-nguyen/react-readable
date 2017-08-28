import { combineReducers } from 'redux'
import categories from './categories'
import comments from './comments'
import posts from './posts'
import postFilter from './postFilter'

export default combineReducers({
	categories,
	posts,
	comments,
	postFilter,
})