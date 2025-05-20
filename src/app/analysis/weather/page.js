'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { calculateR } from '@/utils/calculateR'

import stock100 from '@/data/stock100.json'
import weatherList from '@/data/weatherList.json'

const Loading = dynamic(() => import('@/components/common/Loading'), { ssr: false })
const StarryBackground = dynamic(() => import('@/components/common/StarryBackground'), { ssr: false })

const DataGrid = dynamic(
  () => import('@mui/x-data-grid').then((mod) => mod.DataGrid),
  { ssr: false, loading: () => <Loading /> }
)

const ArrowDropDownIcon = dynamic(
  () => import('@mui/icons-material/ArrowDropDown'),
  { ssr: false }
)

const ArrowDropUpIcon = dynamic(
  () => import('@mui/icons-material/ArrowDropUp'),
  { ssr: false }
)

const Chart = dynamic(
  () => import('@/components/Chart/Chart'),
  { ssr: false, loading: () => <div className="h-[450px] flex items-center justify-center"><Loading /> </div> }
)

const StockSelect = dynamic(
  () => import('@/components/ui/StockSelect'),
  { ssr: false, loading: () => <div className="w-40 h-10 bg-gray-200 rounded animate-pulse"></div> }
)

const linearRegOption = dynamic(
  () => import('@/components/Chart/options/linearRegOption').then(mod => mod.linearRegOption),
  { ssr: false }
)

function HtmlTooltip({ children, ...props }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) {
    return <>{children}</>;
  }
  
  const Tooltip = dynamic(
    () => import('@mui/material/Tooltip'),
    { 
      ssr: false,
      loading: () => <>{children}</>
    }
  );
  
  return (
    <Tooltip 
      {...props}
      classes={{
        tooltip: 'bg-white text-gray-900 max-w-[220px] text-xs border border-gray-200',
        ...props.classes
      }}
    >
      {children}
    </Tooltip>
  );
}

export default function WeatherAnalysis() {
	const [mounted, setMounted] = useState(false)
	const [isLoading, setIsLoading] = useState(true)

	const [selectedTab, setSelectedTab] = useState(0)
	const [selectedStockId, setSelectedStockId] = useState(1101)
	const [selectedWeatherType, setSelectedWeatherType] = useState('sunny')

	const [weatherData, setWeatherData] = useState({
		weather: [],
		stockPrice: [],
		stockInfo: [],
	})
	const { weather, stockPrice, stockInfo } = weatherData

	const [chartData, setChartData] = useState({ stockName: '', weatherType: '' })
	const { stockName, weatherType } = chartData

	const fetchWeatherPredict = async (stockId, weatherType) => {
		if (!mounted) return;
		
		setIsLoading(true);

		try {
			const baseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';
			const response = await fetch(`${baseUrl}/api/weather/predict/${weatherType}/${stockId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			
			const data = await response.json();

			if (data.success && mounted) {
				setWeatherData({
					weather: data.data?.independent_datas || [],
					stockPrice: data.data?.dependent_datas || [],
					stockInfo: data.data?.stockinfo || {},
				})
				setIsLoading(false)
			} else {
				console.error('Error: ', data.errorMessage)
				return
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		setMounted(true);
		
		if (typeof window !== 'undefined') {
			fetchWeatherPredict(selectedStockId, selectedWeatherType);
		}
		
		return () => setMounted(false);
	}, [selectedStockId, selectedWeatherType])

	useEffect(() => {
		setChartData({
			stockName: stock100.find((stock) => stock.stock_id === selectedStockId).name,
			weatherType: weatherList[selectedTab].ch_name,
		})
	}, [selectedStockId, selectedWeatherType])

	if (!mounted) {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<Loading />
			</div>
		)
	}

	return (
		<StarryBackground className='w-full pt-8 pb-12'>
			<h2 className='mb-6 text-center text-zinc-100'>天氣相關性分析</h2>
			<div className='lg:gap-6 xl:gap-8 lg:flex'>
				{/* 天氣型態 */}
				<section className='w-full pb-3 overflow-y-auto bg-white border-b rounded-t mb:border-none lg:rounded h-28 lg:h-full lg:w-80 xl:w-64 dark:bg-zinc-900/80'>
					<h4 className='py-4 tracking-wide text-center dark:bg-zinc-800'>選擇天氣型態</h4>
					{weatherList.map((weather, index) => (
						<button
							className={`flex items-center mb-2 space-x-1.5 w-full px-3 py-2 hover:bg-primary_yellow/20 ${
								selectedTab === index ? 'bg-primary_yellow/50 dark:bg-primary_yellow/30' : ''
							}`}
							onClick={() => {
								setSelectedWeatherType(weather.en_name.toLowerCase())
								setSelectedTab(index)
							}}
							key={index}
						>
							<Image src={weather.icon} width={30} height={30} alt={weather.ch_name} />
							<span>{weather.ch_name}</span>
						</button>
					))}
				</section>
				<section className='w-full px-8 py-6 bg-white rounded-b dark:bg-zinc-900/50 lg:rounded'>
					<section className='mb-4 flex-center-between'>
						{chartData && (
							<div className='space-x-2 flex-center'>
								<h3 className='inline-flex items-baseline space-x-2'>
									<span>{stockName}</span>
									<span className='text-xl font-light tracking-widest'>{selectedStockId}</span>
								</h3>
								<HtmlTooltip title={<React.Fragment>{weatherList[selectedTab].desc} </React.Fragment>}>
									<p className='px-2.5 py-1 text-xs text-white rounded-full bg-secondary_blue'>{weatherType}</p>
								</HtmlTooltip>
							</div>
						)}
						<StockSelect setSelect={setSelectedStockId} />
					</section>
					{!isLoading && chartData && weather && stockPrice ? (
						<section className='flex flex-wrap items-start space-y-4'>
							<Chart
								option={linearRegOption(stockName, weatherType, weather, stockPrice)}
								customHeight='h-88 md:h-[450px] xl:h-[560px]'
							/>
							<DataGrid
								sx={{ height: 120, pl: 0, pr: 0.1, pt: 0, pb: 1 }}
								rows={[
									{
										id: 1,
										stock_id: selectedStockId,
										stock_name: stockName || null,
										weather: weatherType,
										price: stockInfo.closing_price || null,
										quote_change: stockInfo.change || null,
										week_quote_change: stockInfo.change_week || null,
										volume: stockInfo.trade_volume || null,
										correlation: calculateR(weather, stockPrice),
									},
								]}
								columns={[
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
								]}
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
									<strong>相關係數 (correlation coefficient)</strong>
									：代表兩變數之間線性關係的強度及方向，數值範圍為 -1 ≤ r ≤ 1。
									<ul className='pl-4 list-disc'>
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
