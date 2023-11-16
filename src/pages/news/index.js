'use client'

import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import Pagination from '@mui/material/Pagination'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import NewsPost from '@/components/News/NewsPost'
import SearchInput from '@/components/News/SearchInput'
import Loading from '@/components/common/Loading'
import SidebarBlock from '@/components/ui/SidebarBlock'

export default function News() {
	const router = useRouter()
	const { page } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [allNews, setAllNews] = useState([])
	const [paginatedNews, setPaginatedNews] = useState([])

	const [keyword, setKeyword] = useState('')

	const newsPerPage = 8,
		totalPages = 10

	const fetchAllNews = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/news/all`, { method: 'GET' })
			const data = await response.json()
			const sortedNews = data.data.sort((a, b) => {
				const dateA = parseInt(a.time),
					dateB = parseInt(b.time)
				return dateA - dateB
			})
			setAllNews(sortedNews)
			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchAllNews()
	}, [page])

	useEffect(() => {
		const startIndex = ((parseInt(page) || 1) - 1) * newsPerPage
		const endIndex = startIndex + newsPerPage
		const paginatedNews = allNews.slice(startIndex, endIndex)
		setPaginatedNews(paginatedNews)
	}, [page, isLoading, allNews])

	const handlePageChange = (event, value) => {
		router.push({
			pathname: '/news',
			query: { page: value },
		})
	}

	return (
		<div className='flex flex-col px-4 py-8 md:px-0'>
			<h2 className='mb-12'>最新財經新聞</h2>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				<section className='w-full space-y-8'>
					{!isLoading ? (
						paginatedNews && paginatedNews.length > 0 ? (
							paginatedNews.map((news, index) => <NewsPost news={news} key={index} />)
						) : (
							<p className='text-stock_red dark:text-zinc-100'>No news available...</p>
						)
					) : (
						<Loading />
					)}
				</section>
				<section className='hidden space-y-8 w-96 md:block'>
					<SearchInput
						allNews={allNews}
						keyword={keyword}
						setKeyword={setKeyword}
						newsPerPage={newsPerPage}
						setPaginatedNews={setPaginatedNews}
					/>
					<SidebarBlock icon={<RocketLaunchIcon className='dark:text-white' />} title={'今日熱點'} />
				</section>
			</div>
			{!keyword && (
				<div className='w-full flex overflow-x-scroll flex-nowrap justify-center py-0.5 mt-20 mb-2 rounded bg-primary_yellow'>
					<Pagination page={parseInt(page) || 1} count={totalPages} onChange={handlePageChange} />
				</div>
			)}
		</div>
	)
}
