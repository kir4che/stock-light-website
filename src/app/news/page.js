'use client'

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { useEffect, useState } from 'react'

import SearchInput from '@/components/News/SearchInput'
import Loading from '@/components/common/Loading'
import NewsPost from '@/components/ui/NewsPost'
import SidebarBlock from '@/components/ui/SidebarBlock'

export default function News() {
	const [isLoading, setIsLoading] = useState(true)
	const [allNews, setAllNews] = useState([])

	const [keyword, setKeyword] = useState('')

	const fetchAllNews = async () => {
		setIsLoading(true)

		try {
			const response = await fetch(`${process.env.DB_URL}/api/news/all`, { method: 'GET' })
			const data = await response.json()
			console.log('AllNews', data)

			if (data.success) {
				const sortedNews = data.data.sort((a, b) => {
					const dateA = parseInt(a.time),
						dateB = parseInt(b.time)
					return dateA - dateB
				})
				setAllNews(sortedNews)
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchAllNews()
	}, [])

	return (
		<div className='flex flex-col px-4 py-8 md:px-0'>
			<h2 className='mb-12'>最新財經新聞</h2>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				<section className='w-full space-y-5'>
					{!isLoading ? allNews.map((news, index) => <NewsPost news={news} key={index} />) : <Loading />}
				</section>
				<section className='hidden space-y-8 w-96 md:block'>
					<SearchInput allNews={allNews} keyword={keyword} setKeyword={setKeyword} setNews={setAllNews} />
					<SidebarBlock icon={<RocketLaunchIcon className='dark:text-white' />} title={'今日熱點'} />
				</section>
			</div>
		</div>
	)
}
