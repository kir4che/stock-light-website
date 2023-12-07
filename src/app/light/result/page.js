'use client'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import AnalysisTable from '@/components/Analysis/AnalysisTable'
// import PrayerCard from '@/components/Light/PrayerCard'
// import TodayLantern from '@/components/Light/TodayLantern'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function Result() {
	const { data: session, status } = useSession()
	const token = session?.token

	const router = useRouter()
	const industry = useSearchParams().get('industry')

	const [isLoading, setIsLoading] = useState(true)
	const [laternOpen, setLaternOpen] = useState(false)
	const [resultSavedAlertOpen, setResultSavedAlertOpen] = useState(false)

	const [resultStockId, setResultStockId] = useState(2330) // 暫時設定為台積電
	const [stockData, setStockData] = useState({
		date: [],
		closePrice: [],
	})
	const [fsData, setFsData] = useState({
		stockInfo: {},
		assetStatements: [],
		liabilityEquityStatements: [],
	})

	useEffect(() => {
		// 透過 resultStockId 取得該股票的所有資料
		const fetchData = async (stockId) => {
			setStockPePb(await fetchStockPePb({ stockId, setIsLoading }))
			const data = setStockData(await fetchStockData({ stockId, setIsLoading }))
			setStockData({
				date: data.date,
				closePrice: data.closePrice,
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
		<StarryBackground className={'pt-8 pb-12 md:pt-12 md:pb-20'}>
			<h2 className='mb-6 text-center text-zinc-100'>個股分析儀表板</h2>
			<Breadcrumbs prevPage='我要點燈' prevPageLink='/light' curPage='點燈結果' />
			{/* 測試用先註解掉 */}
			{/* <PrayerCard industry={industry} handleNextDialog={() => setLaternOpen(!laternOpen)} />
			<TodayLantern industry={industry} open={laternOpen} handleDialog={() => setLaternOpen(!laternOpen)} /> */}
			<div className='px-4 pt-6 pb-12 bg-white rounded sm:px-8 lg:px-10 dark:bg-zinc-900/50'>
				<div className='inline-flex items-baseline mb-6 space-x-3'>
					<h3 className='space-x-1 tracking-wider flex-center'>
						<sapn>本日光明燈</sapn>
						<span className='px-2 text-sm bg-white border-2 rounded-full border-secondary_blue text-secondary_blue dark:bg-zinc-800'>
							{industry}
						</span>
					</h3>
					<p className='text-xs font-medium tracking-wide opacity-70'>{getCurrentDate()}</p>
				</div>
				{!isLoading ? <AnalysisTable /> : <Loading />}
				<p className='flex justify-end mt-8 text-xs opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				<SubmitBtn text='保存分析結果' handleSubmit={() => setResultSavedAlertOpen(true)} style='mt-16 py-3' />
				<Snackbar open={resultSavedAlertOpen} autoHideDuration={3000} onClose={() => setResultSavedAlertOpen(false)}>
					<Alert onClose={() => setResultSavedAlertOpen(false)} severity='success' sx={{ width: '100%' }}>
						保存成功！
					</Alert>
				</Snackbar>
			</div>
		</StarryBackground>
	)
}
