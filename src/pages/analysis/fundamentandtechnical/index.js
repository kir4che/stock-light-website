import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { candlestickOption } from '@/components/Chart/options/candlestickOption'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'
import { allStock } from '@/data/allStock'
import { convertDateTime } from '@/utils/convertDateTime'
import { getCurrentDate } from '@/utils/getCurrentDate'
import { numberComma } from '@/utils/numberComma'

export default function FundamentalAnalysis() {
	const [isLoading, setIsLoading] = useState(true)

	const [selectedStockSymbol, setSelectedStockSymbol] = useState(1101)
	const [stockPePb, setStockPePb] = useState(null)
	const [stockData, setStockData] = useState([null])

	// 折線圖所需資料
	const [dateData, setDateData] = useState([])
	const [priceData, setPriceData] = useState([])
	const [volumeData, setVolumeData] = useState([])
	const [dataZoomRange, setDataZoomRange] = useState([0, 100])

	const handleZoomButtonClick = (newZoomRange) => setDataZoomRange(newZoomRange)

	function handleDataZoomChange(event) {
		const newZoomRange = [event.start, event.end]
		setDataZoomRange(newZoomRange)
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

			const highestPrices = filteredData.map((stock) => stock.highest_price)
			const lowestPrices = filteredData.map((stock) => stock.lowest_price)
			const openingPrices = filteredData.map((stock) => stock.opening_price)
			const closingPrices = filteredData.map((stock) => stock.closing_price)

			const combinedArray = highestPrices.map((_, index) => [
				closingPrices[index],
				openingPrices[index],
				lowestPrices[index],
				highestPrices[index],
			])
			setPriceData(combinedArray)

			const volumes = filteredData.map((stock) => stock.trade_volume)
			setVolumeData(volumes)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)

		fetchStockPePb(selectedStockSymbol)
		fetchStockData(selectedStockSymbol)

		setIsLoading(false)
	}, [selectedStockSymbol])

	return (
		<StarryBackground className='w-full pt-8 pb-12 md:pt-10 '>
			<h2 className='mb-4 text-center text-zinc-100'>個股基本面與技術分析</h2>
			<div className='w-full px-8 py-5 bg-white dark:bg-zinc-900/50 md:rounded'>
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
								stockData[stockData.length - 1].change > 0 ? 'text-stock_red' : 'text-stock_green'
							} `}
						>
							<p>
								<span> {stockData[stockData.length - 1].change > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</span>
								<span>{Math.abs(stockData[stockData.length - 1].change)}</span>
							</p>
							<p>
								(
								{Math.round(
									(((stockData[stockData.length - 1].closing_price - stockData[stockData.length - 2].closing_price) /
										stockData[stockData.length - 2].closing_price) *
										100 +
										Number.EPSILON) *
										100
								) / 100}
								%)
							</p>
						</div>
					</section>
				)}
				<div>
					{/* 當日其他資訊 */}
					{stockPePb && stockData && stockData[stockData.length - 1] && (
						<section className='flex items-center space-x-4'>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>成交量</span>
								<span className='text-lg font-bold'>{numberComma(stockData[stockData.length - 1].trade_volume)}</span>
							</button>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>本益比 P/E</span>
								<span className='text-lg font-bold'>{stockPePb.p_e_ratio}</span>
							</button>
							<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
								<span className='font-light'>本淨比 P/B</span>
								<span className='text-lg font-bold'>{stockPePb.p_b_ratio}</span>
							</button>
						</section>
					)}
					{/* 當日各種圖表 */}
					{!isLoading && stockData && stockData[stockData.length - 1] ? (
						<div>
							<section className='flex mb-0.5 items-center justify-end space-x-1 text-sm font-light tracking-widest'>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([99.7, 100])}
								>
									5D
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([97.5, 100])}
								>
									1M
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([94.5, 100])}
								>
									3M
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([90, 100])}
								>
									6M
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([80, 100])}
								>
									1Y
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([40, 100])}
								>
									3Y
								</button>
								<span>｜</span>
								<button
									className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
									onClick={() => handleZoomButtonClick([0, 100])}
								>
									5Y
								</button>
							</section>
							<Chart option={candlestickOption(dateData, priceData, volumeData, dataZoomRange, handleDataZoomChange)} />
						</div>
					) : (
						<Loading />
					)}
					<p className='mt-8 text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</div>
			</div>
		</StarryBackground>
	)
}
