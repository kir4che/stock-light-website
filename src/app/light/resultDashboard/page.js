'use client'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnalysisTable from '@/components/Analysis/AnalysisTable'
import Loading from '@/components/common/Loading'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { getCurrentDate } from '@/utils/getCurrentDate'
// import PrayerCard from '@/components/Light/PrayerCard'
// import TodayLantern from '@/components/Light/TodayLantern'
import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubmitBtn from '@/components/ui/SubmitBtn'
import stock150 from '@/data/stock150.json'
import fetchStockData from '@/utils/fetchStockData'
import fetchStockPePb from '@/utils/fetchStockPePb'

export default function ResultDashboard() {
	const { data: session, status } = useSession()
	const token = session?.token

	const router = useRouter()
	const industry = useSearchParams().get('industry')

	const [isLoading, setIsLoading] = useState(true)
	const [laternOpen, setLaternOpen] = useState(false)
	const [resultSavedAlertOpen, setResultSavedAlertOpen] = useState(false)

	const [resultStockId, setResultStockId] = useState(2330) // 暫時設定為台積電
	const [stockPrice, setStockPrice] = useState({
		closePrice: [],
		change: [],
	})
	const [stockPePb, setStockPePb] = useState({
		pb: null,
		pe: null,
	})

	useEffect(() => {
		// 透過 resultStockId 取得該股票的所有資料
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

		fetchData(resultStockId)
	}, [resultStockId])

	// 需要針對該產業別的所有個股進行分析，並挑選出來五檔。
	// const getStocksByIndustry = async () => {
	// 	setIsLoading(true)

	// 	try {
	// 		const response = await fetch(`${process.env.DB_URL}/api/user/all/industry/stock`, {
	// 			method: 'GET',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				Authorization: token,
	// 			},
	// 		})
	// 		const data = await response.json()
	// 		const stocks = data.data.filter((stock) => stock.industry === industry)[0].data // 該產業底下所有個股
	// 		console.log(industry, stocks)

	// 		// 從 stocks 中隨機挑選 5 隻股票（🚩測試用）
	// 		const randomStocks = []
	// 		const copyStockArray = [...stocks]

	// 		for (let i = 0; i < 5; i++) {
	// 			const randomIndex = Math.floor(Math.random() * copyStockArray.length)
	// 			const resultStockId = copyStockArray[randomIndex].stock_id
	// 			randomStocks.push(resultStockId)
	// 		}

	// 		setResultStock(randomStocks)
	// 		console.log('randomStocks', randomStocks)

	// 		if (data.success) setIsLoading(false)
	// 	} catch (error) {
	// 		console.error('Error: ', error)
	// 	}
	// }

	// useEffect(() => {
	// 	getStocksByIndustry()
	// }, [industry])

	return (
		<StarryBackground className='pt-8 pb-12'>
			<Breadcrumbs prevPage='我要點燈' prevPageLink='/light' curPage='個股分析儀表板' />
			{/* 測試用先註解掉 */}
			{/* <PrayerCard industry={industry} handleNextDialog={() => setLaternOpen(!laternOpen)} />
			<TodayLantern industry={industry} open={laternOpen} handleDialog={() => setLaternOpen(!laternOpen)} /> */}
			<div className='pb-10 bg-white rounded dark:bg-zinc-900/50'>
				<section className='flex items-baseline justify-between w-full px-4 pt-4 pb-3 mb-4 tracking-wider sm:px-8 lg:px-10 bg-secondary_blue/20 dark:bg-zinc-800/60'>
					<h3 className='space-x-2 flex-center'>
						<sapn>本日光明燈</sapn>
						<span className='px-2 text-sm bg-white border-2 rounded-full dark:bg-zinc-900 border-secondary_blue text-secondary_blue'>
							{industry}
						</span>
					</h3>
					<p className='text-xs'>{getCurrentDate()}</p>
				</section>
				<section className='px-4 mb-4 sm:px-8 lg:px-10'>
					<h4 className='inline-flex items-baseline px-2 mb-2 space-x-2 rounded-lg dark:text-zinc-800 bg-primary_yellow'>
						<span>{stock150.find((stock) => stock.id === resultStockId)?.name || null}</span>
						<span className='text-lg font-light tracking-widest'>{resultStockId}</span>
					</h4>
					<div className='flex items-end justify-between'>
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
						{stockPePb && (
							<div className='flex space-x-5'>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800'>{stockPePb.pb}</h4>
									<p className='text-xs text-zinc-500'>本益比</p>
								</div>
								<div className='flex flex-col items-center'>
									<h4 className='font-extrabold text-zinc-800'>{stockPePb.pe}</h4>
									<p className='text-xs text-zinc-500'>本淨比</p>
								</div>
							</div>
						)}
					</div>
				</section>
				<section className='px-4 sm:px-8 lg:px-10'>
					{!isLoading ? <AnalysisTable stockId={resultStockId} /> : <Loading />}
					<p className='flex justify-end mt-4 mb-10 text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
					<SubmitBtn text='保存分析結果' handleSubmit={() => setResultSavedAlertOpen(true)} style='py-3' />
					<Snackbar open={resultSavedAlertOpen} autoHideDuration={3000} onClose={() => setResultSavedAlertOpen(false)}>
						<Alert onClose={() => setResultSavedAlertOpen(false)} severity='success' sx={{ width: '100%' }}>
							保存成功！
						</Alert>
					</Snackbar>
				</section>
			</div>
		</StarryBackground>
	)
}
