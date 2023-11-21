import NewsPost from '@/components/News/NewsPost'
import Loading from '@/components/common/Loading'
import { useEffect, useState } from 'react'

export default function StockNews(stockId) {
	const [isLoading, setIsLoading] = useState(true)

	const [news, setNews] = useState(null)

	const fetchStockNews = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/news/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setNews(data.data)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		fetchStockNews(stockId.stockId)
	}, [stockId])

	return (
		<section className='w-full mt-4'>
			{!isLoading ? (
				news && news.length > 0 ? (
					news.map((news, index) => <NewsPost news={news} key={index} />)
				) : (
					<p className='text-stock_red dark:text-zinc-100'>No news available...</p>
				)
			) : (
				<Loading />
			)}
		</section>
	)
}
