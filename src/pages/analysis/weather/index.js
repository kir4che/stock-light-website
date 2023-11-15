import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'

import { allStock } from '@/data/allStock'
import { useState } from 'react'

export default function WeatherAnalysis() {
	const [selectedStockSymbol, setSelectedStockSymbol] = useState(1101)

	const fetchWeatherPredict = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/weather/predict/${type}/${stockId}`,
				{
					method: 'GET',
				})
			const data = await response.json()
			setStockData(data.data)
		} catch (error) {
			console.error('error', error)
		}
	}
	const WeatherSidebar = [
		{
			id: 1,
			category: 'Sunny',
			icon: 'https://img.icons8.com/emoji/32/sun-emoji.png'
		},
		{
			id: 2,
			category: 'Cloudy',
			icon: 'https://img.icons8.com/office/32/partly-cloudy-day--v1.png'
		},
		{
			id: 3,
			category: 'Rainny',
			icon: 'https://img.icons8.com/external-filled-outline-lima-studio/32/external-rainny-spring-filled-outline-lima-studio.png'
		},
		{
			id: 4,
			category: 'Temperature',
			icon: 'https://img.icons8.com/stickers/32/temperature-low.png'
		},
		{
			id: 5,
			category: 'Humidity',
			icon: 'https://img.icons8.com/office/32/humidity.png'
		},
		{
			id: 6,
			category: 'Precipitation',
			icon: 'https://img.icons8.com/external-microdots-premium-microdot-graphic/32/external-precipitation-weather-forecast-microdots-premium-microdot-graphic-2.png'
		},
	]

	return (
		<StarryBackground className={'w-full pt-8 pb-12 md:pb-20 md:gap-8 md:flex md:pt-14 lg:gap-12'}>
			<div className='flex flex-wrap flex-col'>
				<h2 className='mb-4 text-center text-zinc-100'>天氣相關性分析</h2>
				<ul className='bg-white-500  p-3 hover:bg-cyan-900 '>
					{WeatherSidebar.map((weather) => (
						<button key={weather.id} className='flex flex-wrap flex-col'>
							<img src={weather.icon} className='leading-3'/>
							{weather.category}
						</button>
					))}
				</ul>
			</div>
			<div className='w-full px-8 py-5 bg-white dark:bg-zinc-900/50 md:rounded'>
				<div className='flex-center-between'>
					<div className='flex items-baseline mb-2 space-x-4'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{allStock.find((stock) => stock.symbol === selectedStockSymbol).name || null}</span>
							<span className='text-xl font-light tracking-widest'>{selectedStockSymbol}</span>
						</h3>
					</div>
					<StockSelect value={selectedStockSymbol} onChange={(e) => setSelectedStockSymbol(e.target.value)} />
				</div>
				
			</div>
		</StarryBackground>
	)
}
