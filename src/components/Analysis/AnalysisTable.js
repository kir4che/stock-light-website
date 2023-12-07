import sentiments from '@/data/sentiments.json'
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
			} else setSentimentData(sentiments.rows)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	const sentimentIcon = (sentiment) => {
		if (sentiment === '正面') {
			return (
				<Image
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-sunny-weather-justicon-flat-justicon.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
					alt='external-sunny-weather-justicon-flat-justicon'
				/>
			)
		} else if (sentiment === '中性') {
			return (
				<Image
					src='https://img.icons8.com/external-kmg-design-flat-kmg-design/48/external-cloudy-weather-kmg-design-flat-kmg-design-1.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
					alt='external-cloudy-weather-kmg-design-flat-kmg-design-1'
				/>
			)
		} else if (sentiment === '負面') {
			return (
				<Image
					src='https://img.icons8.com/external-justicon-flat-justicon/48/external-rainy-weather-justicon-flat-justicon-1.png'
					width={100}
					height={100}
					className='object-contain w-12 h-16'
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
			<div className='flex items-start justify-between gap-6 h-80'>
				{/* 情緒分析 */}
				{sentimentData && (
					<section className='flex-col w-3/4 h-full gap-y-2.5 flex-center-between'>
						<div className='p-4 overflow-y-scroll border rounded-lg shadow dark:border-zinc-500 dark:bg-zinc-900/30'>
							<h3 className='mb-2'>情緒分析</h3>
							{sentimentData.slice(0, 3).map((item) => (
								<div className='flex items-center space-y-4 gap-x-2' key={item.title}>
									{sentimentIcon(item.sentiment)}
									<div>
										<p className='mb-1.5 space-x-2 font-medium leading-6'>
											<span>{item.title}</span>
											<button className='w-10 text-sm rounded dark:text-zinc-800 bg-primary_yellow'>
												{item.score}
											</button>
										</p>
										<p className='text-sm font-light line-clamp-2 text-zinc-500 dark:text-zinc-400'>
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
						<button className='self-end px-4 border rounded-full'>查看更多</button>
					</section>
				)}
				{/* 相關新聞 */}
				{newsData && (
					<section className='w-1/3 h-full p-4 space-y-2 overflow-y-auto border rounded-lg shadow dark:border-zinc-500 dark:bg-zinc-900/30 '>
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
				<section className='p-4 space-y-2 border rounded-lg shadow dark:border-zinc-500 dark:bg-zinc-900/30'>
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
