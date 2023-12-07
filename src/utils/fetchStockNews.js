const fetchStockNews = async ({ stockId, setIsLoading }) => {
	setIsLoading(true)

	try {
		const response = await fetch(`${process.env.DB_URL}/api/stock/news/${stockId}`, {
			method: 'GET',
		})
		const data = await response.json()

		if (data.success) {
			setIsLoading(false)
			return data.data
		}
	} catch (error) {
		console.error('Error: ', error)
		return []
	}
}

export default fetchStockNews
