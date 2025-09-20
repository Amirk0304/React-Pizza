import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import ErrorBoundary from './pages/ErrorBoundary.jsx'
import './scss/app.scss'
import { Provider } from 'react-redux'
import store from './redux/Store.js'

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<Provider store={store}>
			<ErrorBoundary>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ErrorBoundary>
		</Provider>
	</StrictMode>
)
