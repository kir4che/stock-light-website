import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useState } from 'react'

import AnalChart from '@/components/Analysis/AnalChart'
import AnalTable from '@/components/Analysis/AnalTable'
import SelectBox from '@/components/Analysis/SelectBox'

export default function AnalResult(props) {
	const event = props.event

	const [activeTabIndex, setActiveTabIndex] = useState(0)

	const handleChange = (event, tabIndex) => {
		setActiveTabIndex(tabIndex)
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
				<div className='flex items-center justify-between pt-3 mb-5'>
					<Box sx={{ width: '100%' }}>
						<Tabs value={activeTabIndex} onChange={handleChange}>
							{event.sub_category.length > 0
								? event.sub_category.map((tab, i) => {
										return <Tab key={i} label={tab.label} />
								  })
								: ''}
						</Tabs>
					</Box>
					<SelectBox />
				</div>
			</div>
			<div className='h-[480px] px-4'>
				<AnalChart />
			</div>
			<div className='px-5 mt-6 space-y-5'>
				<AnalTable />
				<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
		</div>
	)
}
