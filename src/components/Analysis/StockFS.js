import { useEffect, useState } from 'react'

export default function StockFS(stockId) {
	const [isLoading, setIsLoading] = useState(true)
	const [bs, setBS] = useState(null) // 資產負債表
	const [is, setIS] = useState(null) // 損益表
	const [cf, setCF] = useState(null) // 現金流量表

	const fetchStockBS = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/balance_sheet/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setBS(data.data)
			console.log('data', data)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockIS = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/income_statement/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setIS(data.data)
			console.log('data', data)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockCF = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/cash_flow_statement/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setCF(data.data)
			console.log('data', data)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		fetchStockBS(stockId.stockId)
		fetchStockIS(stockId.stockId)
		fetchStockCF(stockId.stockId)
	}, [stockId])

	return (
		<>
			<div>Stock News</div>
		</>
	)
}
