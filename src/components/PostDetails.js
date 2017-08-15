import React, { Component } from 'react'
import { connect } from 'react-redux'

class PostDetails extends Component {
	render() {
		const { post } = this.props

		return (
			<div>
				<h2>Post Details</h2>
				{post && (
					<ul>
						<li>{post.title}</li>
						<li>{post.body}</li>
						<li>{post.author}</li>
						<li>{post.voteScore}</li>
					</ul>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const post = ownProps.location.state.post
	return {
		post
	}
}

export default connect(mapStateToProps)(PostDetails)