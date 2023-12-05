import Loading from '@/components/common/Loading'
import NewsPost from '@/components/ui/NewsPost'
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

			if (data.success) setIsLoading(false)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchStockNews(stockId.stockId)
	}, [stockId])

	return (
		<section className='w-full gap-4 py-4 space-y-4'>
			{!isLoading ? (
				news && news.length > 0 ? (
					news.map((newsItem, index) => <NewsPost news={newsItem} key={index} />)
				) : (
					<p className='text-stock_red dark:text-zinc-100'>No news available...</p>
				)
			) : (
				<Loading />
			)}
		</section>
	)
}
