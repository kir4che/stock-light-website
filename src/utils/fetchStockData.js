import { convertDateTime } from '@/utils/convertDateTime'

const fetchStockData = async ({ stockId, setIsLoading }) => {
	setIsLoading(true)

	try {
		const response = await fetch(`${process.env.DB_URL}/api/stock/all/info/${stockId}`, { method: 'GET' })
		const data = await response.json()

		console.log('test stock data', data)

		if (data.success) {
			const dates = data.data.map((stock) => convertDateTime(stock.date).split(' ')[0])
			const closingPrices = data.data.map((stock) => stock.closing_price)
			const openingPrices = data.data.map((stock) => stock.opening_price)
			const highestPrices = data.data.map((stock) => stock.highest_price)
			const lowestPrices = data.data.map((stock) => stock.lowest_price)
			const changes = data.data.map((stock) => stock.change)
			const volumes = data.data.map((stock) => stock.trade_volume)

			setIsLoading(false)

			console.log({
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
			})

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
