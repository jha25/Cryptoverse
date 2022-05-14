/** @format */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const cryptoCoinInfoHeaders = {
	"x-rapidapi-host": process.env.REACT_APP_CRYPTO_PRICE_RAPIDAPI_HOST,
	"x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
}
const baseUrl = process.env.REACT_APP_CRYPTO_PRICE_API_URL

const createRequest = (url) => ({
	url,
	headers: cryptoCoinInfoHeaders,
})

export const cryptoPriceApi = createApi({
	reducerPath: "cryptoPriceApi",
	baseQuery: fetchBaseQuery({ baseUrl }),
	endpoints: (builder) => ({
		getCryptoDetailsInfo: builder.query({
			query: ({ coinId }) => createRequest(`/coins/${coinId}`),
		}),
		getCryptoHistoricData: builder.query({
			query: ({ cryptoName }) =>
				createRequest(
					`/coins/${cryptoName}/market_chart?vs_currency=usd&days=max`,
				),
		}),
		getCryptoExchangesData: builder.query({
			query: () => createRequest(`/exchanges`),
		}),
		getCryptoExchange: builder.query({
			query: (exchangeName) => createRequest(`/exchanges/${exchangeName}`),
		}),
	}),
})

export const {
	useGetCryptoHistoricDataQuery,
	useGetCryptoDetailsInfoQuery,
	useGetCryptoExchangesDataQuery,
	useGetCryptoExchangeQuery,
} = cryptoPriceApi
