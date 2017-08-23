import React, { Component } from 'react'
import { Post, Filter, SortBy, NewPost } from '../components'
import { SORT_BY_VOTES, SORT_BY_DATE } from '../constants'
import { connect } from 'react-redux'
import { getPostsByCategory } from '../reducers'
import { sortPost, addPost } from '../actions'
import Modal from 'react-modal'
import { v4 } from 'node-uuid'

class Posts extends Component {
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

	render() {
		const { posts, categoryName, sortPost } = this.props
		const { newPostModalOpen } = this.state

		return (
			<div>
				<h1 className="title">#{categoryName}</h1>

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
					{newPostModalOpen && <NewPost onSubmit={this.addPost} categories={[categoryName]} />}
				</Modal>
			</div>
		)
	}
}

export default connect(
	(state, { match }) => {
		const categoryName = match.params.categoryName

		return {
			posts: getPostsByCategory(state, categoryName),
			categoryName,
			postFilter: state.postFilter,
		}
	},
	{
		sortPost,
		addPost
	}
)(Posts)