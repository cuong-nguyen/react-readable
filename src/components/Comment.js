import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Voting } from '../components'
import { toDateString } from '../utils/helpers'
import { voteComment, deleteComment } from '../actions'
import { getComment } from '../reducers'

class Comment extends Component {

	render() {
		const { id, comment, voteComment, deleteComment } = this.props

		return (
			<article className="media">
				<figure className="media-left">
					<p className="image is-48x48">
						<img src="http://bulma.io/images/placeholders/48x48.png" alt="" />
					</p>
				</figure>
				<div className="media-content">
					<div className="content">
						<div>
							<strong>{comment.author}</strong>
							<small> @ {toDateString(comment.timestamp)}</small>
							<div>{comment.body}</div>
							<br />
							<Voting
								voteScore={comment.voteScore}
								upVote={() => voteComment(id, 'upVote')}
								downVote={() => voteComment(id, 'downVote')}
								onDelete={() => deleteComment(id)}
							/>
						</div>
					</div>
				</div>
			</article>
		)
	}
}

export default connect(
	(state, { parentId: postId, id }) => ({
		comment: getComment(state, id, postId)
	}),
	{
		voteComment,
		deleteComment,
	}
)(Comment)