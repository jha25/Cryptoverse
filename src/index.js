/** @format */

import React, { useContext } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from "react-router-dom"

import App from "./App"
import store from "./app/store"

import "antd/dist/antd.min.css"
import "./index.css"
import { TransactionsProvider } from "./context/TransactionContext"

ReactDOM.render(
	<Router>
		<TransactionsProvider>
			{/* <Provider store={store}> */}
			<App />
			{/* </Provider> */}
		</TransactionsProvider>
		,
	</Router>,
	document.getElementById("root"),
)
