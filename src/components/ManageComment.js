import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TextInput, Textarea } from './inputs'

class ManageComment extends Component {
  static propTypes = {
    comment: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
  }

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

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  shouldSubmit = () => {
    const { author, body } = this.state
    return !!(author && body)
  }

  handleSubmit = () => {
    const { author, body } = this.state

    if (this.shouldSubmit()) {
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

          <TextInput
            autofocus
            label="Name"
            name="author"
            value={author}
            placeholder="Enter your name"
            onChange={this.onChange}
          />

          <Textarea
            label="Comment"
            name="body"
            value={body}
            onChange={this.onChange}
            placeholder="Enter your comment"
          />

          <div className="field">
            <p className="control">
              <a
                className="button is-primary"
                onClick={this.handleSubmit}
                disabled={!this.shouldSubmit()}
              >
                <span className="icon">
                  <i
                    className={`fa ${comment ? 'fa-check' : 'fa-plus-circle'}`}
                  />
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
