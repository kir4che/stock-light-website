import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { DataGrid } from '@mui/x-data-grid'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { linearRegOption } from '@/components/Chart/options/linearRegOption'
import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import { stock150, weatherList } from '@/data/constants'
import { calculateR } from '@/utils/calculateR'
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
	const { data: session } = useSession()
	const token = session?.token

	const [isLoading, setIsLoading] = useState(true)
	const [selectedTab, setSelectedTab] = useState(0)
	const [selectedStockId, setSelectedStockId] = useState(1101)
	const [selectedWeatherType, setSelectedWeatherType] = useState('sunny')

	const [weatherData, setWeatherData] = useState([])
	const [stockPrices, setStockPrices] = useState([])
	const [stockInfo, setStockInfo] = useState([])

	const [chartData, setChartData] = useState({ stock: '', weather: '' })

	// 🚩待確認是否要會員才能查看
	const fetchWeatherPredict = async () => {
		setIsLoading(true)

		try {
			const response = await fetch(
				`${process.env.DB_URL}/api/weather/predict/${selectedWeatherType}/${selectedStockId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			)
			const data = await response.json()

			setWeatherData(data.data.independent_datas)
			setStockPrices(data.data.dependent_datas)
			setStockInfo(data.data.stockinfo)

			if (data.success) setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		fetchWeatherPredict()
		setChartData({
			stock: stock150.find((stock) => stock.id === selectedStockId).name,
			weather: weatherList[selectedTab].ch_name,
		})
	}, [selectedStockId, selectedWeatherType])

	return (
		<StarryBackground className={'w-full pt-8 pb-12'}>
			<h2 className='mb-6 text-center text-zinc-100'>天氣相關性分析</h2>
			<div className='lg:gap-6 xl:gap-8 lg:flex'>
				{/* 天氣型態 */}
				<section className='w-full pb-3 overflow-y-auto rounded-t lg:rounded md:bg-white h-28 lg:h-full lg:w-80 xl:w-64 dark:bg-zinc-900/80'>
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
				<section className='w-full px-8 py-6 bg-white rounded-b dark:bg-zinc-900/50 lg:rounded'>
					<div className='mb-4 flex-center-between'>
						{chartData && (
							<div className='space-x-2 flex-center'>
								<h3 className='inline-flex items-baseline space-x-2'>
									<span>{chartData.stock}</span>
									<span className='text-xl font-light tracking-widest'>{selectedStockId}</span>
								</h3>
								<HtmlTooltip title={<React.Fragment>{weatherList[selectedTab].desc} </React.Fragment>}>
									<p className='px-2.5 py-1 text-xs text-white rounded-full bg-secondary_blue'>{chartData.weather}</p>
								</HtmlTooltip>
							</div>
						)}
						<Autocomplete
							options={stock150.map((stock) => `${stock.id} ${stock.name}`)}
							defaultValue={`${stock150[0].id} ${stock150[0].name}`}
							sx={{ width: 150, bgcolor: 'background.paper', borderRadius: '0.25rem' }}
							size='small'
							renderInput={(params) => <TextField {...params} />}
							onChange={(e, newValue) => setSelectedStockId(parseInt(newValue))}
							disableClearable
							disablePortal
						/>
					</div>
					{!isLoading ? (
						<section className='flex flex-wrap items-start space-y-4'>
							<Chart
								option={linearRegOption(chartData.stock, chartData.weather, weatherData, stockPrices)}
								customHeight='h-72 md:h-96 xl:h-[450px]'
							/>
							<DataGrid
								sx={{ height: 120, pl: 0, pr: 0.1, pt: 0, pb: 1 }}
								rows={[
									{
										id: 1,
										stock_id: selectedStockId,
										stock_name: chartData.stock || null,
										weather: chartData.weather,
										price: stockInfo.closing_price || null,
										quote_change: stockInfo.change || null,
										week_quote_change: stockInfo.change_week || null,
										volume: stockInfo.trade_volume || null,
										correlation: calculateR(weatherData, stockPrices),
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
					{/* 通用說明 */}
					{!isLoading && (
						<section className='mt-4 mb-12'>
							<p className='mb-2 font-bold'>簡單線性迴歸模式 (Simple linear regression model)</p>
							<ul className='pl-4 list-disc'>
								<li>
									<strong>散佈圖 (scatter plot)</strong>：蒐集天氣數據 (x) 與股價 (y) 兩個變量的 n 筆數據，並將其畫在 xy
									平面上，可得知兩個變數之間的相關性。
									<ul className='pl-4 list-disc'>
										<li>完全正相關：當天氣數據 (x) 與股價 (y) 全部都在一條左下往右上的直線上。</li>
										<li>正相關：當天氣數據 (x) 增加時，股價 (y) 也有增加的趨勢，圖形呈現左下往右上。</li>
										<li>零相關：完全對稱的圖形、平行 x 軸或平行 y 軸的趨勢。</li>
										<li>負相關：當天氣數據 (x) 增加時，股價 (y) 有減少的趨勢，圖形呈現左上往右下。</li>
										<li>完全負相關：當天氣數據 (x) 與股價 (y) 全部都在一條左上往右下的直線上。</li>
									</ul>
								</li>
								<li>
									<strong>相關係數 (correlation coefficient)</strong>：代表兩變數之間線性關係的強度及方向，數值範圍為 -1
									≤ r ≤ 1。
									<ul class='pl-4 list-disc'>
										<li>完全正相關：r = 1</li>
										<li>
											正相關：0 &lt; r &lt; 1，細分有：高度正相關 (0.7 ≤ r &lt; 1)、中度正相關 (0.3 ≤ r &lt;
											0.7)、低度正相關 (0 &lt; r &lt; 0.3)
										</li>
										<li>零相關：r = 0</li>
										<li>
											負相關：-1 &lt; r &lt; 0，細分有：高度負相關 (-1 &lt; r ≤ -0.7)、中度負相關 (-0.7 &lt; r ≤
											-0.3)、低度負相關 (-0.3 &lt; r &lt; 0)
										</li>
										<li>完全負相關：r = -1</li>
									</ul>
								</li>
								<li>
									<strong>迴歸直線 (regression)</strong>：利用最小平方法 (least square method)
									所估計出的一條用來描述兩個變數之間關係的直線，並稱其為 y 對 x 的迴歸直線。
								</li>
							</ul>
						</section>
					)}
					<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</section>
			</div>
		</StarryBackground>
	)
}
