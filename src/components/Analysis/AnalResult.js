import { Box, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import LinearRegChart from './LinearRegChart'
import LogRegChart from './LogRegChart'
import RegTable from './RegTable'

export default function AnalResult(props) {
	const event = props.event

	const [activeTabIndex, setActiveTabIndex] = useState(0)

	const handleChangeActive = (event, tabIndex) => {
		setActiveTabIndex(tabIndex)
	}

	const [activeTab, setActiveTab] = useState(event.tabs[activeTabIndex])

	useEffect(() => {
		setActiveTabIndex(0) // 當 event 值變化時，將 activeTabIndex 設回預設值0
		setActiveTab(event.tabs[0])
		setStock(2330)
	}, [event])

	useEffect(() => {
		setActiveTab(event.tabs[activeTabIndex])
		setStock(stock)
	}, [activeTabIndex, event.tabs, stock])

	const [stock, setStock] = useState(2330)

	const handleChangeStock = (event) => {
		setStock(event.target.value)
	}

	return (
		<div className='px-3 pt-6 pb-16 mb-20 bg-white rounded w-[70vw]'>
			<div className='flex items-end mb-1 space-x-2 tracking-wider'>
				<h3 className='pl-3 font-medium'>{event.category}</h3>
				<p className='text-sm opacity-80'>
					{new Date().getFullYear()}/{new Date().getMonth() + 1}/{new Date().getDate()}
				</p>
			</div>
			<div className='relative px-2'>
				<div className='flex items-center justify-between pt-3 mb-6 space-x-10'>
					<Tabs value={activeTabIndex} onChange={handleChangeActive} variant='scrollable' scrollButtons={false}>
						{event.tabs.length > 0 ? event.tabs.map((tab, i) => <Tab key={i} label={tab.label} />) : 'null'}
					</Tabs>
					<Box sx={{ minWidth: 150 }}>
						<FormControl sx={{ minWidth: 150 }} size='small'>
							<InputLabel id='demo-select-small-label'>股票</InputLabel>
							<Select
								labelId='demo-select-small-label'
								id='demo-select-small'
								value={stock}
								label='股票'
								onChange={handleChangeStock}
							>
								<MenuItem value={2330}>2330 台積電</MenuItem>
								<MenuItem value={2454}>2454 聯發科</MenuItem>
								<MenuItem value={2603}>2603 長榮</MenuItem>
								<MenuItem value={2880}>2880 華南金</MenuItem>
								<MenuItem value={3008}>3008 大立光</MenuItem>
							</Select>
						</FormControl>
					</Box>
				</div>
			</div>

			{
				// 股票分析＿不做迴歸分析
				event.category != '股票分析' ? (
					stock != 0 && !activeTab.isLogReg ? (
						<>
							<div className='h-[480px] px-4'>
								<LinearRegChart tab={activeTab} stock={stock} />
							</div>
							<div className='px-5 mt-6 space-y-5'>
								<RegTable stock={stock} />
								<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
							</div>
						</>
					) : (
						<>
							<div className='h-[480px] px-4'>
								<LogRegChart tab={activeTab} stock={stock} />
							</div>
							<div className='px-5 mt-6 space-y-5'>
								<RegTable stock={stock} />
								<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
							</div>
						</>
					)
				) : activeTab.label == '基本面－財務指標技術雷達' ? (
					<Image src='/images/stock-analysis-chart/基本面 - 財務指標技術雷達.png' width={400} hieght={400} alt={''} />
				) : activeTab.label == '本益比成長' ? (
					<div className='w-full space-y-8'>
						<Image
							src='/images/stock-analysis-chart/基本面 - 策略回測分析-本益比成長.png'
							width={400}
							hieght={400}
							alt={''}
						/>
						<Image
							src='/images/stock-analysis-chart/基本面 - 策略回測分析-本益比成長 2.png'
							width={400}
							hieght={400}
							alt={''}
						/>
						<Image
							src='/images/stock-analysis-chart/基本面 - 策略回測分析-本益比成長 3.png'
							width={400}
							hieght={400}
							alt={''}
						/>
					</div>
				) : activeTab.label == '類股漲跌幅' ? (
					<Image src='/images/stock-analysis-chart/基本面 - 漲跌幅板塊圖.png' width={400} hieght={400} alt={''} />
				) : activeTab.label == '策略部位旭日圖' ? (
					<Image src='/images/stock-analysis-chart/基本面 - 策略部位旭日圖.png' width={400} hieght={400} alt={''} />
				) : activeTab.label == '技術面－技術指標圖組' ? (
					<Image src='/images/stock-analysis-chart/技術面 - 技術指標圖組.png' width={400} hieght={400} alt={''} />
				) : activeTab.label == '股價站在十日均線之上' ? (
					<Image
						src='/images/stock-analysis-chart/技術面 - 股價站在十日均線之上.png'
						width={400}
						hieght={400}
						alt={''}
					/>
				) : null
			}
		</div>
	)
}
