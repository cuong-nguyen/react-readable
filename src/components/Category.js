import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories, getPosts } from '../actions'
import Post from './Post'

class Category extends Component {
	componentDidMount() {
		this.props.getCategories()
		this.props.getPosts()
	}

	render() {
		const { categories, posts } = this.props

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

				<div className="columns is-multiline">
					{posts.map(post => (
						<div className="column is-one-third" key={post.id}>
							<Post post={post} />
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		categories: state.categories,
		posts: state.posts
	}),
	(dispatch) => ({
		getCategories: () => dispatch(getCategories()),
		getPosts: () => dispatch(getPosts())
	})
)(Category)