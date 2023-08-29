import { Box, FormControl, InputLabel, MenuItem, Select, Tab, Tabs } from '@mui/material'
import { useEffect, useState } from 'react'

export default function AnalResult({ event }) {
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [stock, setStock] = useState(2330)

	const handleChangeActive = (tabIndex) => setActiveTabIndex(tabIndex)
	const handleChangeStock = (event) => setStock(event.target.value)

	useEffect(() => {
		setActiveTabIndex(0)
	}, [event])

	useEffect(() => {
		if (activeTabIndex < 0) setActiveTabIndex(0)
		else if (activeTabIndex > event.tabs.length - 1) setActiveTabIndex(event.tabs.length - 1)
	}, [activeTabIndex, event])

	return (
		<div className='w-full px-4 pt-6 bg-white rounded min-w-[72%]'>
			<div className='flex items-end mb-1 space-x-2 tracking-wider'>
				<h3 className='pl-3'>{event.category}</h3>
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
		</div>
	)
}
