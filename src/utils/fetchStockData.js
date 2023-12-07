import { convertDateTime } from '@/utils/convertDateTime'

const fetchStockData = async ({ stockId, setIsLoading }) => {
	setIsLoading(true)

	try {
		const response = await fetch(`${process.env.DB_URL}/api/stock/all/info`, { method: 'GET' })
		let data = await response.json()

		if (data.success) {
			const filteredData = data.data
				.filter((stock) => stock.stock_id === stockId)
				.sort((a, b) => new Date(a.date) - new Date(b.date))

			const dates = filteredData.map((stock) => convertDateTime(stock.date).split(' ')[0])
			const closingPrices = filteredData.map((stock) => stock.closing_price)
			const openingPrices = filteredData.map((stock) => stock.opening_price)
			const highestPrices = filteredData.map((stock) => stock.highest_price)
			const lowestPrices = filteredData.map((stock) => stock.lowest_price)
			const changes = filteredData.map((stock) => stock.change)
			const volumes = filteredData.map((stock) => stock.trade_volume)

			setIsLoading(false)

			return {
				date: dates,
				price: highestPrices.map((_, index) => [
					closingPrices[index],
					openingPrices[index],
					lowestPrices[index],
					highestPrices[index],
				]),
				closePrice: closingPrices,
				highPrice: highestPrices,
				lowPrice: lowestPrices,
				change: changes,
				volume: volumes,
			}
		} else return null
	} catch (error) {
		console.error('Error: ', error)
	}
}

export default fetchStockData
