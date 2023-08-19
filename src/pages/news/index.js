// @ts-nocheck
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Loading from '../../components/Loading/Loading'
import PaginationLink from '../../components/News/PaginationLink/PaginationLink'
import NewsSidebar from '../../components/News/Sidebar/Sidebar'

export default function News() {
	const router = useRouter()
	const { page } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [allNews, setAllNews] = useState(null)
	const [hotNews, setHotNews] = useState(null)
	const [newsByKeyword, setNewsByKeyword] = useState(null) // 新闻关键字搜索结果

	const newsPerPage = 1 // 每頁顯示幾筆資料

	const updateNewsByKeyword = (data) => setNewsByKeyword(data)

	const fetchAllNews = async () => {
		const offset = page * newsPerPage

		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?category=business&page=${offset}&pageSize=${newsPerPage}&sortBy=publishedAt&apiKey=d65cd2341b4b4b06a3f8bb45215b997d`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setAllNews(data.articles)
		} catch (error) {
			console.log('error', error)
		}
	}

	const fetchHotNews = async (currentDate) => {
		const aMonthAgo = new Date(currentDate)
		aMonthAgo.setMonth(currentDate.getMonth() - 1)
		const fromDate = aMonthAgo.toISOString().split('T')[0]
		const toDate = currentDate.toISOString().split('T')[0]

		try {
			const response = await fetch(
				`https://newsapi.org/v2/everything?q=stock&pageSize=5&sortBy=popularity&from=${fromDate}&to=${toDate}&apiKey=d65cd2341b4b4b06a3f8bb45215b997d`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setHotNews(data.articles)

			localStorage.setItem('hotNews', JSON.stringify(data.articles))
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		console.log(newsByKeyword)

		const currentDate = new Date()
		// 每個月 1 號更新熱門新聞
		if (currentDate.getDate() === 1) fetchHotNews(currentDate)

		if (!newsByKeyword) fetchAllNews()

		setIsLoading(false)
	}, [page, newsByKeyword])

	return (
		<div className='flex flex-col items-center px-4 py-5 md:px-0 lg:py-10'>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				{!isLoading ? (
					<article className='w-full space-y-12'>
						{newsByKeyword
							? newsByKeyword.map((news, index) => (
									<div key={index}>
										<Link href={news.url} target='_blank'>
											<h4 className='mb-2 font-bold hover:text-zinc-300'>{news.title}</h4>
											<p className='w-full mb-6 leading-7 opacity-80 line-clamp-2'>{news.description}</p>
										</Link>
										<p className='text-secondary_blue/75 dark:text-secondary_blue'>
											{new Date(news.publishedAt).toISOString().split('T')[0]}｜{news.source.name}
										</p>
									</div>
							  ))
							: allNews.map((news, index) => (
									<div key={index}>
										<Link href={news.url} target='_blank'>
											<h4 className='mb-2 font-bold hover:text-zinc-300'>{news.title}</h4>
											<p className='w-full mb-6 leading-7 opacity-80 line-clamp-2'>{news.description}</p>
										</Link>
										<p className='text-secondary_blue/75 dark:text-secondary_blue'>
											{new Date(news.publishedAt).toISOString().split('T')[0]}｜{news.source.name}
										</p>
									</div>
							  ))}
					</article>
				) : (
					<Loading />
				)}
				<NewsSidebar hotNews={hotNews} updateNewsByKeyword={updateNewsByKeyword} />
			</div>
			{!newsByKeyword ? <PaginationLink totalPages={10} /> : null}
		</div>
	)
}
