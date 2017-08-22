import React from 'react'
import Action from './Action'

const Voting = ({ upVote, downVote, voteScore }) => {
	return (
		<div className="level-left">
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
			<a className="level-item">
				<span className="icon"><i className="fa fa-heart"></i></span>
				{voteScore}
			</a>
		</div>
	)
}

export default Voting