import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { lineOption } from '@/components/Chart/options/lineOption'
import { areaLineOption } from '@/components/Chart/options/stockPrice/areaLineOption'
import { candlestickOption } from '@/components/Chart/options/stockPrice/candlestickOption'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'
import { allStock } from '@/data/allStock'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { convertDateTime } from '@/utils/convertDateTime'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { numberComma } from '@/utils/numberComma'
import { calculateADL } from '@/utils/technicalAnalysis'

export default function FundamentalAnalysis() {
	const [isLoading, setIsLoading] = useState(true)

	const [selectedStockSymbol, setSelectedStockSymbol] = useState(1101)
	const [stockPePb, setStockPePb] = useState(null)
	const [stockData, setStockData] = useState([null])

	const [stockPriceChart, setStockPriceChart] = useState(0)

	// 折線圖所需資料
	const [dateData, setDateData] = useState([])
	const [priceData, setPriceData] = useState([])
	const [closePriceData, setClosePriceData] = useState([])
	const [openPriceData, setOpenPriceData] = useState([])
	const [highPriceData, setHighPriceData] = useState([])
	const [lowPriceData, setLowPriceData] = useState([])
	const [volumeData, setVolumeData] = useState([])

	const [dataZoomRange, setDataZoomRange] = useState([0, 100])
	const [techAnalDataZoomRange, setTechAnalDataZoomRange] = useState([0, 100])

	const handleZoomBtnClick = (newZoomRange) => setDataZoomRange(newZoomRange)
	const handleTechAnalZoomBtnClick = (newZoomRange) => setTechAnalDataZoomRange(newZoomRange)

	function handleDataZoomChange(event) {
		const newZoomRange = [event.start, event.end]
		setDataZoomRange(newZoomRange)
	}

	function handleTechAnalDataZoomChange(event) {
		const newZoomRange = [event.start, event.end]
		setTechAnalDataZoomRange(newZoomRange)
	}

	const fetchStockPePb = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setStockPePb(data.data)
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockData = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/all/info`, { method: 'GET' })
			let data = await response.json()

			const filteredData = data.data.filter((stock) => stock.stock_id === stockId)
			setStockData(filteredData)

			const dates = filteredData.map((stock) => convertDateTime(stock.date).split(' ')[0])
			setDateData(dates)

			const closingPrices = filteredData.map((stock) => stock.closing_price)
			setClosePriceData(closingPrices)
			const openingPrices = filteredData.map((stock) => stock.opening_price)
			setOpenPriceData(openingPrices)
			const highestPrices = filteredData.map((stock) => stock.highest_price)
			setHighPriceData(highestPrices)
			const lowestPrices = filteredData.map((stock) => stock.lowest_price)
			setLowPriceData(lowestPrices)

			const combinedArray = highestPrices.map((_, index) => [
				closingPrices[index],
				openingPrices[index],
				lowestPrices[index],
				highestPrices[index],
			])
			setPriceData(combinedArray)

			const volumes = filteredData.map((stock) => stock.trade_volume)
			setVolumeData(volumes)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		fetchStockPePb(selectedStockSymbol)
		fetchStockData(selectedStockSymbol)

		stockData && console.log(calculateADL(closePriceData, highPriceData, lowPriceData, volumeData))
	}, [selectedStockSymbol])

	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const handleTabSelect = (e, index) => {
		setSelectedTabIndex(index)
		setTechAnalDataZoomRange([0, 100])
	}

	return (
		<StarryBackground className='w-full pt-8 pb-12 md:pt-10'>
			<div className='w-full px-4 py-5 bg-white md:px-8 dark:bg-zinc-900/50 md:rounded'>
				<div className='flex-center-between'>
					<div className='flex items-baseline mb-2 space-x-4'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{allStock.find((stock) => stock.symbol === selectedStockSymbol).name || null}</span>
							<span className='text-xl font-light tracking-widest'>{selectedStockSymbol}</span>
						</h3>
						<p className='text-xs font-medium tracking-wide opacity-70'>
							{stockData && stockData[stockData.length - 1]
								? convertDateTime(stockData[stockData.length - 1].date)
								: getCurrentDate()}{' '}
							更新
						</p>
					</div>
					<StockSelect value={selectedStockSymbol} onChange={(e) => setSelectedStockSymbol(e.target.value)} />
				</div>
				{/* 當日收盤價資訊 */}
				{stockData && stockData[stockData.length - 1] && (
					<section className='flex items-baseline mb-4 space-x-1 tracking-wide'>
						<p
							className={`text-4xl font-bold ${
								stockData[stockData.length - 1].change > 0 ? 'text-stock_red' : 'text-stock_green'
							} `}
						>
							{stockData[stockData.length - 1].closing_price}
						</p>
						<div
							className={`flex items-baseline text-xl font-medium space-x-1 ${
								stockData[stockData.length - 1].change >= 0 ? 'text-stock_red' : 'text-stock_green'
							}`}
						>
							<p>
								<span> {stockData[stockData.length - 1].change > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
								<span>{Math.abs(stockData[stockData.length - 1].change)}</span>
							</p>
							<p>
								(
								{calculatePriceChange(
									stockData[stockData.length - 2].closing_price,
									stockData[stockData.length - 1].closing_price
								)}
								%)
							</p>
						</div>
					</section>
				)}
				<div>
					{/* 當日其他資訊 */}
					{stockPePb && stockData && stockData[stockData.length - 1] && (
						<section className='flex items-center mb-2 space-x-4 overflow-x-scroll'>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>成交量</span>
								<span className='text-lg font-semibold'>
									{numberComma(stockData[stockData.length - 1].trade_volume)}
								</span>
							</button>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>本益比</span>
								<span className='text-lg font-semibold'>{stockPePb.p_e_ratio}</span>
							</button>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>本淨比</span>
								<span className='text-lg font-semibold'>{stockPePb.p_b_ratio}</span>
							</button>
						</section>
					)}
					{/* 當日各種圖表 */}
					{!isLoading && stockData && stockData[stockData.length - 1] ? (
						<>
							<Chart
								option={areaLineOption(
									dateData,
									priceData,
									closePriceData,
									volumeData,
									dataZoomRange,
									handleDataZoomChange
								)}
								customHeight='h-72 md:h-80 xl:h-[450px]'
							/>
							<section className='mt-4 flex-center-between'>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([99.7, 100])}
								>
									<p className='text-sm'>5D</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 5].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 5].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([97.5, 100])}
								>
									<p className='text-sm'>1M</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 30].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 30].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([94.5, 100])}
								>
									<p className='text-sm'>3M</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 90].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 90].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([90, 100])}
								>
									<p className='text-sm'>6M</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 180].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 180].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([80, 100])}
								>
									<p className='text-sm'>1Y</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 365].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 365].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([40, 100])}
								>
									<p className='text-sm'>3Y</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(
												stockData[stockData.length - 1095].closing_price,
												stockData[stockData.length - 1].closing_price
											) >= 0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(
											stockData[stockData.length - 1095].closing_price,
											stockData[stockData.length - 1].closing_price
										)}
										%
									</p>
								</button>
								<button
									className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
									onClick={() => handleZoomBtnClick([0, 100])}
								>
									<p className='text-sm'>5Y</p>
									<p
										className={`font-medium tracking-widest ${
											calculatePriceChange(stockData[0].closing_price, stockData[stockData.length - 1].closing_price) >=
											0
												? 'text-stock_red'
												: 'text-stock_green'
										}`}
									>
										{calculatePriceChange(stockData[0].closing_price, stockData[stockData.length - 1].closing_price)}%
									</p>
								</button>
							</section>
						</>
					) : (
						<Loading />
					)}
					<Tabs
						variant='scrollable'
						value={selectedTabIndex}
						onChange={handleTabSelect}
						className='mt-4 bg-white rounded shadow-md dark:bg-zinc-800 hover:bg-sky-300/10'
						scrollButtons
					>
						{['K線及均線', '騰落指標 ADL'].map((item, index) => (
							<Tab
								label={item}
								className={`${
									selectedTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
								} hover:bg-sky-300/10 `}
								key={index}
							/>
						))}
					</Tabs>
					<div className='flex items-baseline mt-2.5 mb-0.5 ml-auto w-fit'>
						<section className='flex items-center justify-end space-x-1 text-sm font-light tracking-widest'>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([99.7, 100])}
							>
								5D
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([97.5, 100])}
							>
								1M
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([94.5, 100])}
							>
								3M
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([90, 100])}
							>
								6M
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([80, 100])}
							>
								1Y
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([40, 100])}
							>
								3Y
							</button>
							<span>｜</span>
							<button
								className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
								onClick={() => handleTechAnalZoomBtnClick([0, 100])}
							>
								5Y
							</button>
						</section>
					</div>
					{/* 技術分析圖表 */}
					{selectedTabIndex === 0 && (
						<Chart
							option={candlestickOption(
								dateData,
								priceData,
								volumeData,
								techAnalDataZoomRange,
								handleTechAnalDataZoomChange
							)}
							customHeight='h-72 md:h-80 xl:h-[450px]'
						/>
					)}
					{selectedTabIndex === 1 && (
						<Chart
							option={lineOption(
								calculateADL(closePriceData, highPriceData, lowPriceData, volumeData),
								dateData,
								techAnalDataZoomRange,
								handleTechAnalDataZoomChange
							)}
							customHeight='h-72 md:h-80 xl:h-[450px]'
						/>
					)}
					<p className='mt-8 text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</div>
			</div>
		</StarryBackground>
	)
}
