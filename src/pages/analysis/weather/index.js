import { Popover } from '@arco-design/web-react'
import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'
import { allStock } from '@/data/constants'
import { convertDateTime } from '@/utils/convertDateTime'
import { getCurrentDate } from '@/utils/getCurrentDate'

import Chart from '@/components/Chart/Chart'
import { linearRegOption } from '@/components/Chart/options/linearRegOption'
import { DataGrid } from '@mui/x-data-grid'

const WeatherSidebar = [
	{
		id: 1,
		en_name: 'Sunny',
		ch_name: '晴天',
		icon: 'https://img.icons8.com/emoji/32/sun-emoji.png',
		desc: '雲量佔全天空0~4/10',
	},
	{
		id: 2,
		en_name: 'Cloudy',
		ch_name: '多雲',
		icon: 'https://img.icons8.com/office/32/partly-cloudy-day--v1.png',
		desc: '雲量佔全天空5/10~8/10',
	},
	{
		id: 3,
		en_name: 'Rainny',
		ch_name: '雨天',
		icon: 'https://img.icons8.com/external-filled-outline-lima-studio/32/external-rainny-spring-filled-outline-lima-studio.png',
		desc: '從層狀雲降落，降雨強度均勻緩和之連續或間歇性降雨',
	},
	{
		id: 4,
		en_name: 'Temperature',
		ch_name: '溫度',
		icon: 'https://img.icons8.com/stickers/32/temperature-low.png',
	},
	{
		id: 5,
		en_name: 'Humidity',
		ch_name: '濕度',
		icon: 'https://img.icons8.com/office/32/humidity.png',
	},
	{
		id: 6,
		en_name: 'Precipitation',
		ch_name: '降雨量',
		icon: 'https://img.icons8.com/external-microdots-premium-microdot-graphic/32/external-precipitation-weather-forecast-microdots-premium-microdot-graphic-2.png',
	},
]

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
		valueFormatter: (params) => `${params.value}`,
		cellClassName: (params) => {
			const changeValue = params.row.quote_change || 0
			return changeValue > 0 ? 'text-stock_red' : changeValue < 0 ? 'text-stock_green' : ''
		},
	},
	{
		field: 'volume',
		headerName: '交易量',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => {
			const volume = params.value || 0
			return volume.toLocaleString()
		},
	},
	{
		field: 'correlation',
		headerName: '相關係數',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
	},
]

export default function WeatherAnalysis() {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedTab, setSelectedTab] = useState(0)

	const [selectedStockSymbol, setSelectedStockSymbol] = useState(1101)
	const [selectedWeatherType, setSelectedWeatherType] = useState('sunny')
	const [weatherData, setWeatherData] = useState([])
	const [stockData, setStockData] = useState([null])
	const [stockPrices, setStockPrices] = useState([])
	const [volumeData, setVolumeData] = useState([])

	const fetchWeatherPredict = async (type, stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/weather/predict/${type}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			console.log('data', data.data)

			const filteredData = data.data.filter((stock) => stock.stock_id === stockId)
			setStockData(filteredData)
			const dates = filteredData.map((stock) => convertDateTime(stock.date).split(' ')[0])
			setDateData(dates)
			const prices = filteredData.map((stock) => stock.stock_price)
			setStockPrices(prices)
			const volumes = filteredData.map((stock) => stock.trade_volume)
			setVolumeData(volumes)

			setWeatherData(data)
			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchWeatherPredict(selectedWeatherType, selectedStockSymbol)
	}, [selectedStockSymbol, selectedWeatherType])

	return (
		<StarryBackground className={'w-full pt-8 pb-12 md:pt-10'}>
			<h2 className='mb-4 text-center text-zinc-100'>天氣相關性分析</h2>
			<div className='md:gap-8 md:flex'>
				<section className='w-full py-4 space-y-1 bg-white rounded md:w-1/5 dark:bg-zinc-900/50'>
					<h3 className='mb-4 text-center'>天氣型態</h3>
					<hr />
					{WeatherSidebar.map((weather, index) => (
						<button
							className={`flex items-center space-x-1.5 w-full px-3 py-2 hover:bg-primary_yellow/20 ${
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
					<div className='flex-center-between'>
						<div className='flex items-center mb-2 space-x-4'>
							<h3 className='inline-flex items-baseline space-x-2'>
								<span>{allStock.find((stock) => stock.symbol === selectedStockSymbol).name || null}</span>
								<span className='text-xl font-light tracking-widest'>{selectedStockSymbol}</span>
							</h3>
							<Popover
								triggerEvent='hover'
								title={WeatherSidebar[selectedTab].ch_name}
								className={'text-black bg-white rounded-lg font-bold opacity-60 px-2 '}
								content={
									<div>
										<hr></hr>
										{WeatherSidebar[selectedTab].desc}
									</div>
								}
							>
								<p className='px-2.5 py-1 text-xs text-white rounded-full bg-secondary_blue'>
									{WeatherSidebar[selectedTab].ch_name}
								</p>
							</Popover>
							<p className='text-xs font-medium tracking-wide opacity-70'>
								{stockData && stockData[stockData.length - 1]
									? convertDateTime(stockData[stockData.length - 1].date)
									: getCurrentDate()}{' '}
								更新
							</p>
						</div>
						<StockSelect value={selectedStockSymbol} onChange={(e) => setSelectedStockSymbol(e.target.value)} />
					</div>
					{!isLoading ? (
						<section className='flex flex-wrap items-start gap-3 mt-8'>
							<Chart
								option={linearRegOption(selectedStockSymbol, selectedWeatherType)}
								customHeight='h-56 md:h-64 xl:h-[320px]'
							/>
							<DataGrid
								sx={{ height: 120, pl: 3, pr: 3, pt: 0.5, pb: 1 }}
								rows={[
									{
										id: 1,
										stock_id: selectedStockSymbol,
										weather: selectedWeatherType,
										stock_name: allStock.find((stock) => stock.symbol === selectedStockSymbol).name || null,
										price: stockPrices,
										volume: volumeData,
										correlation: 0,
									},
								]}
								columns={columns}
								className='my-8 bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
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
