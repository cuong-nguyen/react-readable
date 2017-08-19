import React from 'react'

const Comment = ({ author, body, voteScore, timestamp, id }) => {
	return (
		<article className="media" key={id}>
			<figure className="media-left">
				<p className="image is-48x48">
					<img src="http://bulma.io/images/placeholders/48x48.png" alt="" />
				</p>
			</figure>
			<div className="media-content">
				<div className="content">
					<p>
						<strong>{author}</strong>
						<br />
						{body}
						<br />
						<small><a>Like</a> · <a>Reply</a> · 3 hrs</small>
					</p>
				</div>
			</div>
		</article>
	)
}

export default Comment