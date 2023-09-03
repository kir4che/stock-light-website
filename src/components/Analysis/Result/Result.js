import { Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'
import Chart from '../../Chart/Chart'
import ChartTable from '../../Chart/ChartTable/ChartTable'
import StockSelect from './StockSelect/StockSelect'
import { linearRegOption } from './options/linearRegOption'

const DEFAULT_STOCK = 2330

export default function Result({ event }) {
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const activeTab = event.tabs[activeTabIndex]
	const [stock, setStock] = useState(DEFAULT_STOCK)

	const handleTabChange = (_, tabIndex) => setActiveTabIndex(tabIndex)
	const handleStockChange = (e) => setStock(e.target.value)

	useEffect(() => {
		setActiveTabIndex(0)
	}, [event])

	return (
		<div className='w-full px-5 pt-6 pb-10 bg-white dark:bg-zinc-900/50 rounded min-w-[72%]'>
			<div className='flex items-end mb-4 space-x-2 tracking-wider'>
				<h3>{event.category}</h3>
				<p className='text-sm opacity-60'>{new Date().toLocaleDateString()}</p>
			</div>
			<div className='flex items-center justify-between mb-6 space-x-10 md:space-x-20'>
				<Tabs value={activeTabIndex} onChange={handleTabChange} variant='scrollable' scrollButtons={false}>
					{event.tabs.map((tab, index) => (
						<Tab key={index} label={tab.label} />
					))}
				</Tabs>
				<StockSelect value={stock} onChange={handleStockChange} />
			</div>
			{stock && (
				<div className='space-y-8 lg:px-4 xl:px-10'>
					<Chart tab={activeTab} stock={stock} option={linearRegOption(stock, tab)} />
					<div className='space-y-4'>
						<ChartTable tab={activeTab} stock={stock} />
						<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
					</div>
				</div>
			)}
		</div>
	)
}
