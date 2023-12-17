'use client'

import { getCurrentDate } from '@/utils/getCurrentDate'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Tab, Tabs } from '@mui/material'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { Suspense, useEffect, useState } from 'react'

import AnalysisTable from '@/components/Light/AnalysisTable'
import PrayerCard from '@/components/Light/PrayerCard'
import RagBot from '@/components/Light/RagBot'
import TodayLantern from '@/components/Light/TodayLantern'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import stock100 from '@/data/stock100.json'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import fetchStockData from '@/utils/fetchStockData'
import fetchStockPePb from '@/utils/fetchStockPePb'

function ResultDashboard() {
	const router = useRouter()
	const industry = useSearchParams().get('industry')
	const factor = useSearchParams().get('factor')

	const [isLoading, setIsLoading] = useState(true)
	const [laternOpen, setLaternOpen] = useState(false)

	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const [resultStockInfo, setResultStockInfo] = useState(null)
	const [stockPrice, setStockPrice] = useState({
		closePrice: [],
		change: [],
	})
	const [stockPePb, setStockPePb] = useState({
		pb: 0,
		pe: 0,
	})

	// 取得該產業符合因子的股票
	const fetchStockByFactor = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/picking/${factor}`, {
				method: 'GET',
			})
			const data = await response.json()

			if (data.success) {
				let stockByIndustry = stock100.filter((stock) => stock.industry === industry).map((stock) => stock.stock_id)
				let filteredData = data.data.filter(function (entry) {
					return stockByIndustry.includes(entry.stock_id)
				})
				let uniqueFilteredData = Array.from(new Set(filteredData.map((entry) => entry.stock_id))).map((stock_id) =>
					filteredData.find((entry) => entry.stock_id === stock_id)
				)
				setResultStockInfo(uniqueFilteredData.slice(0, 5))
				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	// 取得股票資料
	const fetchData = async (stockId) => {
		const pePbData = await fetchStockPePb({ stockId, setIsLoading })
		setStockPePb({
			pb: pePbData.p_b_ratio,
			pe: pePbData.p_e_ratio,
		})
		const stockData = await fetchStockData({ stockId, setIsLoading })
		setStockPrice({
			closePrice: [
				stockData.closePrice[stockData.closePrice.length - 1],
				stockData.closePrice[stockData.closePrice.length - 2],
			],
			change: [stockData.change[stockData.change.length - 1], stockData.change[stockData.change.length - 2]],
		})
	}

	useEffect(() => {
		router.onError = (err) => {
			const pattern = /Loading chunk (\d)+ failed/g
			const isChunkLoadFailed = err.message.match(pattern)
			const targetPath = router.history.pending.fullPath
			if (isChunkLoadFailed) router.replace(targetPath)
		}

		fetchStockByFactor()
	}, [])

	useEffect(() => {
		resultStockInfo && fetchData(resultStockInfo[selectedTabIndex].stock_id)
	}, [resultStockInfo])

	useEffect(() => {
		resultStockInfo && fetchData(resultStockInfo[selectedTabIndex].stock_id)
	}, [selectedTabIndex])

	return (
		<StarryBackground className='pt-6 pb-10'>
			<section className='flex-center-between'>
				<Breadcrumbs prevPage='我要點燈' prevPageLink='/light' curPage='個股分析儀表板' />
				<p className='text-xs text-white opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</section>
			<PrayerCard industry={industry} handleNextDialog={() => setLaternOpen(!laternOpen)} />
			<TodayLantern
				industry={industry}
				resultStock={resultStockInfo && resultStockInfo.map((item) => item.stock_id)}
				open={laternOpen}
				handleDialog={() => setLaternOpen(!laternOpen)}
			/>
			<div className='pb-10 rounded bg-sky-50 dark:bg-zinc-900/50'>
				<section className='flex items-baseline justify-between w-full px-4 pt-4 pb-3 tracking-wider sm:px-8 lg:px-10 bg-sky-100 dark:bg-zinc-800/60'>
					<h3 className='space-x-2 flex-center'>
						<sapn>本日光明燈</sapn>
						<span className='px-2 text-sm bg-white border-2 rounded-full dark:bg-zinc-900 border-secondary_blue text-secondary_blue'>
							{industry}
						</span>
					</h3>
					<p className='text-xs'>{getCurrentDate()}</p>
				</section>
				<Tabs
					variant='scrollable'
					value={selectedTabIndex}
					className='mb-4 rounded bg-sky-100 dark:bg-zinc-800/60'
					onChange={(e, index) => setSelectedTabIndex(index)}
				>
					{resultStockInfo &&
						resultStockInfo.map((item, index) => (
							<Tab
								label={stock100.find((stock) => stock.stock_id === item.stock_id)?.name || null}
								className={`${
									selectedTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
								} hover:bg-sky-300/10 `}
								key={index}
							/>
						))}
				</Tabs>
				{resultStockInfo && (
					<section className='px-4 mb-4 sm:px-8 lg:px-10'>
						<h4 className='inline-flex items-baseline px-2 mb-2 space-x-2 rounded-lg dark:text-zinc-800 bg-primary_yellow'>
							<span>
								{stock100.find((stock) => stock.stock_id === resultStockInfo[selectedTabIndex].stock_id)?.name || null}
							</span>
							<span className='text-lg font-light tracking-widest'>{resultStockInfo[selectedTabIndex].stock_id}</span>
						</h4>
						<div className='flex flex-col gap-2 sm:flex-row sm:gap-0 sm:items-end sm:justify-between'>
							{stockPrice ? (
								<div className='flex items-baseline space-x-1 tracking-wide'>
									<p
										className={`text-4xl font-bold ${
											stockPrice.change[0] > 0 ? 'text-stock_red' : stockPrice.change[0] < 0 ? 'text-stock_green' : ''
										} `}
									>
										{parseFloat(stockPrice.closePrice[0]).toFixed(2)}
									</p>
									<div
										className={`flex items-baseline text-xl font-medium space-x-1 ${
											stockPrice.change[0] > 0 ? 'text-stock_red' : stockPrice.change[0] < 0 ? 'text-stock_green' : ''
										}`}
									>
										<p>
											<span>
												{stockPrice.change[0] > 0 ? (
													<ArrowDropUpIcon />
												) : stockPrice.change[0] < 0 ? (
													<ArrowDropDownIcon />
												) : (
													''
												)}
											</span>
											<span>{Math.abs(stockPrice.change[0]).toFixed(2)}</span>
										</p>
										<p>
											({calculatePriceChange(stockPrice.closePrice[1], stockPrice.closePrice[0]).toFixed(2)}
											%)
										</p>
									</div>
								</div>
							) : null}
							<div className='flex space-x-5'>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800 dark:text-white'>{stockPePb.pb || '－'}</h4>
									<p className='text-xs text-zinc-500 dark:text-zinc-300'>本益比</p>
								</div>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800 dark:text-white'>{stockPePb.pe || '－'}</h4>
									<p className='text-xs text-zinc-500 dark:text-zinc-300'>本淨比</p>
								</div>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800 dark:text-white'>
										{resultStockInfo[selectedTabIndex].eps || '－'}
									</h4>
									<p className='text-xs text-zinc-500 dark:text-zinc-300'>EPS</p>
								</div>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800 dark:text-white'>
										{resultStockInfo[selectedTabIndex].ROE || '－'}
									</h4>
									<p className='text-xs text-zinc-500 dark:text-zinc-300'>ROE</p>
								</div>
							</div>
						</div>
					</section>
				)}
				<section className='px-4 sm:px-8 lg:px-10'>
					{!isLoading && resultStockInfo[selectedTabIndex] ? (
						<>
							<AnalysisTable stockId={resultStockInfo[selectedTabIndex].stock_id} />
							<RagBot stockId={resultStockInfo[selectedTabIndex].stock_id || 0} />
						</>
					) : (
						<Loading />
					)}
				</section>
			</div>
		</StarryBackground>
	)
}

const ResultDashboardWithSuspense = () => (
	<Suspense fallback={<Loading />}>
		<ResultDashboard />
	</Suspense>
)

export default ResultDashboardWithSuspense
