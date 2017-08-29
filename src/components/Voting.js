import React from 'react'
import PropTypes from 'prop-types'
import Action from './Action'

const Voting = ({ upVote, downVote, voteScore, onEdit, onDelete }) => {
	return (
		<div className="actions">
			<div className="voting">
				<Action
					icon="fa-thumbs-up"
					actionClass="level-item"
					onClick={upVote}
				/>
				<Action
					icon="fa-thumbs-down"
					actionClass="level-item"
					onClick={downVote}
				/>
				<Action icon="fa-heart" actionClass="level-item">
					{voteScore}
				</Action>
			</div>
			<div className="manage">
				<Action
					icon="fa-pencil"
					actionClass="level-item"
					onClick={onEdit}
				/>
				<Action
					icon="fa-trash"
					actionClass="level-item"
					onClick={onDelete}
				/>
			</div>
		</div>
	)
}

Voting.propTypes = {
	upVote: PropTypes.func.isRequired,
	downVote: PropTypes.func.isRequired,
	voteScore: PropTypes.number,
	onEdit: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
}

export default Voting