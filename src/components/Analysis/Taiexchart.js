import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { candlestickOption } from '@/components/Chart/options/candlestickOption'
import Loading from '@/components/common/Loading'

export default function TaiexChart() {
	const [isLoading, setIsLoading] = useState(true)

	const [dateData, setDateData] = useState([])
	const [priceData, setPriceData] = useState([])

	const fetchTaiex = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/taiex/all`, { method: 'GET' })
			let data = await response.json()

			const dates = data.map((item) => item.date.split('T')[0]).reverse()
			setDateData(dates)

			const closingIndexs = data.map((item) => item.closing_index).reverse()
			const openingIndexs = data.map((item) => item.opening_index).reverse()
			const lowestIndexs = data.map((item) => item.lowest_index).reverse()
			const highestIndexs = data.map((item) => item.highest_index).reverse()

			const combinedArray = highestIndexs.map((_, index) => [
				closingIndexs[index],
				openingIndexs[index],
				lowestIndexs[index],
				highestIndexs[index],
			])
			setPriceData(combinedArray)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchTaiex()
	}, [])

	return (
		<>
			<h4 className='mt-6 mb-3'>台股大盤加權指數走勢</h4>
			{!isLoading && dateData && priceData ? (
				<Chart option={candlestickOption(dateData, priceData)} customHeight='h-72 md:h-80 xl:h-[480px]' />
			) : (
				<Loading />
			)}
		</>
	)
}
