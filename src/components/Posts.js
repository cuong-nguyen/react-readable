import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'

class Posts extends Component {
	render() {
		const { posts, categoryName } = this.props

		return (
			<div>
				<h1 className="title">#{categoryName}</h1>
				<div className="columns is-multiline">
					{posts.map(post => (
						<div className="column is-one-third" key={post.id}>
							<Post postId={post.id} />
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => {
		const categoryName = ownProps.match.params.categoryName

		return {
			posts: state.posts.filter(p => p.category === categoryName),
			categoryName,
		}
	}
)(Posts)