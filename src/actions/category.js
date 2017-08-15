import { createRequestHeaders } from '../utils/helpers'

const GET_CATEGORIES = 'GET_CATEGORIES'

const baseEndpoint = 'http://localhost:5001/categories'

const getCategories = () => {
	return (dispatch) => {
		const headers = createRequestHeaders()

		fetch(baseEndpoint, { headers })
			.then(response => response.json())
			.then(({ categories }) => {
				dispatch({ type: GET_CATEGORIES, categories })
			})
	}
}

export {
	GET_CATEGORIES,
	getCategories
}