import * as fromById from '../reducers/categories'

export const getCategories = state => {
  const ids = fromById.getIds(state.entities.categories)
  return ids.map(id => fromById.getCategoryById(state.entities.categories, id))
}
