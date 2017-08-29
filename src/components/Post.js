import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { toDateString } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { Action } from '../components'
import { votePost, deletePost, fetchPostComments } from '../actions'
import { getPost } from '../selectors/postSelectors'
import { getPostComments } from '../selectors/commentSelectors'
import { connect } from 'react-redux'

class Post extends Component {
	static propTypes = {
		comments: PropTypes.array,
		post: PropTypes.object,
		postId: PropTypes.string,
		votePost: PropTypes.func.isRequired,
		deletePost: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
		fetchPostComments: PropTypes.func.isRequired,
	}

	componentDidMount() {
		const { comments, post, fetchPostComments } = this.props
		comments === undefined && fetchPostComments(post.id)
	}

	render() {
		const { post, votePost, deletePost, postId, comments, onEdit } = this.props
		const { title, author, timestamp, voteScore, category } = post

		return (
			<div className="card">
				<Link
					className="post"
					to={`${category}/${postId}`}
				>
					<div className="card-content">
						<div className="media">
							<div className="media-left">
								<figure className="image is-48x48">
									<img src="http://bulma.io/images/placeholders/48x48.png" alt="profile" />
								</figure>
							</div>
							<div className="media-content">
								<p className="title is-4">{author}</p>
								<p className="subtitle is-7">
									<span className="icon is-small"><i className="fa fa-tag"></i></span>
									<i>{' ' + category}</i>
								</p>
							</div>
						</div>

						<div className="content">
							{title}
						</div>

						<nav className="level is-mobile">
							<div className="level-left">
								<span className="icon"><i className="fa fa-comments"></i></span>
								{comments ? comments.length : 0}
								&nbsp;
							<span className="icon"><i className="fa fa-heart"></i></span>
								{voteScore || 0}
							</div>
							<div className="level-right">
								<span className="tag is-info">{toDateString(timestamp)}</span>
							</div>
						</nav>
					</div>
				</Link>

				<footer className="card-footer">
					<Action
						icon="fa-thumbs-up"
						actionClass="card-footer-item"
						onClick={() => votePost(postId, "upVote")}
					/>
					<Action
						icon="fa-thumbs-down"
						actionClass="card-footer-item"
						onClick={() => votePost(postId, "downVote")}
					/>
					<Action
						actionClass="card-footer-item"
						icon="fa-pencil"
						onClick={() => onEdit(post)}
					/>
					<Action
						icon="fa-trash"
						actionClass="card-footer-item"
						onClick={() => deletePost(postId)}
					/>
				</footer>
			</div >
		)
	}
}

export default connect(
	(state, ownProps) => ({
		post: getPost(state, ownProps.postId),
		comments: getPostComments(state, ownProps.postId),
	}),
	{
		votePost,
		deletePost,
		fetchPostComments,
	}
)(Post)