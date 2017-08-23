import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Post, Filter, SortBy, NewPost } from '../components'
import { getCategories, fetchPosts, sortPost, addPost } from '../actions'
import { getSortedPosts } from '../reducers'
import { SORT_BY_VOTES, SORT_BY_DATE } from '../constants'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class Category extends Component {
	state = {
		newPostModalOpen: false
	}

	openNewPostModal = () => this.setState({ newPostModalOpen: true })
	closeNewPostModal = () => this.setState({ newPostModalOpen: false })

	addPost = ({ author, title, body, category }) => {
		const { addPost } = this.props

		addPost({
			id: v4(),
			author,
			title,
			body,
			category,
			timestamp: new Date().getTime(),
		})
		this.setState({ newPostModalOpen: false })
	}

	componentDidMount() {
		this.props.getCategories()
		this.props.fetchPosts()
	}

	render() {
		const { categories, posts, sortPost } = this.props
		const { newPostModalOpen } = this.state

		return (
			<div>
				<nav className="panel">
					<p className="panel-heading">
						<strong>Categories</strong>
					</p>
					<div className="panel-block">
						{categories.map(cat => (
							<Link className="category" key={cat.name} to={`/${cat.name}`}>
								<span className="tag is-info">#{cat.name}</span>
							</Link>
						))}
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
							<Post postId={post.id} />
						</div>
					))}
				</div>

				<div className="new-post">
					<a onClick={this.openNewPostModal}>Add a post</a>
				</div>

				<Modal
					isOpen={newPostModalOpen}
					contentLabel='Modal'
					className='custom-modal'
					overlayClassName='custom-overlay'
					onRequestClose={this.closeNewPostModal}
				>
					{newPostModalOpen && <NewPost onSubmit={this.addPost} categories={categories} />}
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
	}
)(Category)