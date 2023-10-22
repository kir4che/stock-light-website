import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import NewsSidebar from '@/components/News/NewsSidebar'
import PaginationLink from '@/components/News/PaginationLink'

export default function News() {
	const router = useRouter()
	const { page } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [allNews, setAllNews] = useState(null)
	// const [newsTags, setNewsTags] = useState(null)
	const [hotNews, setHotNews] = useState(null)
	const [newsByKeyword, setNewsByKeyword] = useState(null)

	const currentDate = new Date() // Sun Oct 22 2023 16:32:25 GMT+0800 (中部標準時間)
	const newsPerPage = 1 // 每頁顯示幾筆資料

	// 取得所有新聞
	const fetchAllNews = async () => {
		const offset = (parseInt(String(page)) - 1) * newsPerPage

		try {
			const response = await fetch(
				`https://gnews.io/api/v4/top-headlines?category=business&country=tw&page=${offset}&max=${newsPerPage}&apikey=${process.env.GNEWS_API_KEY}`,
				{ method: 'GET' }
			)
			const data = await response.json()

			setAllNews(data.articles)
			localStorage.setItem('allNews', JSON.stringify(data.articles))
		} catch (error) {
			console.error('error', error)
		}
	}

	// 取得熱門新聞
	const fetchHotNews = async (currentDate) => {
		const aMonthAgo = new Date(currentDate)
		aMonthAgo.setMonth(currentDate.getMonth() - 1)
		const fromDate = aMonthAgo.toISOString().split('T')[0]
		const toDate = currentDate.toISOString().split('T')[0]

		try {
			const response = await fetch(
				`https://gnews.io/api/v4/search?q=股&country=tw&max=5&sortBy=relevance&from=${fromDate}&to=${toDate}&apikey=${process.env.GNEWS_API_KEY}`,
				{ method: 'GET' }
			)
			const data = await response.json()

			setHotNews(data.articles)
			localStorage.setItem('hotNews', JSON.stringify(data.articles))
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		if (!newsByKeyword) fetchAllNews()

		// 從 localStorage 中取出上個月更新的熱門新聞
		const storedHotNews = localStorage.getItem('hotNews')
		console.log('storedHotNews', storedHotNews)
		if (storedHotNews !== null) setHotNews(JSON.parse(storedHotNews))
		else fetchHotNews(currentDate)

		// 每個月 1 號更新熱門新聞
		const lastFetchedMonth = parseInt(localStorage.getItem('lastFetchedMonth'))
		if (lastFetchedMonth !== currentDate.getMonth() && currentDate.getDate() === 1) {
			fetchHotNews(currentDate)
			localStorage.setItem('lastFetchedMonth', currentDate.getMonth().toString())
		}

		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
	}, [])

	useEffect(() => {
		setIsLoading(true)

		if (newsByKeyword) fetchAllNews()

		setTimeout(() => {
			setIsLoading(false)
		}, 1000)
	}, [newsByKeyword])

	return (
		<div className='flex flex-col items-center px-4 pt-10 pb-8 md:px-0'>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				{/* {!isLoading ? (
					<div className='w-full space-y-10'>
						{newsByKeyword && newsByKeyword.length > 0 ? (
							newsByKeyword.map((news, index) => <NewsPost news={news} key={index} />)
						) : allNews && allNews.length > 0 ? (
							allNews.map((news, index) => <NewsPost news={news} key={index} />)
						) : (
							<p className='text-stock_red'>No news available.</p>
						)}
					</div>
				) : (
					<Loading />
				)} */}
				{hotNews && hotNews.length > 0 && <NewsSidebar hotNews={hotNews} setNewsByKeyword={setNewsByKeyword} />}
			</div>
			{!newsByKeyword ? <PaginationLink totalPages={10} /> : null}
		</div>
	)
}
