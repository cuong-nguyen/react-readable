import React from 'react'
import { SORT_ASC } from '../constants'

const SortBy = ({ text, onClick, currentFilter, field }) => {
	console.log(currentFilter, field)
	const sortIcon =
		currentFilter.sortBy === field
			? currentFilter.sortDir === SORT_ASC
				? 'fa-long-arrow-up' : 'fa-long-arrow-down'
			: 'fa-sort'

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

export default SortBy