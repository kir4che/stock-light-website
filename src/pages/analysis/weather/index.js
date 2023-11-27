import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { linearRegOption } from '@/components/Chart/options/linearRegOption'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'
import { allStock, weatherList } from '@/data/constants'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'

const columns = [
	{ field: 'stock_id', headerName: '代號', flex: 1 },
	{ field: 'stock_name', headerName: '股票', flex: 1 },
	{ field: 'weather', headerName: '天氣', flex: 1 },
	{
		field: 'price',
		headerName: '股價',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
	},
	{
		field: 'quote_change',
		headerName: '漲跌幅',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{value.toFixed(2)}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{Math.abs(value.toFixed(2))}</span>
					</p>
				)
			} else return value.toFixed(2)
		},
	},
	{
		field: 'week_quote_change',
		headerName: '週漲跌幅',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{value.toFixed(2)}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{Math.abs(value.toFixed(2))}</span>
					</p>
				)
			} else return value.toFixed(2)
		},
	},
	{
		field: 'volume',
		headerName: '交易量',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => params.value.toLocaleString(),
	},
	{
		field: 'correlation',
		headerName: '相關係數',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
	},
]

const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(
	({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: '#f5f5f9',
			color: 'rgba(0, 0, 0, 0.87)',
			maxWidth: 220,
			fontSize: theme.typography.pxToRem(12),
			border: '1px solid #dadde9',
		},
	})
)

export default function WeatherAnalysis() {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedTab, setSelectedTab] = useState(0)
	const [selectedStockSymbol, setSelectedStockSymbol] = useState(1101)
	const [selectedWeatherType, setSelectedWeatherType] = useState('sunny')

	const [weatherData, setWeatherData] = useState([])
	const [stockPrices, setStockPrices] = useState([])
	const [stockInfo, setStockInfo] = useState([])

	const [chartData, setChartData] = useState({ stock: '', weather: '' })

	const fetchWeatherPredict = async (type, stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/weather/predict/${type}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			setStockPrices(data.data.dependent_datas)
			setWeatherData(data.data.independent_datas)
			setStockInfo(data.data.stockinfo)

			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		fetchWeatherPredict(selectedWeatherType, selectedStockSymbol)
		setChartData({
			stock: allStock.find((stock) => stock.symbol === selectedStockSymbol).name,
			weather: weatherList[selectedTab].ch_name,
		})
	}, [selectedStockSymbol, selectedWeatherType])

	return (
		<StarryBackground className={'w-full pt-8 pb-12'}>
			<h2 className='mb-6 text-center text-zinc-100'>天氣相關性分析</h2>
			<div className='lg:gap-6 xl:gap-8 lg:flex'>
				{/* 天氣型態 */}
				<section className='w-full pb-3 overflow-y-auto bg-white rounded h-28 lg:h-full lg:w-80 xl:w-64 dark:bg-zinc-900/80'>
					<h4 className='py-4 tracking-wide text-center dark:bg-zinc-800'>選擇天氣型態</h4>
					{weatherList.map((weather, index) => (
						<button
							className={`flex items-center mb-2 space-x-1.5 w-full px-3 py-2 hover:bg-primary_yellow/20 ${
								selectedTab === index ? 'bg-primary_yellow/50 dark:bg-primary_yellow/30' : ''
							}`}
							key={index}
							onClick={() => {
								setSelectedWeatherType(weather.en_name.toLowerCase())
								setSelectedTab(index)
							}}
						>
							<img src={weather.icon} />
							<span>{weather.ch_name}</span>
						</button>
					))}
				</section>
				<section className='w-full px-8 py-5 bg-white dark:bg-zinc-900/50 md:rounded'>
					<div className='mb-4 flex-center-between'>
						{chartData && (
							<div className='space-x-2 flex-center'>
								<h3 className='inline-flex items-baseline space-x-2'>
									<span>{chartData.stock}</span>
									<span className='text-xl font-light tracking-widest'>{selectedStockSymbol}</span>
								</h3>
								<HtmlTooltip title={<React.Fragment>{weatherList[selectedTab].desc} </React.Fragment>}>
									<p className='px-2.5 py-1 text-xs text-white rounded-full bg-secondary_blue'>{chartData.weather}</p>
								</HtmlTooltip>
							</div>
						)}
						<StockSelect value={selectedStockSymbol} onChange={(e) => setSelectedStockSymbol(e.target.value)} />
					</div>
					{!isLoading ? (
						<section className='flex flex-wrap items-start mb-10 space-y-4'>
							<Chart
								option={linearRegOption(chartData.stock, chartData.weather, weatherData, stockPrices)}
								customHeight='h-72 md:h-96 xl:h-[450px]'
							/>
							<DataGrid
								sx={{ height: 120, pl: 0, pr: 0.1, pt: 0, pb: 1 }}
								rows={[
									{
										id: 1,
										stock_id: selectedStockSymbol,
										stock_name: chartData.stock || null,
										weather: chartData.weather,
										price: stockInfo.closing_price || null,
										quote_change: stockInfo.change || null,
										week_quote_change: stockInfo.change_week || null,
										volume: stockInfo.trade_volume || null,
									},
								]}
								columns={columns}
								className='border-none dark:text-zinc-200'
								hideFooter
							/>
						</section>
					) : (
						<Loading />
					)}
					<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</section>
			</div>
		</StarryBackground>
	)
}
