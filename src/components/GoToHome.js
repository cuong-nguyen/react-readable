import React from 'react'
import { Link } from 'react-router-dom'

const GoToHome = () => {
	return (
		<div className="home">
			<Link to="/" className="button is-large">
				<span className="icon is-large">
					<i className="fa fa-home"></i>
				</span>
			</Link>
		</div>
	)
}

export default GoToHome