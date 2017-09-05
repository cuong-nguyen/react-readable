import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory } from '../actions'

class NewCategory extends Component {
  state = {
    newCategory: '',
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = () => {
    const { newCategory } = this.state

    if (newCategory) {
      this.props.addCategory(newCategory)
      this.setState({ newCategory: '' })
    }
  }

  render() {
    const { newCategory } = this.state
    return (
      <div className="field has-addons">
        <div className="control">
          <input
            value={newCategory}
            onChange={this.onChange}
            name="newCategory"
            className="input is-small"
            type="text"
            placeholder="New category"
          />
        </div>
        <div className="control">
          <a
            className="button is-success is-small"
            onClick={this.onSubmit}
            disabled={!newCategory}
          >
            Add
          </a>
        </div>
      </div>
    )
  }
}

export default connect(null, { addCategory })(NewCategory)
