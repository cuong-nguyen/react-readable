import React from 'react'

const PostAction = ({ icon, onClick }) => {
	return (
		<a className="card-footer-item" onClick={onClick}>
			<span className="icon"><i className={`fa ${icon}`}></i></span>
		</a>
	)
}

export default PostAction