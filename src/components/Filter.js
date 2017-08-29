import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Filter = ({ currentFilter, children }) => {
	return (
		<div className="field has-addons">
			{React.Children.map(children, (child) =>
				React.cloneElement(child, { ...child.props, currentFilter }))
			}
		</div>
	)
}

Filter.propTypes = {
	currentFilter: PropTypes.object.isRequired,
	children: PropTypes.array,
}

export default connect(
	(state, ownProps) => ({
		currentFilter: state.filter[ownProps.type]
	})
)(Filter)