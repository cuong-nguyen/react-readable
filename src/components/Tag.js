import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Tag = ({ text }) => {
	return (
		<div className="control">
			<div className="tags has-addons">
				<span className="tag is-info is-rounded">
					<Link className="category" to={`/${text}`}>
						{text}
					</Link>
				</span>
				<a className="tag is-delete is-rounded"> </a>
			</div>
		</div>
	)
}

Tag.propTypes = {
	text: PropTypes.string,
}

export default Tag