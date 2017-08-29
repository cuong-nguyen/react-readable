import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { TextInput, SelectInput, Textarea } from './inputs'

class ManagePost extends Component {
	static propTypes = {
		post: PropTypes.object,
		categories: PropTypes.array.isRequired,
		onSubmit: PropTypes.func.isRequired,
	}

	state = {
		formInput: {
			author: '',
			category: this.props.match.params.categoryName || this.props.categories[0].name,
			title: '',
			body: ''
		}
	}

	componentDidMount() {
		const { post } = this.props
		post && this.setState({ formInput: Object.assign({}, post) })
	}

	onChange = (e) => {
		const { formInput } = this.state
		formInput[e.target.name] = e.target.value
		this.setState({ formInput })
	}

	shouldSubmit = () => {
		const { author, title, body, category } = this.state.formInput
		return !!(author && title && body && category)
	}

	handleSubmit = () => {
		if (this.shouldSubmit()) {
			this.props.onSubmit(this.state.formInput)
		}
	}

	render() {
		const { author, title, body, category } = this.state.formInput
		const { categories, post } = this.props

		return (
			<div>
				<TextInput
					autofocus
					name="author"
					label="Name"
					value={author}
					placeholder="Enter your name"
					onChange={this.onChange}
				/>

				{categories &&
					<SelectInput
						label="Category"
						name="category"
						value={category}
						onChange={this.onChange}
					>
						{categories.map(category => <option key={category.name}>{category.name}</option>)}
					</SelectInput>
				}

				<TextInput
					name="title"
					type="email"
					label="Title"
					value={title}
					placeholder="Enter post title"
					onChange={this.onChange}
				/>

				<Textarea
					label="Body"
					name="body"
					value={body}
					onChange={this.onChange}
					placeholder="Enter post body"
				/>

				<div className="field">
					<p className="control">
						<a
							className="button is-primary"
							onClick={this.handleSubmit}
							disabled={!this.shouldSubmit()}
						>
							<span className="icon">
								<i className={`fa ${post ? 'fa-check' : 'fa-plus-circle'}`}></i>
							</span>
							<span>{post ? 'SAVE' : 'ADD'}</span>
						</a>
					</p>
				</div>
			</div>
		)
	}
}

export default withRouter(
	connect(
		(state) => ({
			categories: state.categories
		})
	)(ManagePost)
)