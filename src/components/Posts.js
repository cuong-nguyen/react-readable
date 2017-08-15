import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class Posts extends Component {
	render() {
		const { posts } = this.props

		return (
			<div>
				<h2>Post</h2>
				<ul>
					{posts.map(p => (
						<li key={p.id}>
							<Link
								to={{
									pathname: `${p.category}/${p.id}`,
									state: { post: p }
								}}
							>
								{p.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		)
	}
}

export default connect(
	(state, ownProps) => {
		return {
			posts: state.posts.filter(p => p.category === ownProps.match.params.categoryName)
		}
	}
)(Posts)