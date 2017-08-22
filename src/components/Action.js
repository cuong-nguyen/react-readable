import React from 'react'

const Action = ({ icon, actionClass, onClick }) => {
	return (
		<a className={actionClass} onClick={onClick}>
			<span className="icon"><i className={`fa ${icon}`}></i></span>
		</a>
	)
}

export default Action