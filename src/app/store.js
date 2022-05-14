/** @format */

import { configureStore } from "@reduxjs/toolkit"

import { cryptoApi } from "../services/cryptoApi"
import { cryptoNewsApi } from "../services/cryptoNewsApi"
import { cryptoExchangesApi } from "../services/cryptoExchangesApi"
import { cryptoPriceApi } from "../services/cryptoPriceApi"

export default configureStore({
	reducer: {
		[cryptoApi.reducerPath]: cryptoApi.reducer,
		[cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
		[cryptoExchangesApi.reducerPath]: cryptoExchangesApi.reducer,
		[cryptoPriceApi.reducerPath]: cryptoPriceApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cryptoApi.middleware),
})
