import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCategories, getPosts } from '../actions'

class Category extends Component {
	componentDidMount() {
		const { getCategories, getPosts } = this.props

		getCategories()
		getPosts()
	}

	render() {
		const { categories, posts } = this.props

		return (
			<div>
				<h2>Category list</h2>
				<ul>
					{categories.map(cat => (
						<li key={cat.name}>
							<Link to={`/${cat.name}`}>{cat.name}</Link>
						</li>
					))}
				</ul>
				<br />
				<h2>Posts</h2>
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
	(state) => ({
		categories: state.categories,
		posts: state.posts
	}),
	(dispatch) => ({
		getCategories: () => dispatch(getCategories()),
		getPosts: () => dispatch(getPosts())
	})
)(Category)