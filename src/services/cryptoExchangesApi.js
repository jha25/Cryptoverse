/** @format */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoExchangesHeaders = {
	"x-rapidapi-host": process.env.REACT_APP_CRYPTO_EXCHANGE_RAPIDAPI_HOST,
	"x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
}

const baseUrl = process.env.REACT_APP_CRYPTO_EXCHANGE_API_URL
const createRequest = (url) => ({ url, headers: cryptoExchangesHeaders })

export const cryptoExchangesApi = createApi({
	reducerPath: "cryptoExchangesApi",
	baseQuery: fetchBaseQuery({
		baseUrl,
	}),
	endpoints: (builder) => ({
		getExchanges: builder.query({
			query: () => createRequest("/exchanges"),
		}),
	}),
})

export const { useGetExchangesQuery } = cryptoExchangesApi
