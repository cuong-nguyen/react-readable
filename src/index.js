import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './components/App'
import { Provider } from 'react-redux'
import { getStore } from './store'

ReactDOM.render(
	<Provider store={getStore()}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'))
