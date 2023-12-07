import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'
import NewsPost from '@/components/ui/NewsPost'
import fetchStockNews from '@/utils/fetchStockNews'

export default function StockNews({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [news, setNews] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			setNews(await fetchStockNews({ stockId, setIsLoading }))
		}

		fetchData()
	}, [stockId])

	return (
		<section className='w-full gap-4 py-4 space-y-4'>
			{!isLoading ? (
				news && news.length > 0 ? (
					news.map((newsItem, index) => <NewsPost news={newsItem} key={index} />)
				) : (
					<p className='font-medium tracking-wider text-stock_red'>暫無相關新聞...</p>
				)
			) : (
				<Loading />
			)}
		</section>
	)
}
