import ArticleIcon from '@mui/icons-material/Article'
import CampaignIcon from '@mui/icons-material/Campaign'
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
				`https://newsapi.org/v2/top-headlines?category=business&pageSize=5&sortBy=publishedAt&apiKey=${process.env.NEXT_PUBLIC_NEWS_API_KEY2}`,
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
		<div className='hidden w-64 space-y-12 md:block'>
			<SidebarBlock icon={<ArticleIcon />} title={'理財新聞'} data={[]} />
			<SidebarBlock icon={<CampaignIcon />} title={'股市公告'} data={[]} />
			<SidebarBlock icon={<InfoIcon />} title={'版本資訊'} data={versionInfo} />
		</div>
	)
}
