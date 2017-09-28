import categories from '../../reducers/categories'
import { GET_CATEGORIES, ADD_CATEGORY } from '../../actions/actionTypes'

test('should return default state', () => {
  const oldState = []
  const result = categories(undefined, { type: '' })
  expect(result).toEqual(oldState)
})

test('should return new state with action', () => {
  const newCategories = ['react', 'redux']
  const newState = categories([], { type: GET_CATEGORIES, categories: newCategories })
  expect(newState).toEqual(newCategories)
})

test('can add new category to store', () => {
  const currentState = ['react', 'redux']
  const newCategory = 'udacity'
  const expectedState = ['react', 'redux', 'udacity']

  const newState = categories(currentState, { type: ADD_CATEGORY, category: newCategory })
  expect(newState).toEqual(expectedState)
})
