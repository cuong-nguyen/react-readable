import React, { Component } from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import Category from './Category'
import Posts from './Posts'
import PostDetails from './PostDetails'

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route exact path="/" component={Category} />
					<Route path="/:categoryId/:postId" component={PostDetails} />
					<Route path="/:categoryId" component={Posts} />
				</Switch>
			</div>
		);
	}
}

export default App;
