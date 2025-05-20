'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { convertDateTime } from '@/utils/convertDateTime'
import fetchStockData from '@/utils/fetchStockData'
import fetchStockPePb from '@/utils/fetchStockPePb'
import { getCurrentDate } from '@/utils/getCurrentDate'

import stock100 from '@/data/stock100.json'

const Loading = dynamic(() => import('@/components/common/Loading'), { ssr: false })
const StarryBackground = dynamic(() => import('@/components/common/StarryBackground'), { ssr: false })
const StockSelect = dynamic(() => import('@/components/ui/StockSelect'), { ssr: false })
const TabContent = dynamic(() => import('@/components/Analysis/TabContent'), { 
  ssr: false,
  loading: () => <div className="min-h-[400px] flex items-center justify-center"><Loading /></div>
})

const Tab = dynamic(() => import('@mui/material/Tab').then(mod => mod.default), { ssr: false })
const Tabs = dynamic(() => import('@mui/material/Tabs').then(mod => mod.default), { ssr: false })
const ArrowDropDownIcon = dynamic(() => import('@mui/icons-material/ArrowDropDown'), { ssr: false })
const ArrowDropUpIcon = dynamic(() => import('@mui/icons-material/ArrowDropUp'), { ssr: false })

export default function FundamentalAnalysis() {
	const [mounted, setMounted] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const [selectedStockId, setSelectedStockId] = useState(1101)
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const [stockPePb, setStockPePb] = useState(null)
	
	const handleTabChange = useCallback((e, index) => {
		setSelectedTabIndex(index);
	}, []);
	
	const [stockData, setStockData] = useState({
		date: [],
		price: [],
		closePrice: [],
		highPrice: [],
		lowPrice: [],
		change: [],
		volume: [],
	})

	useEffect(() => {
		setMounted(true)
		
		const fetchData = async (stockId) => {
			try {
				setIsLoading(true)
				const [pePbData, stockData] = await Promise.all([
					fetchStockPePb({ stockId, setIsLoading }),
					fetchStockData({ stockId, setIsLoading })
				])
				setStockPePb(pePbData)
				setStockData(stockData)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setIsLoading(false)
			}
		}

		if (mounted) {
			fetchData(selectedStockId)
		}
	}, [selectedStockId, mounted])

	if (!mounted) {
		return <div className="min-h-screen flex items-center justify-center"><Loading /></div>
	}

	return (
		<StarryBackground className='pt-8 pb-12 md:pt-10'>
			<div className='px-4 py-5 bg-white md:px-8 dark:bg-zinc-900/50 md:rounded'>
				<div className='flex flex-col-reverse xs:flex-row xs:justify-between'>
					<div className='flex items-baseline mt-4 mb-2 space-x-4 xs:mt-0'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{stock100.find((stock) => stock.stock_id === selectedStockId)?.name || null}</span>
							<span className='text-xl font-light tracking-widest'>{selectedStockId}</span>
						</h3>
						<p className='text-xs font-medium tracking-wide opacity-70'>
							{stockData ? convertDateTime(stockData.date[stockData.date.length - 1]) : getCurrentDate()} 更新
						</p>
					</div>
					<StockSelect setSelect={setSelectedStockId} />
				</div>
				{stockData ? (
					<section className='flex items-baseline mb-4 space-x-1 tracking-wide'>
						<p
							className={`text-4xl font-bold ${
								stockData.change[stockData.change.length - 1] > 0
									? 'text-stock_red'
									: stockData.change[stockData.change.length - 1] < 0
									? 'text-stock_green'
									: ''
							} `}
						>
							{stockData.closePrice[stockData.closePrice.length - 1]?.toFixed(2)}
						</p>
						<div
							className={`flex items-baseline text-xl font-medium space-x-1 ${
								stockData.change[stockData.change.length - 1] > 0
									? 'text-stock_red'
									: stockData.change[stockData.change.length - 1] < 0
									? 'text-stock_green'
									: ''
							}`}
						>
							<p>
								<span>
									{stockData.change[stockData.change.length - 1] - stockData.change[stockData.change.length - 2] > 0 ? (
										<ArrowDropUpIcon />
									) : stockData.change[stockData.change.length - 1] - stockData.change[stockData.change.length - 2] <
									  0 ? (
										<ArrowDropDownIcon />
									) : (
										''
									)}
								</span>
								<span>{Math.abs(stockData.change[stockData.change.length - 1]).toFixed(2)}</span>
							</p>
							<p>
								(
								{calculatePriceChange(
									stockData.closePrice[stockData.closePrice.length - 2],
									stockData.closePrice[stockData.closePrice.length - 1]
								).toFixed(2)}
								%)
							</p>
						</div>
					</section>
				) : null}
				<Tabs
					variant='scrollable'
					value={selectedTabIndex}
					onChange={handleTabChange}
					className='mt-4 mb-2 bg-white rounded dark:bg-zinc-900/80'
				>
					{['股價走勢', '技術指標', '財務報表', '基本資料', '新聞'].map((label, index) => (
						<Tab
							label={label}
							className={`${
								selectedTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
							} hover:bg-sky-300/10 `}
							key={index}
						/>
					))}
				</Tabs>
				{!isLoading && stockData ? (
					<TabContent
						stockId={selectedStockId}
						tabIndex={selectedTabIndex}
						stockData={stockData}
						stockPePb={stockPePb}
					/>
				) : (
					<Loading />
				)}
				<p className='mt-8 text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
		</StarryBackground>
	)
}
