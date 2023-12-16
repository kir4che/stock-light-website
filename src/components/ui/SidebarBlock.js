import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SidebarBlock({ icon, title }) {
	const [todayNews, setTodayNews] = useState(null)

	const fetchTodayNews = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/news/today`, { method: 'GET' })
			const data = await response.json()
			setTodayNews(data.data)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchTodayNews()
	}, [])

	return (
		<div className='space-y-6'>
			<div className='flex items-center pb-2.5 space-x-2 border-b-[3px] border-b-primary_yellow'>
				{icon}
				<h5>{title}</h5>
			</div>
			<ul className='space-y-3'>
				{todayNews &&
					todayNews.slice(0, 5).map((news, index) => (
						<li key={index}>
							<Link href={news.link} target='_blank' className='underline hover:text-zinc-500 dark:hover:text-zinc-300'>
								{news.title}
							</Link>
							<hr className='mt-3' />
						</li>
					))}
			</ul>
		</div>
	)
}
