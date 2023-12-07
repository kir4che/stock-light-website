import sentiments from '@/data/sentiments.json'
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import fetchEReport from '@/utils/fetchEReport'
import fetchStockNews from '@/utils/fetchStockNews'

export default function AnalysisTable({ stockId }) {
	const [isLoading, setIsLoading] = useState(true)
	const [sentimentOpen, setSentimentOpen] = useState(false)

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

			if (!data.success) setSentimentData(sentiments.rows.filter((item) => item.stock_id === stockId))

			const filteredData = data.data.filter((item) => item.stock_id === stockId)

			if (data.success) {
				setSentimentData(filteredData)
				setIsLoading(false)
			}
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
	}, [])

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
										<p className='text-sm font-light line-clamp-1 text-zinc-500 dark:text-zinc-400'>
											{item.description}
										</p>
									</div>
								</div>
							))}
						</div>
						<button
							className='self-end px-4 text-white rounded-full hover:bg-sky-500 bg-secondary_blue'
							onClick={() => {
								setSentimentOpen(true)
							}}
						>
							查看更多
						</button>
						<Dialog open={sentimentOpen} maxWidth='md' fullWidth onClose={() => setSentimentOpen(false)}>
							<CloseIcon
								className='absolute cursor-pointer top-3 right-3 dark:text-zinc-100 opacity-80 hover:opacity-60'
								onClick={() => setSentimentOpen(false)}
							/>
							<DialogTitle className='text-2xl dark:bg-zinc-800 dark:text-zinc-100'>情緒分析</DialogTitle>
							<DialogContent className='dark:bg-zinc-800 dark:text-zinc-100'>
								<Chart
									option={{
										radar: {
											indicator: sentimentData.map((item) => ({
												name: item.title.length > 10 ? item.title.substring(0, 20) + '...' : item.title,
												max: 1,
											})),
											axisLabel: {
												show: true,
												showMaxLabel: true,
												showMinLabel: true,
												fontSize: 10,
											},
										},
										series: [
											{
												name: '情感分析',
												type: 'radar',
												data: [
													{
														value: sentimentData.map((item) => item.score),
														name: '情感分數',
													},
												],
											},
										],
									}}
									customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
								/>
								{sentimentData.map((item) => (
									<div className='flex items-center space-y-6 gap-x-3' key={item.title}>
										{sentimentIcon(item.sentiment)}
										<div>
											<p className='mb-1.5 space-x-2 font-medium leading-6'>
												<span>{item.title}</span>
												<button className='w-10 text-sm rounded dark:text-zinc-800 bg-primary_yellow'>
													{item.score}
												</button>
											</p>
											<p className='text-sm font-light leading-7 text-zinc-500 dark:text-zinc-400'>
												{item.description}
											</p>
										</div>
									</div>
								))}
							</DialogContent>
						</Dialog>
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
