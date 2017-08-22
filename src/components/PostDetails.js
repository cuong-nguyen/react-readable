import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDateString } from '../utils/helpers'
import { fetchPost, fetchPostComments, votePost, addComment } from '../actions'
import { Comment, Voting } from '../components'
import { getPost, getPostComments } from '../reducers'
import { v4 } from 'node-uuid'

class PostDetails extends Component {
	componentDidMount() {
		const { post, match, comments, fetchPost, fetchPostComments } = this.props
		post === undefined && fetchPost(match.params.postId)
		comments === undefined && fetchPostComments(match.params.postId)
	}

	addComment = () => {
		const author = this.authorInput.value
		const body = this.bodyInput.value

		if (author && body) {
			const { addComment, post } = this.props

			addComment({
				id: v4(),
				author,
				body,
				parentId: post.id,
				timestamp: new Date().getTime()
			})
		}
	}

	render() {
		const { post, comments, votePost } = this.props

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
									<Voting
										voteScore={post.voteScore}
										upVote={() => votePost(post.id, "upVote")}
										downVote={() => votePost(post.id, "downVote")}
									/>
								</nav>
							</div>
						</article>
					</div>
				)}

				{comments && (
					<div>
						<h3>
							<strong>{comments.length ? `Comments (${comments.length})` : 'No comments! Be the first to comment below'}</strong>
						</h3>
						<br />
						{comments.map(comment => <Comment key={comment.id} {...comment} />)}
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
								<input
									ref={input => { this.authorInput = input }}
									className="input"
									placeholder="Your name..."></input>
							</p>
						</div>
						<div className="field">
							<p className="control">
								<textarea
									ref={input => { this.bodyInput = input }}
									className="textarea"
									placeholder="Add a comment..."></textarea>
							</p>
						</div>
						<div className="field">
							<p className="control">
								<button
									className="button is-primary"
									onClick={this.addComment}
								>
									Submit
								</button>
							</p>
						</div>
					</div>
				</article>
			</div>
		)
	}
}

export default connect(
	(state, { match }) => {
		const post = getPost(state, match.params.postId)

		return {
			post,
			totalVotes: post ? post.voteScore : null,
			comments: getPostComments(state, match.params.postId),
		}
	},
	{
		fetchPost,
		fetchPostComments,
		votePost,
		addComment,
	}
)(PostDetails)