import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import { getCurrentDate } from '../../../utils/getCurrentDate'
import Chart from '../../Chart/Chart'
import ChartTable from '../../Chart/ChartTable/ChartTable'
import { linearRegOption } from '../../Chart/options/linearRegOption'
import StockSelect from '../../StockSelector/StockSelector'

export default function Result({ event }) {
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const activeTab = event.tabs[activeTabIndex]

	const handleTabChange = (e, index) => setActiveTabIndex(index)

	const [stock, setStock] = useState('')

	const handleStockSlect = (e) => setStock(e.target.value)

	useEffect(() => {
		setActiveTabIndex(0)
	}, [event])

	return (
		<div className='w-full px-5 pt-6 pb-10 bg-white dark:bg-zinc-900/50 sm:rounded min-w-[72%]'>
			<div className='flex items-end mb-4 space-x-2 tracking-wider'>
				<h3>{event.category}</h3>
				<p className='text-sm opacity-60'>{getCurrentDate()}</p>
			</div>
			<div className='flex items-center justify-between mb-6 space-x-8 md:space-x-16'>
				<Tabs value={activeTabIndex} onChange={handleTabChange} variant='scrollable' scrollButtons={false}>
					{event.tabs.map((tab, index) => (
						<Tab label={tab.label} key={index} />
					))}
				</Tabs>
				<StockSelect value={stock} onChange={handleStockSlect} />
			</div>
			{stock !== '' ? (
				<div className='space-y-8 lg:px-4 xl:px-10'>
					<Chart tab={activeTab} stockSymbol={stock} option={linearRegOption(stock, activeTab)} />
					<div className='space-y-4'>
						<ChartTable tab={activeTab} stockSymbol={stock} />
						<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
					</div>
				</div>
			) : (
				<p>請選擇股票！</p>
			)}
		</div>
	)
}
