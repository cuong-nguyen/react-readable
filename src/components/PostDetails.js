import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDateString } from '../utils/helpers'
import { fetchPosts, fetchPostComments } from '../actions'
import { Comment } from '../components'
import { getPost, getPostComments } from '../reducers'

class PostDetails extends Component {

	componentDidMount() {
		const { post, match, fetchPosts, fetchPostComments } = this.props
		if (!post) {
			fetchPosts()
		}

		fetchPostComments(match.params.postId)
	}

	render() {
		const { post, comments } = this.props

		return (
			<div>
				{post && (
					<div className="box">
						<article className="media">
							<div className="media-content">
								<div className="content">
									<p>
										<strong>{post.title}</strong>
										<small><i> by {post.author}</i> @ {toDateString(post.timestamp)}</small>
										<br />
										{post.body}
									</p>
								</div>
								<nav className="level is-mobile">
									<div className="level-left">
										<a className="level-item">
											<span className="icon"><i className="fa fa-thumbs-up"></i></span>
										</a>
										<a className="level-item">
											<span className="icon"><i className="fa fa-thumbs-down"></i></span>
										</a>
										<a className="level-item">
											<span className="icon"><i className="fa fa-heart"></i></span>
											{post.voteScore}
										</a>
									</div>
								</nav>
							</div>
						</article>
					</div>
				)}

				{comments && (
					<div>
						<h3><strong>Comments ({comments.length})</strong></h3>
						<br />
						{comments.map(comment => <Comment {...comment} />)}
					</div>
				)}

				<article className="media new-comment">
					<figure className="media-left">
						<p className="image is-48x48">
							<img src="http://bulma.io/images/placeholders/48x48.png" alt="" />
						</p>
					</figure>
					<div className="media-content">
						<div className="field">
							<span className="tag is-info">New comment</span>
						</div>
						<div className="field">
							<p className="control">
								<input className="input" placeholder="Your name..."></input>
							</p>
						</div>
						<div className="field">
							<p className="control">
								<textarea className="textarea" placeholder="Add a comment..."></textarea>
							</p>
						</div>
						<div className="field">
							<p className="control">
								<button className="button is-primary">Submit</button>
							</p>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default connect(
	(state, { match }) => ({
		post: getPost(state, match.params.postId),
		comments: getPostComments(state, match.params.postId),
	}),
	{
		fetchPosts,
		fetchPostComments,
	}
)(PostDetails)