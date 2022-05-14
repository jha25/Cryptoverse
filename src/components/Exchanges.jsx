/** @format */

import React, { useState, useEffect } from "react"
import millify from "millify"
import { Collapse, Row, Col, Typography, Avatar } from "antd"
import HTMLReactParser from "html-react-parser"

import {
	useGetCryptoExchangesDataQuery,
	useGetCryptoExchangeQuery,
} from "../services/cryptoPriceApi"

import { useGetExchangesQuery } from "../services/cryptoExchangesApi"

import Spinner from "./Spinner"

const { Text } = Typography
const { Panel } = Collapse

const Exchanges = () => {
	const { data } = useGetCryptoExchangesDataQuery()

	const filteredData = data?.map((exchange) => exchange?.id)

	const { data: exchangeData, isFetching } = useGetExchangesQuery({
		filteredData,
	})

	const list = []

	exchangeData?.map((exchange) => {
		if (
			typeof exchange?.reported_rank === "number" &&
			exchange?.reported_rank <= 100
		)
			list?.push(exchange)
		return
	})

	list.sort((l1, l2) => l1?.reported_rank - l2?.reported_rank)
	console.log(list)

	if (isFetching) return <Spinner />

	return (
		<>
			<Row>
				<Col span={6}>Exchanges</Col>
				<Col span={7}>24h Trade Volume</Col>
				<Col span={4}>Rank</Col>
				<Col span={4}>Number of Markets</Col>
			</Row>
			<Row>
				{list?.map((exchange) => (
					<Col span={24}>
						<Collapse>
							<Panel
								key={exchange?.id}
								showArrow={false}
								header={
									<Row key={exchange?.id}>
										<Col style={{ width: "18.9vw" }}>
											<Text>
												<strong>{exchange?.reported_rank}.</strong>
											</Text>
											<Avatar
												className='exchange-image'
												// src={exchange?.image}
											/>
											<Text>
												<strong>{exchange?.name}</strong>
											</Text>
										</Col>
										<Col style={{ width: "23vw" }}>
											{millify(exchange?.quotes?.USD?.reported_volume_7d)}
										</Col>
										<Col style={{ width: "16vw" }}>
											{millify(exchange?.reported_rank)}
										</Col>
										<Col style={{ width: "16vw" }}>{exchange?.markets}</Col>
									</Row>
								}>
								{HTMLReactParser(
									exchange.description || "Data not available on this API",
								)}
							</Panel>
						</Collapse>
					</Col>
				))}
			</Row>
		</>
	)
}

export default Exchanges
