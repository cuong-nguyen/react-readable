import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Dashboard, Category, PostDetails, LogIn, NavBar } from '../components'
import { isLoggedIn } from '../utils/auth'

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />
      )}
  />
)

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <Switch>
          <Route exact path="/login" component={LogIn} />
          <AuthRoute exact path="/" component={Dashboard} />
          <AuthRoute path="/:categoryName/:postId" component={PostDetails} />
          <AuthRoute path="/:categoryName" component={Category} />
        </Switch>
      </div>
    )
  }
}

export default App
