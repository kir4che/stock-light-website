import { useEffect, useState } from 'react'

import StockFS from '@/components/Analysis/StockFS'
import StockNews from '@/components/Analysis/StockNews'
import StockProfile from '@/components/Analysis/StockProfile'
import Chart from '@/components/Chart/Chart'
import {
	candlestickOptionByBoll,
	candlestickOptionByEMA,
	candlestickOptionByMA,
} from '@/components/Chart/options/candlestickOption'
import { stockPriceLineOption } from '@/components/Chart/options/stockPriceLineOption'
import {
	adlOption,
	biasOption,
	kdOption,
	macdOption,
	rsiOption,
	williamOption,
} from '@/components/Chart/options/technicalAnalOption'
import SelectMenu from '@/components/ui/SelectMenu'
import techAnalData from '@/data/techAnalData.json'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { numberComma } from '@/utils/numberComma'

export default function TabContent({ stockId, tabIndex, stockData, stockPePb }) {
	const { date, price, closePrice, highPrice, lowPrice, change, volume } = stockData

	const [dataZoomRange, setDataZoomRange] = useState([0, 100])
	const [techAnalDataZoomRange, setTechAnalDataZoomRange] = useState([0, 100])
	const [selectedMenu, setSelectedMenu] = useState('')
	const [subchart, setSubchart] = useState('')

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

	useEffect(() => {
		setSelectedMenu('')
		setSubchart('')

		setDataZoomRange([0, 100])
		setTechAnalDataZoomRange([0, 100])
	}, [tabIndex])

	const renderZoomButton = (text, days, zoomPercent) => (
		<button
			className='py-1 rounded-md w-1/7 hover:bg-secondary_blue/10'
			onClick={() => handleZoomBtnClick([zoomPercent, 100])}
		>
			<p className='text-sm'>{text}</p>
			<p
				className={`font-medium tracking-widest ${
					calculatePriceChange(
						closePrice[text === '5Y' ? 0 : closePrice.length - days],
						closePrice[closePrice.length - 1]
					) > 0
						? 'text-stock_red'
						: calculatePriceChange(
								closePrice[text === '5Y' ? 0 : closePrice.length - days],
								closePrice[closePrice.length - 1]
						  ) < 0
						? 'text-stock_green'
						: ''
				}`}
			>
				{calculatePriceChange(
					closePrice[text === '5Y' ? 0 : closePrice.length - days],
					closePrice[closePrice.length - 1]
				) || '－'}
				%
			</p>
		</button>
	)

	const renderTechAnalZoomButton = (text, zoomPercent) => (
		<button
			className='p-2 hover:rounded-full hover:bg-primary_yellow/30'
			onClick={() => handleTechAnalZoomBtnClick([zoomPercent, 100])}
		>
			{text}
		</button>
	)

	const renderTechAnalChart = () => {
		switch (selectedMenu) {
			case '布林':
				return candlestickOptionByBoll(
					date,
					closePrice,
					price,
					volume,
					techAnalDataZoomRange,
					handleTechAnalDataZoomChange
				)
			case 'EMA':
				return candlestickOptionByEMA(
					date,
					closePrice,
					price,
					volume,
					techAnalDataZoomRange,
					handleTechAnalDataZoomChange
				)
			default:
				return candlestickOptionByMA(
					date,
					closePrice,
					price,
					volume,
					techAnalDataZoomRange,
					handleTechAnalDataZoomChange
				)
		}
	}

	const renderSubChart = () => {
		switch (subchart) {
			case 'MACD':
				return <Chart option={macdOption(date, closePrice, techAnalDataZoomRange, handleTechAnalDataZoomChange)} />
			case 'KD':
				return (
					<Chart
						option={kdOption(
							date,
							closePrice,
							lowPrice,
							highPrice,
							techAnalDataZoomRange,
							handleTechAnalDataZoomChange
						)}
					/>
				)
			case 'RSI':
				return <Chart option={rsiOption(date, change, techAnalDataZoomRange, handleTechAnalDataZoomChange)} />
			case 'William':
				return <Chart option={williamOption(date, closePrice, techAnalDataZoomRange, handleTechAnalDataZoomChange)} />
			case 'BIAS':
				return <Chart option={biasOption(date, closePrice, techAnalDataZoomRange, handleTechAnalDataZoomChange)} />
			case 'ADL':
				return (
					<Chart
						option={adlOption(
							date,
							closePrice,
							lowPrice,
							highPrice,
							volume,
							techAnalDataZoomRange,
							handleTechAnalDataZoomChange
						)}
					/>
				)
			default:
				return null
		}
	}

	switch ((stockId, tabIndex)) {
		// 股價走勢
		case 0:
			return (
				<>
					{/* 折線圖 */}
					<section className='flex items-start gap-6'>
						<Chart
							option={stockPriceLineOption(date, price, closePrice, volume, dataZoomRange, handleDataZoomChange)}
							customHeight='h-72 md:h-80 xl:h-[450px]'
						/>

						<section className='flex flex-col w-48 mb-2 space-y-2'>
							<button className='px-3 py-1 space-x-2 rounded-md text-zinc-100 bg-sky-500'>
								<span className='font-light'>成交量</span>
								<span className='text-lg font-semibold'>
									{volume[volume.length - 1] && numberComma(volume[volume.length - 1])}
								</span>
							</button>
							{stockPePb && (
								<>
									<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
										<span className='font-light'>本益比</span>
										<span className='text-lg font-semibold'>
											{stockPePb.p_e_ratio ? stockPePb.p_e_ratio.toFixed(2) : ''}
										</span>
									</button>
									<button className='px-3 py-1 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
										<span className='font-light'>本淨比</span>
										<span className='text-lg font-semibold'>
											{stockPePb.p_b_ratio ? stockPePb.p_b_ratio.toFixed(2) : ''}
										</span>
									</button>
								</>
							)}
						</section>
					</section>
					{/* 日期區間 */}
					<section className='mt-4 flex-center-between'>
						{renderZoomButton('5D', 5, 99.7)}
						{renderZoomButton('1M', 30, 98)}
						{renderZoomButton('3M', 90, 94.5)}
						{renderZoomButton('6M', 180, 88)}
						{renderZoomButton('1Y', 365, 78)}
						{renderZoomButton('3Y', 1095, 31.5)}
						{renderZoomButton('5Y', 1825, 0)}
					</section>
				</>
			)
		// 技術指標
		case 1:
			return (
				<>
					<div className='flex items-end justify-between mt-2.5 mb-2'>
						{/* 均線、副圖表選擇 */}
						<section className='space-x-3'>
							<SelectMenu
								data={techAnalData.curve.map((curve) => curve.name)}
								value={selectedMenu}
								onChange={(e) => setSelectedMenu(e.target.value)}
								minWidth={120}
							/>
							<SelectMenu
								data={techAnalData.chart.map((chart) => chart.name)}
								value={subchart}
								onChange={(e) => setSubchart(e.target.value)}
								minWidth={120}
							/>
						</section>
						{/* 日期區間 */}
						<section className='flex items-center justify-end space-x-1 text-sm font-light tracking-widest'>
							{renderTechAnalZoomButton('5D', 99.7)}
							<span>｜</span>
							{renderTechAnalZoomButton('1M', 98)}
							<span>｜</span>
							{renderTechAnalZoomButton('3M', 94.5)}
							<span>｜</span>
							{renderTechAnalZoomButton('6M', 88)}
							<span>｜</span>
							{renderTechAnalZoomButton('1Y', 78)}
							<span>｜</span>
							{renderTechAnalZoomButton('3Y', 31.5)}
							<span>｜</span>
							{renderTechAnalZoomButton('5Y', 0)}
						</section>
					</div>
					{/* K線圖 */}
					<Chart option={renderTechAnalChart()} customHeight='h-72 md:h-80 xl:h-[450px]' />
					{/* 副圖表 */}
					{renderSubChart()}
					{/* 技術指標說明 */}
					{selectedMenu === '' ? (
						<div className='mt-6 mb-12 space-y-2'>
							<p>
								<strong>{techAnalData.curve.find((curve) => curve.name === 'MA')?.fullname}：</strong>
								{techAnalData.curve.find((curve) => curve.name === 'MA')?.description}
							</p>
							{subchart !== '' && (
								<p>
									<strong>{techAnalData.chart.find((chart) => chart.name === subchart)?.fullname}：</strong>
									{techAnalData.chart.find((chart) => chart.name === subchart)?.description}
								</p>
							)}
						</div>
					) : (
						<div className='mt-6 mb-12 space-y-2'>
							<p>
								<strong>{techAnalData.curve.find((curve) => curve.name === selectedMenu)?.fullname}：</strong>
								{techAnalData.curve.find((curve) => curve.name === selectedMenu)?.description}
							</p>
							{subchart !== '' && (
								<p>
									<strong>{techAnalData.chart.find((chart) => chart.name === subchart)?.fullname}：</strong>
									{techAnalData.chart.find((chart) => chart.name === subchart)?.description}
								</p>
							)}
						</div>
					)}
				</>
			)
		// 財務報表
		case 2:
			return <StockFS stockId={stockId} />
		// 基本資料
		case 3:
			return <StockProfile stockId={stockId} />
		// 新聞
		case 4:
			return <StockNews stockId={stockId} />
		default:
			return null
	}
}
