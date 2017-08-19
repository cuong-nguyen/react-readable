import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import 'font-awesome/css/font-awesome.css'
import 'bulma/css/bulma.css'
import { App } from './components'
import { Provider } from 'react-redux'
import { getStore } from './store'

ReactDOM.render(
	<Provider store={getStore()}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'))
