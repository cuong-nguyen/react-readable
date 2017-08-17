import React, { Component } from 'react'
import { toDateString } from '../utils/helpers'
import { Link } from 'react-router-dom'
import CardFooter from './CardFooter'
import { votePost } from '../actions'
import { connect } from 'react-redux'

class Post extends Component {

	render() {
		const { post, votePost, postId } = this.props
		const { title, author, timestamp, voteScore, category, comments } = post

		return (
			<div className="card">
				<Link
					className="post"
					to={{
						pathname: `${category}/${postId}`,
						state: { post }
					}}
				>
					<div className="card-content">
						<div className="media">
							<div className="media-left">
								<figure className="image is-48x48">
									<img src="http://bulma.io/images/placeholders/48x48.png" alt="profile" />
								</figure>
							</div>
							<div className="media-content">
								<p className="title is-4">{author}</p>
								<p className="subtitle is-7">
									<span className="icon is-small"><i className="fa fa-tag"></i></span>
									<i>{' ' + category}</i>
								</p>
							</div>
						</div>

						<div className="content">
							{title}
						</div>

						<nav className="level is-mobile">
							<div className="level-left">
								<span className="icon"><i className="fa fa-comments"></i></span>
								{comments ? comments.length : 0}
								&nbsp;
							<span className="icon"><i className="fa fa-heart"></i></span>
								{voteScore || 0}
							</div>
							<div className="level-right">
								<span className="tag is-info">{toDateString(timestamp)}</span>
							</div>
						</nav>
					</div>
				</Link>

				<footer className="card-footer">
					<CardFooter icon="fa-thumbs-up" onClick={() => votePost(postId, "upVote")} />
					<CardFooter icon="fa-thumbs-down" onClick={() => votePost(postId, "downVote")} />
					<CardFooter icon="fa-pencil" />
					<CardFooter icon="fa-trash" />
				</footer>
			</div >
		)
	}
}

export default connect(
	(state, ownProps) => ({
		post: {
			...state.posts.find(p => p.id === ownProps.postId)
		}
	}),
	(dispatch) => ({
		votePost: (postId, option) => dispatch(votePost(postId, option))
	})
)(Post)