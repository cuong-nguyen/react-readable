import { SORT_POST, SORT_COMMENT } from '../actions/actionTypes'
import { FILTER_TYPE, SORT_BY_VOTES, SORT_ASC, SORT_DESC } from '../constants'
import { updateObject } from '../utils/reducer'

const initialFilter = {
  [FILTER_TYPE.POST]: {
    sortBy: SORT_BY_VOTES,
    sortDir: SORT_DESC
  },
  [FILTER_TYPE.COMMENT]: {
    sortBy: SORT_BY_VOTES,
    sortDir: SORT_DESC
  }
}

const filter = (state = initialFilter, action) => {
  const { filterType, sortBy } = action

  switch (action.type) {
    case SORT_POST:
    case SORT_COMMENT:
      return updateObject(state, {
        [filterType]: {
          sortBy: sortBy,
          sortDir:
            state[filterType].sortBy === sortBy
              ? state[filterType].sortDir === SORT_ASC ? SORT_DESC : SORT_ASC
              : SORT_ASC
        }
      })

    default:
      return state
  }
}

export default filter
