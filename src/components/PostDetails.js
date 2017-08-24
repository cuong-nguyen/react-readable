import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDateString } from '../utils/helpers'
import {
	fetchPost,
	fetchPostComments,
	votePost,
	addComment,
	deletePost,
	editPost,
	getCategories
} from '../actions'
import { Comment, Voting, NewComment, ManagePost } from '../components'
import { getPost, getPostComments } from '../reducers'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class PostDetails extends Component {
	state = {
		postModalOpen: false
	}

	componentDidMount() {
		const { post, match, comments, fetchPost, fetchPostComments, categories } = this.props
		post === undefined && fetchPost(match.params.postId)
		comments === undefined && fetchPostComments(match.params.postId)
		categories === undefined && getCategories()
	}

	openManagePostModal = () => {
		this.editingPost = this.props.post
		this.setState({ postModalOpen: true })
	}

	closeManagePostModal = () => this.setState({ postModalOpen: false })

	handleSubmitPost = (post) => {
		const { editPost } = this.props
		post.timestamp = new Date().getTime()
		editPost(post)

		this.setState({ postModalOpen: false })
	}

	handleSubmitComment = (comment) => {
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
		const { post, comments, votePost, categories } = this.props
		const { postModalOpen } = this.state

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
										onEdit={this.openManagePostModal}
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

				<NewComment onSubmit={this.handleSubmitComment} />

				<Modal
					isOpen={postModalOpen}
					contentLabel='Modal'
					className='post-modal'
					overlayClassName='post-overlay'
					onRequestClose={this.closeManagePostModal}
				>
					<ManagePost
						post={this.editingPost}
						onSubmit={this.handleSubmitPost}
						categories={categories.map(c => c.name)}
					/>
				</Modal>
			</div>
		)
	}
}

export default connect(
	(state, { match }) => {
		const post = getPost(state, match.params.postId)
		console.log(state.categories)
		return {
			post,
			totalVotes: post ? post.voteScore : null,
			categories: state.categories,
			comments: getPostComments(state, match.params.postId),
		}
	},
	{
		fetchPost,
		fetchPostComments,
		votePost,
		addComment,
		deletePost,
		editPost,
		getCategories,
	}
)(PostDetails)