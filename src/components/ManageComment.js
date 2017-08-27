import React, { Component } from 'react'

class ManageComment extends Component {
	state = {
		author: '',
		body: ''
	}

	componentDidMount() {
		const { comment } = this.props

		if (comment) {
			const { author, body } = comment
			this.setState({ author, body })
		}
	}

	clearForm = () => {
		this.setState({ author: '', body: '' })
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value })
	}

	handleSubmit = () => {
		const { author, body } = this.state

		if (author && body) {
			const { comment } = this.props
			const updatingComment = Object.assign({}, comment, { author, body })
			this.props.onSubmit(updatingComment)
			this.clearForm()
		}
	}

	render() {
		const { author, body } = this.state
		const { comment } = this.props

		return (
			<article className="media manage-comment">
				<div className="media-content">
					<div className="field">
						<strong>
							<span className="icon">
								<i className="fa fa-comment"> </i>
							</span>
							{comment ? ' Edit Comment' : ' New Comment'}
						</strong>
					</div>
					<div className="field">
						<p className="control">
							<input
								autoFocus
								name="author"
								value={this.state.author}
								onChange={this.onChange}
								className="input"
								placeholder="Enter your name..."></input>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<textarea
								name="body"
								value={this.state.body}
								onChange={this.onChange}
								className="textarea"
								placeholder="Enter your comment..."></textarea>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<a className="button is-primary" onClick={this.handleSubmit} disabled={!author || !body}>
								<span className="icon">
									<i className={`fa ${comment ? 'fa-check' : 'fa-plus-circle'}`}></i>
								</span>
								<span>{comment ? 'SAVE' : 'ADD'}</span>
							</a>
						</p>
					</div>
				</div>
			</article>
		)
	}
}

export default ManageComment