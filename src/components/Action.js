import React from 'react'
import PropTypes from 'prop-types'

const Action = ({ icon, actionClass, onClick, children }) => {
	return (
		<a className={actionClass} onClick={onClick}>
			<span className="icon"><i className={`fa ${icon}`}></i></span>
			{children}
		</a>
	)
}

Action.propTypes = {
	icon: PropTypes.string,
	actionClass: PropTypes.string,
	onClick: PropTypes.func,
	children: PropTypes.any,
}

export default Action