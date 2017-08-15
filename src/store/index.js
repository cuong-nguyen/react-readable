import { createStore } from 'redux'
import rootReducer from '../reducers'

const getStore = () => {
	return createStore(rootReducer)
}

export {
	getStore
}