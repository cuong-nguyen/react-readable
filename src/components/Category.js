import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Post, Filter, SortBy, ManagePost, Tag } from '../components'
import { getCategories, fetchPosts, sortPost, addPost, editPost } from '../actions'
import { getSortedPosts } from '../reducers'
import { SORT_BY_VOTES, SORT_BY_DATE } from '../constants'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class Category extends Component {
	state = {
		postModalOpen: false,
	}

	openManagePostModal = (post) => {
		this.editingPost = post
		this.setState({ postModalOpen: true })
	}

	closeManagePostModal = () => this.setState({ postModalOpen: false })

	handleSubmitPost = (post) => {
		const { addPost, editPost } = this.props
		post.timestamp = new Date().getTime()

		if (post.id) {
			editPost(post)
		} else {
			post.id = v4()
			addPost(post)
		}

		this.setState({ postModalOpen: false })
	}

	componentDidMount() {
		this.props.getCategories()
		this.props.fetchPosts()
	}

	render() {
		const { categories, posts, sortPost } = this.props
		const { postModalOpen } = this.state

		return (
			<div>
				<nav className="panel">
					<p className="panel-heading">
						<strong>Categories</strong>
					</p>
					<div className="panel-block">
						<div className="field is-grouped is-grouped-multiline">
							{categories.map((category, idx) => <Tag key={idx} text={category.name} />)}
						</div>
					</div>
				</nav>

				{posts.length > 1 && (
					<Filter>
						<SortBy
							text="Votes"
							onClick={() => sortPost(SORT_BY_VOTES)}
							field={SORT_BY_VOTES}
						/>
						<SortBy
							text="Date"
							onClick={() => sortPost(SORT_BY_DATE)}
							field={SORT_BY_DATE}
						/>
					</Filter>
				)}

				<div className="columns is-multiline">
					{posts.map(post => (
						<div className="column is-one-third" key={post.id}>
							<Post postId={post.id} onEdit={this.openManagePostModal} />
						</div>
					))}
				</div>

				<div className="new-post">
					<a onClick={() => this.openManagePostModal(null)}>Add a post</a>
				</div>

				<Modal
					isOpen={postModalOpen}
					contentLabel='Modal'
					className='post-modal'
					overlayClassName='post-overlay'
					onRequestClose={this.closeManagePostModal}
				>
					<ManagePost post={this.editingPost} onSubmit={this.handleSubmitPost} />
				</Modal>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		categories: state.categories,
		posts: getSortedPosts(state),
		postFilter: state.postFilter,
	}),
	{
		getCategories,
		fetchPosts,
		sortPost,
		addPost,
		editPost,
	}
)(Category)