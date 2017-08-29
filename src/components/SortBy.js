import React from 'react'
import PropTypes from 'prop-types'
import { SORT_ASC } from '../constants'

const SortBy = ({ text, onClick, currentFilter, field }) => {
  const sortIcon =
    currentFilter.sortBy === field
      ? currentFilter.sortDir === SORT_ASC
        ? 'fa-long-arrow-up'
        : 'fa-long-arrow-down'
      : 'fa-sort'

  return (
    <p className="control">
      <a className="button is-small" onClick={onClick}>
        <span className="icon is-small">
          <i className={`fa ${sortIcon}`} />
        </span>
        <span>{text}</span>
      </a>
    </p>
  )
}

SortBy.propTypes = {
  text: PropTypes.string,
  currentFilter: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  field: PropTypes.string.isRequired
}

export default SortBy
