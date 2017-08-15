import { GET_CATEGORIES } from '../actions/actionTypes'

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return action.categories

		default:
			return state
	}
}

export default categories