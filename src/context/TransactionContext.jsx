/** @format */

// React context api to connect to the blockchain

import React, { useEffect, useState } from "react"
import { ethers } from "ethers"

// grab the abi and contract address
import { contractABI, contractAddress } from "../utils/constants"

// method to pass props from parent to child component(s)
export const TransactionContext = React.createContext()

// access ethereum object
const { ethereum } = window

// fetch ethereum contract
const createEthereumContract = () => {
	// MetaMask injects a Web3 Provider as "web3.currentProvider", so
	// we can wrap it up in the ethers.js Web3Provider, which wraps a
	// Web3 Provider and exposes the ethers.js Provider API.
	const provider = new ethers.providers.Web3Provider(ethereum)
	// Getting the accounts
	const signer = provider.getSigner()
	const transactionsContract = new ethers.Contract(
		contractAddress,
		contractABI,
		signer,
	)

	return transactionsContract
}

export const TransactionsProvider = ({ children }) => {
	// Get data from item field in front end to transaction context
	const [formData, setformData] = useState({
		addressTo: "",
		amount: "",
		keyword: "",
		message: "",
	})

	const [currentAccount, setCurrentAccount] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [transactionCount, setTransactionCount] = useState(
		localStorage.getItem("transactionCount"),
	)
	const [transactions, setTransactions] = useState([])

	// Update form data
	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }))
	}

	const getAllTransactions = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract()

				const availableTransactions =
					await transactionsContract.getAllTransactions()

				const structuredTransactions = availableTransactions.map(
					(transaction) => ({
						addressTo: transaction.receiver,
						addressFrom: transaction.sender,
						timestamp: new Date(
							transaction.timestamp.toNumber() * 1000,
						).toLocaleString(),
						message: transaction.message,
						keyword: transaction.keyword,
						amount: parseInt(transaction.amount._hex) / 10 ** 18,
					}),
				)

				console.log(structuredTransactions)

				setTransactions(structuredTransactions)
			} else {
				console.log("Ethereum is not present")
			}
		} catch (error) {
			console.log(error)
		}
	}

	// check if ethereum object is present
	const checkIfWalletIsConnect = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.")

			const accounts = await ethereum.request({ method: "eth_accounts" })

			if (accounts.length) {
				setCurrentAccount(accounts[0])

				getAllTransactions()
			} else {
				console.log("No accounts found")
			}
		} catch (error) {
			console.log(error)
		}
	}

	const checkIfTransactionsExists = async () => {
		try {
			if (ethereum) {
				const transactionsContract = createEthereumContract()
				const currentTransactionCount =
					await transactionsContract.getTransactionCount()

				window.localStorage.setItem("transactionCount", currentTransactionCount)
			}
		} catch (error) {
			console.log(error)

			throw new Error("No ethereum object")
		}
	}

	// connect wallet
	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("Please install MetaMask.")

			const accounts = await ethereum.request({
				method: "eth_requestAccounts",
			})

			setCurrentAccount(accounts[0])
		} catch (error) {
			console.log(error)

			throw new Error("No ethereum object")
		}
	}

	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("Please connect to metamask")

			const { addressTo, amount, keyword, message } = formData
			const transactionsContract = createEthereumContract()
			const parsedAmount = ethers.utils.parseEther(amount)

			// Send ethereum from one address to another
			await ethereum.request({
				method: "eth_sendTransaction",
				params: [
					{
						from: currentAccount,
						to: addressTo,
						gas: "0x5208",
						value: parsedAmount._hex,
					},
				],
			})

			const transactionHash = await transactionsContract.addToBlockchain(
				addressTo,
				parsedAmount,
				message,
				keyword,
			)

			console.log(transactionHash)

			setIsLoading(true)
			console.log(`Loading - ${transactionHash.hash}`)
			await transactionHash.wait()
			console.log(`Success - ${transactionHash.hash}`)
			setIsLoading(false)

			const transactionsCount = await transactionsContract.getTransactionCount()

			setTransactionCount(transactionsCount.toNumber())
		} catch (error) {
			console.log(error)

			throw new Error("No ethereum object")
		}
	}

	useEffect(() => {
		checkIfWalletIsConnect()
		checkIfTransactionsExists()
	}, [transactionCount])

	return (
		<TransactionContext.Provider
			value={{
				transactionCount,
				connectWallet,
				transactions,
				currentAccount,
				isLoading,
				sendTransaction,
				handleChange,
				formData,
			}}>
			{children}
		</TransactionContext.Provider>
	)
}
