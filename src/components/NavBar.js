import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { logOut } from '../utils/auth'
import { isLoggedIn } from '../utils/auth'

class NavBar extends Component {
  render() {
    const { history } = this.props

    return (
      <nav className="navbar is-primary">
        <div className="navbar-end">
          <div className="field is-grouped">
            {isLoggedIn() && (
              <p className="control">
                <a
                  className="button is-primary"
                  onClick={() => logOut().then(() => history.push('/'))}
                >
                  <span className="icon">
                    <i className="fa fa-sign-out" aria-hidden="true" />
                  </span>
                  <span>Log Out</span>
                </a>
              </p>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(NavBar)
