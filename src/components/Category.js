import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCategories } from '../actions/category'

class Category extends Component {
	componentDidMount() {
		const { getCategories } = this.props

		getCategories()
	}

	render() {
		const { categories } = this.props

		return (
			<div>
				<h2>Category list</h2>
				<ul>
					{categories.map(cat => <li key={cat.name}>{cat.name}</li>)}
				</ul>
			</div>
		)
	}
}

export default connect(
	(state) => ({
		categories: state.categories
	}),
	(dispatch) => ({
		getCategories: () => dispatch(getCategories())
	})
)(Category)