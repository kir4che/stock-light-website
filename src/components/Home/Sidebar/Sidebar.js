import { useEffect, useState } from 'react'
import { InfoCircleFill, Newspaper } from 'react-bootstrap-icons'
import SidebarBlock from '../../SidebarBlock/SidebarBlock2'

export default function HomeSidebar() {
	const versionInfo = [
		{
			title: 'v0.2 版本上線',
			url: '/version',
		},
	]

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
	}, [])

	return (
		<div className='hidden w-56 max-w-sm space-y-10 md:block'>
			<SidebarBlock icon={<Newspaper size={20} />} title={'理財新聞'} data={news} />
			<SidebarBlock icon={<InfoCircleFill size={20} />} title={'版本資訊'} data={versionInfo} />
		</div>
	)
}
