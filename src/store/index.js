import rootReducer from '../reducers'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { getCategories, fetchPosts } from '../actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const getStore = () => {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  )
  store.dispatch(getCategories())
  store.dispatch(fetchPosts())

  return store
}

export { getStore }