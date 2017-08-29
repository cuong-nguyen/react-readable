import React, { Component } from 'react'
import { connect } from 'react-redux'
import { toDateString } from '../utils/helpers'
import {
	fetchPost,
	fetchPostComments,
	votePost,
	deletePost,
	editPost,
	getCategories,
	addComment,
	editComment
} from '../actions'
import { Comment, Voting, ManageComment, ManagePost, GoToHome, CommentFilter } from '../components'
import { getPost } from '../selectors/postSelectors'
import { sortPostComments } from '../selectors/commentSelectors'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class PostDetails extends Component {
	state = {
		postModalOpen: false,
		commentModalOpen: false,
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

	openManageCommentModal = (comment) => {
		this.editingComment = comment
		this.setState({ commentModalOpen: true })
	}

	closeModal = () => this.setState({ postModalOpen: false, commentModalOpen: false })

	handleSubmitComment = (comment) => {
		const { addComment, editComment, post } = this.props

		if (comment.id) {
			editComment(comment)
		} else {
			addComment({
				id: v4(),
				...comment,
				parentId: post.id,
				timestamp: new Date().getTime()
			})
		}

		this.closeModal()
	}

	handleSubmitPost = (post) => {
		const { editPost } = this.props
		post.timestamp = new Date().getTime()
		editPost(post)

		this.setState({ postModalOpen: false })
	}

	handleDeletePost = () => {
		const { post, deletePost, history } = this.props
		deletePost(post.id)
		history.goBack()
	}

	render() {
		const { post, comments, votePost, categories } = this.props
		const { postModalOpen, commentModalOpen } = this.state

		return (
			<div>
				{post && (
					<div>
						<div className="box">
							<article className="media">
								<div className="media-content">
									<div className="content">
										<p>
											<strong>{post.title}</strong>
											<small> by {post.author} on {toDateString(post.timestamp)}</small>
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

						{comments && (
							<div>
								{comments.length
									? <CommentFilter noOfComments={comments.length} />
									: <strong>Be the first to comment below</strong>
								}
								{comments.map(comment =>
									<Comment
										onEdit={this.openManageCommentModal}
										key={comment.id}
										{...comment}
									/>
								)}
							</div>
						)}

						<div className="new-comment">
							<a className="button is-large" onClick={() => this.openManageCommentModal(null)}>
								<span className="icon is-medium">
									<i className="fa fa-comments-o"></i>
								</span>
							</a>
						</div>

						<Modal
							isOpen={commentModalOpen}
							contentLabel='Modal'
							className='comment-modal'
							overlayClassName='post-overlay'
							onRequestClose={this.closeModal}
						>
							<ManageComment
								postId={post.id}
								comment={this.editingComment}
								onSubmit={this.handleSubmitComment} />
						</Modal>

						<Modal
							isOpen={postModalOpen}
							contentLabel='Modal'
							className='post-modal'
							overlayClassName='post-overlay'
							onRequestClose={this.closeModal}
						>
							<ManagePost
								post={this.editingPost}
								onSubmit={this.handleSubmitPost}
								categories={categories.map(c => c.name)}
							/>
						</Modal>

						<GoToHome />
					</div>
				)}
			</div>
		)
	}
}

export default connect(
	(state, { match }) => ({
		filter: state.filter,
		categories: state.categories,
		post: getPost(state, match.params.postId),
		comments: sortPostComments(state, match.params.postId),
	}),
	{
		fetchPost,
		fetchPostComments,
		votePost,
		deletePost,
		editPost,
		getCategories,
		addComment,
		editComment,
	}
)(PostDetails)