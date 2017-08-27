import { SORT_POST } from '../actions/actionTypes'
import * as constants from '../constants'

const initialFilter = {
	sortBy: constants.SORT_BY_VOTES,
	sortDir: constants.SORT_DESC
}

const postFilter = (state = initialFilter, action) => {
	switch (action.type) {
		case SORT_POST:
			return {
				sortBy: action.sortBy,
				sortDir: state.sortBy === action.sortBy
					? (state.sortDir === constants.SORT_ASC
						? constants.SORT_DESC
						: constants.SORT_ASC)
					: constants.SORT_ASC
			}

		default:
			return state
	}
}

export default postFilter