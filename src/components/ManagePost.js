import React, { Component } from 'react'

class ManagePost extends Component {
	state = {
		formInput: {
			author: '',
			category: '',
			title: '',
			body: ''
		}
	}

	componentDidMount() {
		const { post } = this.props

		if (post) {
			this.setState({ formInput: Object.assign({}, post) })
		}
	}

	onChange = (e) => {
		const { formInput } = this.state
		formInput[e.target.name] = e.target.value
		this.setState({ formInput })
	}

	handleSubmit = () => {
		this.props.onSubmit(this.state.formInput)
	}

	render() {
		const { author, title, body, category } = this.state.formInput
		const { categories } = this.props

		return (
			<div>
				<div className="field">
					<label className="label">Name</label>
					<div className="control">
						<input
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
								{categories.map(cat => <option key={cat}>{cat}</option>)}
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
						<button className="button is-success" onClick={this.handleSubmit}>
							Submit
    				</button>
					</p>
				</div>
			</div>
		)
	}
}

export default ManagePost