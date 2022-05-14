/** @format */

const main = async () => {
	// Generate instances
	const transactionsFactory = await hre.ethers.getContractFactory(
		"Transactions",
	)
	// The instance
	const transactionsContract = await transactionsFactory.deploy()

	await transactionsContract.deployed()

	console.log("Transactions address: ", transactionsContract.address)
}

const runMain = async () => {
	try {
		await main()
		process.exit(0)
	} catch (error) {
		console.error(error)
		process.exit(1)
	}
}

runMain()
