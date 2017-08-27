import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Dashboard, Category, PostDetails } from '../components'

class App extends Component {
	render() {
		return (
			<div className="container">
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/:categoryName/:postId" component={PostDetails} />
					<Route path="/:categoryName" component={Category} />
				</Switch>
			</div>
		);
	}
}

export default App;
