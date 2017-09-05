import { createStore } from 'redux'
import rootReducer from '../reducers'
import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { getCategories, fetchPosts } from '../actions'

const getStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk))
  store.dispatch(getCategories())
  store.dispatch(fetchPosts())

  return store
}

export { getStore }
