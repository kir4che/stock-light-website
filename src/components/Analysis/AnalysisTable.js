import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import fetchEReport from '@/utils/fetchEReport'
import fetchStockNews from '@/utils/fetchStockNews'

export default function AnalysisTable({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [fsData, setFsData] = useState({
		assetStatements: [],
		liabilityEquityStatements: [],
		eReport: [],
	})
	const [sentimentData, setSentimentData] = useState([])
	const [newsData, setNewsData] = useState([])

	const fetchSentimentData = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/sentiment_analysis/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			if (data.success) {
				setSentimentData(data.data)
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	const Sentiment_icon = (sentiment) => {
		if (sentiment === '正面') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
					alt='external-sunny-weather-justicon-flat-justicon'
				/>
			)
		} else if (sentiment === '中性') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
					alt='external-cloudy-weather-kmg-design-flat-kmg-design-1'
				/>
			)
		} else if (sentiment === '負面') {
			return (
				<img
					width='48'
					height='48'
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
					alt='external-rainy-weather-justicon-flat-justicon-1'
				/>
			)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			setFsData({ eReport: await fetchEReport({ stockId, setIsLoading }) })
			setNewsData(await fetchStockNews({ stockId, setIsLoading }))
		}
		fetchData()
		fetchSentimentData()
	}, [stockId])

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex items-start justify-between gap-8'>
				{/* 情緒分析 */}
				{sentimentData && (
					<section className='w-3/4 p-4 space-y-2 border rounded-lg shadow'>
						<h3 className='flex items-center'>情緒分析</h3>
						{sentimentData.map((item) => (
							<div key={item.title}>
								<p>{item.score}</p>
								{Sentiment_icon(item.sentiment)}
								<p className='font-bold'>{item.title}</p>
								<p>{item.description}</p>
							</div>
						))}
						<div className='flex flex-col gap-5'>
							<div className='flex items-center gap-2'>
								<Image
									src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
									width={48}
									height={48}
									alt='external-sunny-weather-justicon-flat-justicon'
								/>
								<span className='font-bold'>正面</span>
							</div>
							<div className='flex items-center gap-2'>
								<Image
									src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
									width={48}
									height={48}
									alt='external-cloudy-weather-kmg-design-flat-kmg-design-1'
								/>
								<span className='font-bold'>中立</span>
							</div>
							<div className='flex items-center gap-2'>
								<Image
									src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
									width={48}
									height={48}
									alt='external-rainy-weather-justicon-flat-justicon-1'
								/>
								<span className='font-bold'>負面</span>
							</div>
						</div>
					</section>
				)}
				{/* 相關新聞 */}
				{newsData && (
					<section className='w-1/3 h-64 p-4 space-y-2 overflow-y-scroll border rounded-lg shadow '>
						<h3 className='flex items-center'>相關新聞</h3>
						<ul className='flex flex-col pl-4 leading-4 list-disc gap-y-1'>
							{newsData.map((news) => (
								<li>
									<Link
										href={news.link}
										target='_blank'
										rel='noopener noreferrer'
										className='text-sm text-blue-500 hover:font-medium hover:underline'
										key={news.title}
									>
										{news.title}
									</Link>
								</li>
							))}
						</ul>
					</section>
				)}
			</div>
			{/* 歷年財務報表 */}
			{fsData.eReport && (
				<section className='p-4 space-y-2 border rounded-lg shadow'>
					<h5 className='flex items-center font-medium'>歷年財務報表</h5>
					<div className='flex flex-wrap gap-x-4 gap-y-2'>
						{fsData.eReport.map((report, index) => (
							<Link
								href={report.link}
								target='_blank'
								rel='noopener noreferrer'
								className='text-sm text-blue-500 hover:font-medium hover:underline'
							>
								{report.year} 年第 {report.season} 季財務報表
							</Link>
						))}
					</div>
				</section>
			)}
		</div>
	)
}
