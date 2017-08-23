import React from 'react'

const Action = ({ icon, actionClass, onClick, children }) => {
	return (
		<a className={actionClass} onClick={onClick}>
			<span className="icon"><i className={`fa ${icon}`}></i></span>
			{children}
		</a>
	)
}

export default Action