import categories from '../../reducers/categories'
import { GET_CATEGORIES } from '../../actions/actionTypes'

test('should return default state', () => {
  const newState = []
  const result = categories(undefined, { type: '' })
  expect(result).toEqual(newState)
})

test('should return new state with action', () => {
  const newState = ['react', 'redux']
  const result = categories([], { type: GET_CATEGORIES, categories: newState })
  expect(result).toEqual(newState)
})
