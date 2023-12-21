import { convertDateTime } from '@/utils/convertDateTime'

const fetchStockData = async ({ stockId, setIsLoading }) => {
	setIsLoading(true)

	try {
		const response = await fetch(`${process.env.DB_URL}/api/stock/all/info?stock_id=${stockId}`, {
			method: 'GET',
		})

		const data = await response.json()
		if (data.success) {
			let stockData = data.data.reverse()

			const dates = stockData((stock) => convertDateTime(stock.date).split(' ')[0])
			const closingPrices = stockData((stock) => stock.closing_price)
			const openingPrices = stockData((stock) => stock.opening_price)
			const highestPrices = stockData((stock) => stock.highest_price)
			const lowestPrices = stockData((stock) => stock.lowest_price)
			const changes = stockData((stock) => stock.change)
			const volumes = stockData((stock) => stock.trade_volume)

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
