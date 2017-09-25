import React, { Component } from 'react'
import TextInput from './inputs/TextInput'
import { logIn, setAuthenticationInfo } from '../actions'
import { connect } from 'react-redux'
import { setAuthToken } from '../utils/auth'
import { Redirect } from 'react-router-dom'

class LogIn extends Component {
  state = {
    username: '',
    password: '',
    error: null,
    isAuthenticated: false,
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleLogIn = e => {
    e.preventDefault()

    const { username, password } = this.state
    const { logIn, setAuthenticationInfo } = this.props

    logIn(username, password).then(res => {
      if (res.error) {
        this.setState({ error: res.error })
      } else {
        setAuthToken(res.token)
        this.setState({ isAuthenticated: true })
        setAuthenticationInfo()
      }
    })
  }

  render() {
    const { username, password, error, isAuthenticated } = this.state
    const { location } = this.props

    if (isAuthenticated) {
      const { from } = location.state || {
        from: { pathname: '/' },
      }

      return <Redirect to={from} />
    }

    return (
      <div className="login-container">
        <div className="login-form">
          <TextInput
            autofocus
            label="Username"
            name="username"
            value={username}
            onChange={this.onChange}
          />
          <TextInput
            label="Password"
            name="password"
            value={password}
            onChange={this.onChange}
          />
          <p className="field">
            <a className="button is-success" onClick={this.handleLogIn}>
              <span className="icon">
                <i className="fa fa-sign-in" />
              </span>
              <span>Log In</span>
            </a>
          </p>
          {error && <p className="login-message">{error}</p>}
        </div>
      </div>
    )
  }
}

export default connect(null, {
  logIn,
  setAuthenticationInfo,
})(LogIn)
