import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useEffect, useState } from 'react'

import AnalChart from '@/components/Analysis/AnalChart'
import AnalTable from '@/components/Analysis/AnalTable'
import SelectBox from '@/components/Analysis/SelectBox'

export default function AnalResult(props) {
	const event = props.event

	const [activeTabIndex, setActiveTabIndex] = useState(0)

	const handleChangeActive = (event, tabIndex) => {
		setActiveTabIndex(tabIndex)
	}

	useEffect(() => {
		setActiveTabIndex(0) // 當 event 值變化時，將 activeTabIndex 設回預設值0
	}, [event])

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
					<SelectBox />
				</div>
			</div>
			<div className='h-[480px] px-4'>
				<AnalChart tab={event.tabs[activeTabIndex]} />
			</div>
			<div className='px-5 mt-6 space-y-5'>
				<AnalTable />
				<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
		</div>
	)
}
