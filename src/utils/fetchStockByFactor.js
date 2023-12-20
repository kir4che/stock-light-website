const fetchStockByFactor = async ({ factor, industry, setIsLoading }) => {
	if (factor === null || industry === null) throw new Error('Factor or Industry is NULL!')

	setIsLoading(true)

	try {
		const response = await fetch(`${process.env.DB_URL}/api/stock/picking/${factor}/${industry}`, {
			method: 'GET',
		})

		const data = await response.json()
		if (data.success) {
			setIsLoading(false)
			return [...new Map(data.data.map((item) => [item.stock_id, item])).values()]
		} else return []
	} catch (error) {
		console.error('Error:', error)
	}
}

export default fetchStockByFactor
