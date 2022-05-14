/** @format */

import React from "react"
import { Line } from "react-chartjs-2"
import { Col, Row, Typography } from "antd"

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
	console.log(coinHistory)
	const coinPrice = coinHistory?.prices?.map((prices) => prices[1])
	const coinTimestamp = coinHistory?.prices?.map((timeStamp) =>
		new Date(timeStamp[0]).toLocaleDateString("en-US"),
	)

	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: "Price In USD",
				data: coinPrice,
				fill: false,
				backgroundColor: "#0071bd",
				borderColor: "#0071bd",
			},
		],
	}

	const options = {
		scales: {
			y: {
				ticks: {
					beginAtZero: true,
				},
			},
		},
	}

	return (
		<>
			<Row className='chart-header'>
				<Typography.Title level={2} className='chart-title'>
					{coinName} Price Chart
				</Typography.Title>
				<Col className='price-container'>
					<Typography.Title level={5} className='price-change'>
						Change: {coinHistory?.data?.change}%
					</Typography.Title>
					<Typography.Title level={5} className='current-price'>
						Current {coinName} Price: $ {currentPrice}
					</Typography.Title>
				</Col>
			</Row>
			<Line data={data} options={options} />
		</>
	)
}

export default LineChart
