import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { candlestickOption } from '@/components/Chart/options/candlestickOption'
import Loading from '@/components/common/Loading'

export default function TaiexChart() {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState({ dates: [], prices: [] })

	const fetchTaiex = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/taiex/all`, { method: 'GET' })
			let data = await response.json()

			const dates = data.map((item) => item.date.split('T')[0]).reverse()
			const prices = data
				.reverse()
				.map(({ closing_index, opening_index, lowest_index, highest_index }) => [
					closing_index,
					opening_index,
					lowest_index,
					highest_index,
				])

			setData({ dates, prices })

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
			{!isLoading && data ? (
				<Chart option={candlestickOption(data.dates, data.prices)} customHeight='h-72 md:h-80 xl:h-[480px]' />
			) : (
				<Loading />
			)}
		</>
	)
}
