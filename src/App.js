/** @format */

import React from "react"
import { Switch, Route } from "react-router-dom"
import { Layout } from "antd"
import {
	Exchanges,
	Homepage,
	News,
	Cryptocurrencies,
	CryptoDetails,
	Navbar,
	Footer,
	Wallet,
	Services,
	Transaction,
} from "./components"
import { Provider } from "react-redux"

import "./App.css"
import store from "./app/store"

const App = () => {
	return (
		<div className='app'>
			<div className='navbar'>
				<Navbar />
			</div>
			<div className='main'>
				<Provider store={store}>
					<Layout>
						<div className='routes'>
							<Switch>
								<Route exact path='/'>
									<Homepage />
								</Route>
								<Route exact path='/exchanges'>
									<Exchanges />
								</Route>
								<Route exact path='/cryptocurrencies'>
									<Cryptocurrencies />
								</Route>
								<Route exact path='/crypto/:coinId'>
									<CryptoDetails />
								</Route>
								<Route exact path='/news'>
									<News />
								</Route>
								<Route exact path='/wallet'>
									<Wallet />
									<Services />
									<Transaction />
								</Route>
							</Switch>
						</div>
					</Layout>
				</Provider>
				<Footer />
			</div>
		</div>
	)
}

export default App
