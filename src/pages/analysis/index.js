import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { Tab, Tabs } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import Sidebar from '../../components/Analysis/Sidebar/Sidebar'
import Chart from '../../components/Chart/Chart'
import { linearRegOption } from '../../components/Chart/options/linearRegOption'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import StockSelect from '../../components/StockSelector/StockSelector'
import { analEvent } from '../../data/analEvent.js'
import { getCurrentDate } from '../../utils/getCurrentDate'

const columns = [
	{ field: 'stock_id', headerName: '代號', flex: 1 },
	{ field: 'stock_name', headerName: '股票', flex: 1 },
	{
		field: 'price',
		headerName: '股價',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		valueFormatter: (params) => `${params.value.toFixed(2)}`,
		cellClassName: (params) => {
			const changeValue = params.row.quote_change || 0
			return changeValue > 0 ? 'text-stock_red' : changeValue < 0 ? 'text-stock_green' : ''
		},
	},
	{
		field: 'quote_change_percent',
		headerName: '漲跌幅 (%)',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{`${value.toFixed(2)}%`}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{`${Math.abs(value.toFixed(2))}%`}</span>
					</p>
				)
			} else return `${value.toFixed(2)}%`
		},
	},
	{
		field: 'week_quote_change_percent',
		headerName: '週漲跌幅 (%)',
		headerAlign: 'right',
		align: 'right',
		flex: 1,
		renderCell: (params) => {
			const value = params.value || 0
			if (value > 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_red'>
						<ArrowDropUpIcon color='error' />
						<span>{`${value.toFixed(2)}%`}</span>
					</p>
				)
			} else if (value < 0) {
				return (
					<p className='flex items-center space-x-0.5 text-stock_green'>
						<ArrowDropDownIcon color='success' />
						<span>{`${Math.abs(value.toFixed(2))}%`}</span>
					</p>
				)
			} else return `${value.toFixed(2)}%`
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

export default function Analysis() {
	// 預設選單中的第一個選項
	const [activeSidebarIndex, setActiveSidebarIndex] = useState(1)
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [selectedStockSymbol, setSelectedStockSymbol] = useState('1101')

	const handleSidebarActive = (index) => setActiveSidebarIndex(index)
	const handleTabActive = (e, index) => setActiveTabIndex(index)
	const handleStockSelect = (e) => setSelectedStockSymbol(e.target.value)

	useEffect(() => {
		setActiveTabIndex(0)
	}, [activeSidebarIndex])

	return (
		<StarryBackground className={'w-full pt-8 pb-12 md:pb-20 md:gap-8 md:flex md:justify-between md:pt-14 lg:gap-12'}>
			<Sidebar activeIndex={activeSidebarIndex} handleActive={handleSidebarActive} />
			<div className='w-full pt-6 pb-12 bg-white dark:bg-zinc-900/50 sm:rounded min-w-[72%]'>
				<div className='flex items-center justify-between px-5 mb-4'>
					<h3 className='inline-flex items-end tracking-wider'>
						{analEvent[activeSidebarIndex - 1].category}
						<span className='ml-2 text-sm opacity-60'>{getCurrentDate()}</span>
					</h3>
					<StockSelect value={selectedStockSymbol} onChange={handleStockSelect} />
				</div>
				<Tabs
					variant='scrollable'
					value={activeTabIndex}
					onChange={handleTabActive}
					className='mb-8 bg-white rounded shadow-md dark:bg-zinc-800 hover:bg-sky-300/10'
					scrollButtons
				>
					{analEvent[activeSidebarIndex - 1].tabs.map((tab, index) => (
						<Tab
							label={tab.label}
							className={`${
								activeTabIndex === index ? 'dark:text-secondary_blue bg-secondary_blue/10' : 'dark:text-zinc-100'
							} hover:bg-sky-300/10 `}
							key={index}
						/>
					))}
				</Tabs>
				<div className='px-5'>
					<Chart
						option={linearRegOption(selectedStockSymbol, analEvent[activeSidebarIndex - 1].tabs[activeTabIndex])}
					/>
					<DataGrid
						sx={{ height: 135, pl: 2, pr: 3, pt: 0.5, pb: 1 }}
						rows={[
							{
								id: 1,
								stock_id: selectedStockSymbol,
								stock_name: '台泥',
								price: 34.5,
								quote_change_percent: 2.26,
								week_quote_change_percent: 0.38,
								volume: 32099068,
								correlation: -0.019,
							},
						]}
						columns={columns}
						className='mt-10 mb-4 bg-white border-none dark:bg-zinc-800 dark:text-zinc-200'
						disableColumnFilter
						disableRowSelectionOnClick
						disableColumnMenu
						hideFooter
					/>
					<p className='text-xs text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
				</div>
			</div>
		</StarryBackground>
	)
}
