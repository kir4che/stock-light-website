import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Tab, Tabs } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useCallback, useEffect, useState } from 'react'

import TabContent from '@/components/Analysis/TabContent'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import { stock150 } from '@/data/constants'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { convertDateTime } from '@/utils/convertDateTime'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function FundamentalAnalysis() {
	const [isLoading, setIsLoading] = useState(true)

	const [selectedStockId, setSelectedStockId] = useState(1101)
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)

	const [stockPePb, setStockPePb] = useState(null)
	const [stockChartData, setStockChartData] = useState({
		date: [],
		price: [],
		closePrice: [],
		highPrice: [],
		lowPrice: [],
		change: [],
		volume: [],
	})
	const { date, closePrice, change } = stockChartData

	const fetchStockPePb = useCallback(async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setStockPePb(data.data)
		} catch (error) {
			console.error('error', error)
		}
	}, [])

	const fetchStockData = useCallback(async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/all/info`, { method: 'GET' })
			let data = await response.json()

			const filteredData = data.data.filter((stock) => stock.stock_id === stockId)

			const dates = filteredData.map((stock) => convertDateTime(stock.date).split(' ')[0])
			const closingPrices = filteredData.map((stock) => stock.closing_price)
			const openingPrices = filteredData.map((stock) => stock.opening_price)
			const highestPrices = filteredData.map((stock) => stock.highest_price)
			const lowestPrices = filteredData.map((stock) => stock.lowest_price)
			const changes = filteredData.map((stock) => stock.change)
			const volumes = filteredData.map((stock) => stock.trade_volume)

			setStockChartData((prevStockChartData) => ({
				...prevStockChartData,
				date: dates,
				price: highestPrices.map((_, index) => [
					closingPrices[index],
					openingPrices[index],
					lowestPrices[index],
					highestPrices[index],
				]),
				closePrice: closingPrices,
				highPrice: highestPrices,
				lowPrice: lowestPrices,
				change: changes,
				volume: volumes,
			}))

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}, [])

	useEffect(() => {
		setIsLoading(true)

		fetchStockPePb(selectedStockId)
		fetchStockData(selectedStockId)

		setSelectedTabIndex(0)
	}, [selectedStockId])

	return (
		<StarryBackground className='w-full pt-8 pb-12 md:pt-10'>
			<div className='w-full px-4 py-5 bg-white md:px-8 dark:bg-zinc-900/50 md:rounded'>
				<div className='flex flex-col-reverse xs:flex-row xs:justify-between'>
					{/* 個股名稱、代號 */}
					<div className='flex items-baseline mt-4 mb-2 space-x-4 xs:mt-0'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{stock150.find((stock) => stock.id === selectedStockId).name || null}</span>
							<span className='text-xl font-light tracking-widest'>{selectedStockId}</span>
						</h3>
						<p className='text-xs font-medium tracking-wide opacity-70'>
							{date.length ? convertDateTime(date[date.length - 1]) : getCurrentDate()} 更新
						</p>
					</div>
					<Autocomplete
						options={stock150.map((stock) => `${stock.id} ${stock.name}`)}
						defaultValue={`${stock150[0].id} ${stock150[0].name}`}
						sx={{ width: 192 }}
						size='small'
						renderInput={(params) => <TextField {...params} label='搜尋台股代號／名稱' />}
						onChange={(e, newValue) => setSelectedStockId(parseInt(newValue))}
						disableClearable
						disablePortal
					/>{' '}
				</div>
				{/* 當日收盤價資訊 */}
				{change.length && closePrice.length ? (
					<section className='flex items-baseline mb-4 space-x-1 tracking-wide'>
						<p
							className={`text-4xl font-bold ${
								change[change.length - 1] > 0
									? 'text-stock_red'
									: change[change.length - 1] < 0
									? 'text-stock_green'
									: ''
							} `}
						>
							{closePrice[closePrice.length - 1]?.toFixed(2)}
						</p>
						<div
							className={`flex items-baseline text-xl font-medium space-x-1 ${
								change[change.length - 1] > 0
									? 'text-stock_red'
									: change[change.length - 1] < 0
									? 'text-stock_green'
									: ''
							}`}
						>
							<p>
								<span> {change[change.length - 1] > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
								<span>{Math.abs(change[change.length - 1]).toFixed(2)}</span>
							</p>
							<p>
								({calculatePriceChange(closePrice[closePrice.length - 2], closePrice[closePrice.length - 1]).toFixed(2)}
								%)
							</p>
						</div>
					</section>
				) : null}
				{/* 個股選單 */}
				<Tabs
					variant='scrollable'
					value={selectedTabIndex}
					onChange={useCallback((e, index) => setSelectedTabIndex(index), [])}
					className='mt-4 bg-white rounded dark:bg-zinc-800'
					scrollButtons={false}
				>
					{['股價走勢', '技術指標', '財務報表', '基本資料', '新聞'].map((tab, index) => (
						<Tab
							label={tab}
							className={`${
								selectedTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
							} hover:bg-sky-300/10 `}
							key={index}
						/>
					))}
				</Tabs>
				{/* 個股選單內容 */}
				{!isLoading && stockChartData ? (
					<TabContent
						stockId={selectedStockId}
						tabIndex={selectedTabIndex}
						stockData={stockChartData}
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
