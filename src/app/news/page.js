'use client'

import CloseIcon from '@mui/icons-material/Close'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'

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

			if (data.success) {
				const sortedNews = data.data.sort((a, b) => {
					const dateA = new Date(a.time),
						dateB = new Date(b.time)
					return dateA > dateB
				})
				setAllNews(sortedNews)
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	const handleNewsSearch = () => {
		const filteredNews = allNews.filter((news) => news.title.toLowerCase().includes(keyword.toLowerCase()))
		setAllNews(filteredNews)
	}

	useEffect(() => {
		if (keyword === '') fetchAllNews()
	}, [keyword])

	useEffect(() => {
		console.log(allNews)
	}, [])

	return (
		<div className='flex flex-col px-4 py-8 md:px-0'>
			<h2 className='mb-12'>最新財經新聞</h2>
			<div className='flex w-full md:gap-12 xl:gap-24'>
				<section className='w-full space-y-5'>
					{!isLoading && allNews ? allNews.map((news, index) => <NewsPost news={news} key={index} />) : <Loading />}
				</section>
				<section className='hidden space-y-8 w-96 md:block'>
					<Paper component='form' className='flex relative items-center pl-3 py-1.5'>
						<InputBase
							placeholder='Search'
							value={keyword}
							onChange={(e) => setKeyword(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									e.preventDefault()
									handleNewsSearch()
								}
							}}
						/>
						{keyword && (
							<CloseIcon
								fontSize='small'
								className='absolute mr-1 cursor-pointer text-zinc-800 dark:text-zinc-800 right-9 hover:opacity-80'
								onClick={() => setKeyword('')}
							/>
						)}
						<SearchIcon
							className='absolute cursor-pointer text-zinc-800 dark:text-zinc-800 right-3 hover:opacity-80'
							onClick={() => handleNewsSearch}
						/>
					</Paper>
					<SidebarBlock icon={<RocketLaunchIcon className='dark:text-white' />} title={'今日熱點'} />
				</section>
			</div>
		</div>
	)
}
