import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'
import StarryBackground from '@/components/common/StarryBackground'
import StockSelect from '@/components/ui/StockSelector'
import { allStock } from '@/data/allStock'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function FundamentalAnalysis() {
	const [isLoading, setIsLoading] = useState(true)

	const [selectedStockSymbol, setSelectedStockSymbol] = useState('1101')
	const [stockData, setStockData] = useState(null)
	const [stockPePb, setStockPePb] = useState(null)

	const fetchStockData = async (stockId) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/all/info`, { method: 'GET' })
			let data = await response.json()
			const filteredData = data.data.filter((stock) => stock.stock_id === parseInt(stockId))
			setStockData(filteredData)
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockPePb = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/${selectedStockSymbol}`, { method: 'GET' })
			const data = await response.json()
			setStockPePb(data.data)
		} catch (error) {
			console.error('error', error)
		}
	}

	useEffect(() => {
		setIsLoading(true)
		fetchStockData(selectedStockSymbol).then(() => {
			console.log('stockData', stockData)
		})
		fetchStockPePb().then(() => {
			console.log('stockPePb', stockPePb)
			setTimeout(() => {
				setIsLoading(false)
			}, 0)
		})
	}, [selectedStockSymbol])

	return (
		<StarryBackground className='w-full pt-8 pb-12 md:pt-10 '>
			<h2 className='mb-4 text-center'>個股基本面分析</h2>
			<div className='w-full py-5 bg-white dark:bg-zinc-900/50 md:rounded'>
				<div className='px-5 mb-4 flex-center-between'>
					<div className='flex items-baseline space-x-3'>
						<h3 className='inline-flex items-baseline space-x-2'>
							<span>{allStock.find((stock) => stock.symbol === selectedStockSymbol).name || null}</span>
							<span className='font-bold'>{selectedStockSymbol}</span>
						</h3>
						<p className='text-sm font-light tracking-widest opacity-60'>{getCurrentDate()}</p>
					</div>
					<StockSelect value={selectedStockSymbol} onChange={(e) => setSelectedStockSymbol(e.target.value)} />
				</div>
				<div className='px-5 mb-4'>
					{!isLoading && stockPePb ? (
						<>
							<div className='flex items-center space-x-4'>
								<button className='px-3 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
									<span className='font-light'>本益比 P/E</span>
									<span className='text-lg font-bold'>{stockPePb.p_e_ratio}</span>
								</button>
								<button className='px-3 space-x-2 rounded-md shadow text-zinc-100 bg-sky-500'>
									<span className='font-light'>本淨比 P/B</span>
									<span className='text-lg font-bold'>{stockPePb.p_b_ratio}</span>
								</button>
							</div>
							{stockData &&
								stockData.map((item, index) => {
									return (
										<div key={item.stock_id}>
											<p>Name: {item.name}</p>
											<p>Trade Volume: {item.trade_volume}</p>
											{/* 其他属性的渲染 */}
										</div>
									)
								})}
						</>
					) : (
						<Loading />
					)}
					{/* <Chart option={lineOption(data)} /> */}
					<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</div>
			</div>
		</StarryBackground>
	)
}
