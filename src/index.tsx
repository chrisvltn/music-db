import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

// Libs
import { HashRouter } from 'react-router-dom'
import { JssProvider } from 'react-jss'
import jss from './lib/jss';

const app =
	<JssProvider jss={jss}>
		<HashRouter>
			<App />
		</HashRouter>
	</JssProvider>

ReactDOM.render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
