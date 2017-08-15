import { GET_CATEGORIES } from '../actions/category'

const categories = (state = [], action) => {
	switch (action.type) {
		case GET_CATEGORIES:
			return state

		default:
			return state
	}
}

export default categories