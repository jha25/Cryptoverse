/** @format */

require("@nomiclabs/hardhat-waffle")
require("dotenv").config()

module.exports = {
	solidity: "0.8.0",
	networks: {
		ropsten: {
			url: "https://eth-ropsten.alchemyapi.io/v2/g2OkWDMfvb-3A2Kgo4Th6jD1B6bpTyDI",
			accounts: [process.env.META_KEY],
		},
	},
}
