import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import InfoIcon from '@mui/icons-material/Info'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { versionInfo } from '../../data/versionInfo'
import SidebarBlock from './SidebarBlock2'

export default function HomeSidebar() {
	const [news, setNews] = useState(null)

	const fetchNews = async () => {
		try {
			const response = await fetch(
				`https://newsapi.org/v2/top-headlines?category=business&pageSize=5&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setNews(data.articles)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		fetchNews()
	})

	return (
		<div className='hidden w-56 max-w-sm md:block'>
			{news && (
				<>
					<SidebarBlock
						icon={<NewspaperIcon className='text-zinc-800 dark:text-zinc-800' />}
						title={'理財新聞'}
						data={news}
					/>
					<Link href='/news' className='flex items-center justify-end mt-4 mb-10 text-sm'>
						<ArrowRightIcon className='text-secondary_blue dark:text-secondary_blue' />
						<span>看更多</span>
					</Link>
				</>
			)}
			<SidebarBlock
				icon={<InfoIcon className='text-zinc-800 dark:text-zinc-800' />}
				title={'版本資訊'}
				data={versionInfo}
			/>
		</div>
	)
}
