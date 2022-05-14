/** @format */

import { useEffect, useState } from "react"

const APIKEY = process.env.REACT_APP_GIPHY_API_KEY

const useFetch = ({ keyword }) => {
	const [gifUrl, setGifUrl] = useState("")

	const fetchGifs = async () => {
		try {
			console.log(APIKEY)
			const response = await fetch(
				`https://api.giphy.com/v1/gifs/search?api_key=${
					process.env.REACT_APP_GIPHY_API_KEY
				}&q=${keyword.split(" ").join("")}&limit=1`,
			)
			const { data } = await response.json()

			setGifUrl(data[0]?.images?.downsized_medium.url)
		} catch (error) {
			setGifUrl(
				"https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284",
			)
		}
	}

	useEffect(() => {
		if (keyword) fetchGifs()
	}, [keyword])

	return gifUrl
}

export default useFetch
