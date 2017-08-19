import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Post, Filter, SortBy } from '../components'
import { getCategories, getPosts, sortPost } from '../actions'
import { getSortedPosts } from '../reducers'
import { SORT_BY_VOTES, SORT_BY_DATE } from '../constants'

class Category extends Component {
	componentDidMount() {
		this.props.getCategories()
		this.props.getPosts()
	}

	render() {
		const { categories, posts, sortPost } = this.props

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
			</div>
		)
	}
}

export default connect(
	(state) => ({
		categories: state.categories,
		posts: getSortedPosts(state, state.filter),
		filter: state.filter,
	}),
	{
		getCategories,
		getPosts,
		sortPost,
	}
)(Category)