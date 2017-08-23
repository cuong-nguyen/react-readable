import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDateString } from '../utils/helpers'
import { fetchPost, fetchPostComments, votePost, addComment, deletePost } from '../actions'
import { Comment, Voting, NewComment } from '../components'
import { getPost, getPostComments } from '../reducers'
import { v4 } from 'node-uuid'

class PostDetails extends Component {
	componentDidMount() {
		const { post, match, comments, fetchPost, fetchPostComments } = this.props
		post === undefined && fetchPost(match.params.postId)
		comments === undefined && fetchPostComments(match.params.postId)
	}

	onSubmitComment = (comment) => {
		const { post, addComment } = this.props

		addComment({
			id: v4(),
			...comment,
			parentId: post.id,
			timestamp: new Date().getTime()
		})
	}

	handleDeletePost = () => {
		const { post, deletePost, history } = this.props
		deletePost(post.id)
		history.goBack()
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
										onDelete={this.handleDeletePost}
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

				<NewComment onSubmit={this.onSubmitComment} />
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
		deletePost,
	}
)(PostDetails)