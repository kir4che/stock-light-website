import ArticleIcon from '@mui/icons-material/Article'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'
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
				`https://newsapi.org/v2/top-headlines?category=business&pageSize=5&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY2}`,
				{ method: 'GET' }
			)
			const data = await response.json()
			setNews(data.articles)
		} catch (error) {
			console.log('error', error)
		}
	}

	useEffect(() => {
		// fetchNews()
	}, [])

	return (
		<div className='hidden space-y-10 w-80 md:block'>
			<SidebarBlock icon={<ArticleIcon />} title={'理財新聞'} data={news} />
			<SidebarBlock icon={<InfoIcon />} title={'版本資訊'} data={versionInfo} />
		</div>
	)
}
