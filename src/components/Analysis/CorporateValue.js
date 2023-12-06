import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'

export default function CorporateValue({ stockId }) {
	const [selectedChildTabIndex, setSelectedChildTabIndex] = useState(0)

	return (
		<Tabs
			value={selectedChildTabIndex}
			orientation='vertical'
			variant='scrollable'
			scrollButtons='auto'
			sx={{ width: '105px', borderRight: 1, borderColor: 'divider' }}
			TabIndicatorProps={{
				sx: {
					left: 0,
				},
			}}
			onChange={(e, index) => setSelectedChildTabIndex(index)}
			className='bg-white rounded dark:bg-zinc-800'
		>
			{['營收表', '每股盈餘', '每股淨值', '損益表', '總資產', '負債和股東權益', '現金流量表', '電子書'].map(
				(tab, index) => (
					<Tab
						label={tab}
						sx={{ height: '24px', alignItems: 'flex-start', textAlign: 'left' }}
						className={`${
							selectedChildTabIndex === index ? ' dark:text-secondary_blue' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 mb-0.5 font-normal`}
						key={index}
					/>
				)
			)}
		</Tabs>
	)
}
