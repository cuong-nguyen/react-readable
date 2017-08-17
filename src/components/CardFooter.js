import React from 'react'

const CardFooter = ({ icon }) => {
	return (
		<a className="card-footer-item">
			<span className="icon"><i className={`fa ${icon}`}></i></span>
		</a>
	)
}

export default CardFooter