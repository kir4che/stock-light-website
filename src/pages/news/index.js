import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import NewsPost from '../../components/News/NewsPost/NewsPost'
import PaginationLink from '../../components/News/PaginationLink/PaginationLink'
import NewsSidebar from '../../components/News/Sidebar/Sidebar'

export default function News() {
	const router = useRouter()
	const { page } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [allNews, setAllNews] = useState(null)
	const [hotNews, setHotNews] = useState(null)
	const [totalPages, setTotalPages] = useState(1)
	const [newsByKeyword, setNewsByKeyword] = useState(null)

	const currentDate = new Date()
	const newsPerPage = 10 // 每頁顯示幾筆資料

	// 取得所有新聞
	const fetchAllNews = async () => {
		const offset = (parseInt(String(page)) - 1) * newsPerPage

		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?category=business&page=${offset}&pageSize=${newsPerPage}&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY2}`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setAllNews(data.articles)
			localStorage.setItem('allNews', JSON.stringify(data.articles))

			// 計算並設定總頁數
			setTotalPages(Math.ceil(data.totalResults / newsPerPage))
		} catch (error) {
			console.log('error', error)
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
				`https://newsapi.org/v2/everything?q=stock&pageSize=5&sortBy=popularity&from=${fromDate}&to=${toDate}&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY2}`,
				{ method: 'GET' }
			)
			const data = await response.json()
			localStorage.setItem('hotNews', JSON.stringify(data.articles))
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		// 從 localStorage 中取出上個月更新的熱門新聞
		const storedHotNews = localStorage.getItem('hotNews')
		if (storedHotNews) setHotNews(JSON.parse(storedHotNews))
		if (!storedHotNews) setHotNews(currentDate)
	}, [])

	useEffect(() => {
		setIsLoading(true)
		// 每個月 1 號更新熱門新聞
		const lastFetchedMonth = parseInt(localStorage.getItem('lastFetchedMonth'))
		if (lastFetchedMonth !== currentDate.getMonth() && currentDate.getDate() === 1) {
			fetchHotNews(currentDate)
			localStorage.setItem('lastFetchedMonth', currentDate.getMonth().toString())
		}

		if (!newsByKeyword) fetchAllNews()

		setIsLoading(false)
	}, [page, newsByKeyword])

	return (
		<div className='flex flex-col items-center px-4 py-5 md:px-0 lg:py-10'>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				{!isLoading ? (
					<div className='w-full space-y-10'>
						{newsByKeyword || allNews ? (
							(newsByKeyword || allNews).map((news, index) => <NewsPost news={news} key={index} />)
						) : (
							<p>No news available.</p>
						)}
					</div>
				) : (
					<Loading />
				)}
				<NewsSidebar hotNews={hotNews} setNewsByKeyword={setNewsByKeyword} setTotalPages={setTotalPages} />
			</div>
			<PaginationLink totalPages={totalPages} />
		</div>
	)
}
