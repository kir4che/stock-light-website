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
import { stockPriceOption } from '@/components/Chart/options/stockPriceOption'
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
			className='py-1 rounded-md min-w-[110px] w-1/7 hover:bg-secondary_blue/10'
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
					{/* 股價走勢圖與成交量等資訊 */}
					<section className='flex flex-col-reverse items-start gap-2 xs:gap-6 md:flex-row'>
						<Chart
							option={stockPriceOption(date, price, closePrice, volume, dataZoomRange, handleDataZoomChange)}
							customHeight='h-72 md:h-80 xl:h-[450px]'
						/>
						<section className='flex flex-col w-full mt-3 space-y-2 xs:items-center xs:space-y-0 xs:space-x-2 xs:flex-row md:items-stretch md:mt-0 md:space-x-0 md:space-y-2 md:mb-2 md:w-48 md:flex-col'>
							<button className='px-3 py-1 space-x-2 leading-6 rounded-md text-zinc-100 bg-sky-500'>
								<span className='text-sm font-light xs:text-base'>成交量</span>
								<span className='text-base font-semibold xs:text-lg'>
									{volume[volume.length - 1] && volume[volume.length - 1].toLocaleString()}
								</span>
							</button>
							{stockPePb && (
								<>
									<button className='px-3 py-1 space-x-2 leading-6 rounded-md text-zinc-100 bg-sky-500'>
										<span className='text-sm font-light xs:text-base'>本益比</span>
										<span className='text-base font-semibold xs:text-lg'>
											{stockPePb.p_e_ratio ? stockPePb.p_e_ratio.toFixed(2) : ''}
										</span>
									</button>
									<button className='px-3 py-1 space-x-2 leading-6 rounded-md text-zinc-100 bg-sky-500'>
										<span className='text-sm font-light xs:text-base'>本淨比</span>
										<span className='text-base font-semibold xs:text-lg'>
											{stockPePb.p_b_ratio ? stockPePb.p_b_ratio.toFixed(2) : ''}
										</span>
									</button>
								</>
							)}
						</section>
					</section>
					{/* 日期區間 */}
					<section className='pt-3 pb-2 overflow-x-auto rounded flex-center-between'>
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
					<div className='md:flex items-end justify-between mt-2.5 mb-2'>
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
						<section className='flex items-center justify-end text-xs font-light tracking-widest xs:text-sm xs:space-x-1'>
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
								{techAnalData.curve.find((curve) => curve.name === 'MA')?.desc}
							</p>
							{subchart !== '' && (
								<p>
									<strong>{techAnalData.chart.find((chart) => chart.name === subchart)?.fullname}：</strong>
									{techAnalData.chart.find((chart) => chart.name === subchart)?.desc}
								</p>
							)}
						</div>
					) : (
						<div className='mt-6 mb-12 space-y-2'>
							<p>
								<strong>{techAnalData.curve.find((curve) => curve.name === selectedMenu)?.fullname}：</strong>
								{techAnalData.curve.find((curve) => curve.name === selectedMenu)?.desc}
							</p>
							{subchart !== '' && (
								<p>
									<strong>{techAnalData.chart.find((chart) => chart.name === subchart)?.fullname}：</strong>
									{techAnalData.chart.find((chart) => chart.name === subchart)?.desc}
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
