import React from 'react'
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

export default connect(
	(state, ownProps) => ({
		currentFilter: state.filter[ownProps.type]
	})
)(Filter)