import React from 'react'
import { connect } from 'react-redux'
import { SORT_ASC } from '../constants'

const SortBy = ({ text, onClick, sortIcon, field }) => {
	return (
		<p className="control">
			<a className="button is-small" onClick={onClick}>
				<span className="icon is-small">
					<i className={`fa ${sortIcon}`}></i>
				</span>
				<span>{text}</span>
			</a>
		</p>
	)
}

export default connect(
	({ postFilter }, { field }) => ({
		sortIcon: postFilter.sortBy === field
			? postFilter.sortDir === SORT_ASC ? 'fa-long-arrow-up' : 'fa-long-arrow-down'
			: 'fa-sort'
	})
)(SortBy)