import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../actions/post'
import { getComments } from '../actions/comment'

class PostDetails extends Component {

	componentDidMount() {
		const { post, match, getPosts, getComments } = this.props
		if (!post) {
			getPosts()
		}

		getComments(match.params.postId)
	}

	render() {
		const { post } = this.props

		return (
			<div>
				<h2>Post Details</h2>
				{post && (
					<div>
						<ul>
							<li>{post.title}</li>
							<li>{post.body}</li>
							<li>{post.author}</li>
							<li>{post.voteScore}</li>
						</ul>

						<h2>Comments</h2>
						<ul>
							{post.comments &&
								post.comments.map(comment => <li key={comment.id}>{comment.body}</li>)
							}
						</ul>
					</div>
				)}
			</div>
		)
	}
}

const mapStateToProps = ({ posts }, ownProps) => {
	const { postId } = ownProps.match.params

	return {
		post: posts.find(p => p.id === postId)
	}
}

export default connect(
	mapStateToProps,
	(dispatch) => ({
		getPosts: () => dispatch(getPosts()),
		getComments: (postId) => dispatch(getComments(postId))
	})
)(PostDetails)