import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

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
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input
							autoFocus
							className="input"
							type="text"
							placeholder="Enter your name"
							name="author"
							value={author}
							onChange={this.onChange}
						/>
					</div>
				</div>

				<div className="field">
					<label className="label">Category</label>
					{categories &&
						<div className="select">
							<select
								name="category"
								value={category}
								onChange={this.onChange}
							>
								{categories.map(category => <option key={category.name}>{category.name}</option>)}
							</select>
						</div>}
				</div>

				<div className="field">
					<label className="label">Title</label>
					<div className="control">
						<input
							value={title}
							name="title"
							onChange={this.onChange}
							className="input"
							type="email"
							placeholder="Enter post title"
						/>
					</div>
				</div>

				<div className="field">
					<label className="label">Body</label>
					<div className="control">
						<textarea
							value={body}
							name="body"
							onChange={this.onChange}
							className="textarea"
							type="email"
							placeholder="Enter post body"
						>
						</textarea>
					</div>
				</div>

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