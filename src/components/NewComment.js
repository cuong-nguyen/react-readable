import React, { Component } from 'react'

class NewComment extends Component {

	handleSubmit = () => {
		const author = this.authorInput.value
		const body = this.bodyInput.value

		if (author && body) {
			this.props.onSubmit({ author, body })
			this.authorInput.value = ''
			this.bodyInput.value = ''
		}
	}

	render() {
		return (
			<article className="media new-comment">
				<figure className="media-left">
					<p className="image is-48x48">
						<img src="http://bulma.io/images/placeholders/48x48.png" alt="" />
					</p>
				</figure>
				<div className="media-content">
					<div className="field">
						<span className="tag is-info">New comment</span>
					</div>
					<div className="field">
						<p className="control">
							<input
								ref={input => { this.authorInput = input }}
								className="input"
								placeholder="Your name..."></input>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<textarea
								ref={input => { this.bodyInput = input }}
								className="textarea"
								placeholder="Add a comment..."></textarea>
						</p>
					</div>
					<div className="field">
						<p className="control">
							<button className="button is-primary" onClick={this.handleSubmit}>
								Submit
							</button>
						</p>
					</div>
				</div>
			</article>
		)
	}
}

export default NewComment