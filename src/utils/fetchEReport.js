const fetchEReport = async ({ stockId, setIsLoading }) => {
	setIsLoading(true)

	try {
		const responce = await fetch(`${process.env.DB_URL}/api/stock/history/financial_statement/${stockId}`, {
			method: 'GET',
		})
		const data = await responce.json()

		if (data.success) {
			setIsLoading(false)
			return data.data
		}
	} catch (error) {
		console.error('Error: ', error)
	}
}

export default fetchEReport
