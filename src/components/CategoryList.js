import React from 'react'
import Tag from './Tag'
import PropTypes from 'prop-types'

const CategoryList = ({ categories }) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {categories.map((category, idx) => (
        <Tag key={idx} text={category.name} />
      ))}
    </div>
  )
}

CategoryList.propTypes = {
  categories: PropTypes.array,
}

export default CategoryList
