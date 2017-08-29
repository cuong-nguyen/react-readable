import { createStore } from 'redux'
import rootReducer from '../reducers'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const getStore = () => createStore(rootReducer, applyMiddleware(thunk))

export { getStore }
