import React from 'react'
import { toDateString } from '../utils/helpers'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
	const { title, author, timestamp, voteScore, category, id, comments } = post

	return (
		<div className="card">
			<Link
				className="post"
				to={{
					pathname: `${category}/${id}`,
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
				<a className="card-footer-item">
					<span className="icon"><i className="fa fa-thumbs-up"></i></span>
				</a>
				<a className="card-footer-item">
					<span className="icon"><i className="fa fa-thumbs-down"></i></span>
				</a>
				<a className="card-footer-item">
					<span className="icon"><i className="fa fa-pencil"></i></span>
				</a>
			</footer>
		</div >
	)
}

export default Post