import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Voting } from '../components'
import { toDateString } from '../utils/helpers'
import { voteComment, deleteComment } from '../actions'
import { getComment } from '../selectors/commentSelectors'

const Comment = ({ id, comment, voteComment, deleteComment, onEdit }) => {

	return (
		<div className="comment">
			<div className="media">
				<div className="media-left">
					<figure className="image is-32x32">
						<img src="http://bulma.io/images/placeholders/32x32.png" alt="profile" />
					</figure>
				</div>
				<div className="media-content">
					<p className="title is-6">{comment.author}</p>
					<p className="subtitle is-7"> on {toDateString(comment.timestamp)}</p>
				</div>
			</div>

			<div className="body">
				{comment.body}
			</div>
			<Voting
				voteScore={comment.voteScore}
				upVote={() => voteComment(id, 'upVote')}
				downVote={() => voteComment(id, 'downVote')}
				onDelete={() => deleteComment(id)}
				onEdit={() => onEdit(comment)}
			/>
		</div>
	)
}

Comment.propTypes = {
	id: PropTypes.string,
	comment: PropTypes.object,
	voteComment: PropTypes.func.isRequired,
	deleteComment: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
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