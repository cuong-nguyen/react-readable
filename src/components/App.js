import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Category from './Category'
import Posts from './Posts'
import PostDetails from './PostDetails'

class App extends Component {
	render() {
		return (
			<div className="container">
				<Switch>
					<Route exact path="/" component={Category} />
					<Route
						path="/:categoryName/:postId"
						render={(props) => <PostDetails {...props} />}
					/>
					<Route path="/:categoryName" component={Posts} />
				</Switch>
			</div>
		);
	}
}

export default App;
