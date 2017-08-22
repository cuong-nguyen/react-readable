import React, { Component } from 'react'
import { Post, Filter, SortBy } from '../components'
import { SORT_BY_VOTES, SORT_BY_DATE } from '../constants'
import { connect } from 'react-redux'
import { getPostsByCategory } from '../reducers'
import { sortPost } from '../actions'

class Posts extends Component {
	render() {
		const { posts, categoryName, sortPost } = this.props

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
	}
)(Posts)