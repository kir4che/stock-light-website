import { Tab, Tabs } from '@mui/material'
import { useState } from 'react'

import CompanyGrowth from '@/components/Analysis/CompanyGrowth'
import CorporateValue from '@/components/Analysis/CorporateValue'
import DividendPolicy from '@/components/Analysis/DividendPolicy'
import FinancialSafety from '@/components/Analysis/FinancialSafety'
import FinancialStatement from '@/components/Analysis/FinancialStatement'
import Profitability from '@/components/Analysis/Profitability'

export default function StockFS(stockId) {
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)

	const renderTabContent = (index) => {
		const components = [
			<FinancialStatement stockId={stockId} />,
			<DividendPolicy stockId={stockId} />,
			<Profitability stockId={stockId} />,
			<CompanyGrowth stockId={stockId} />,
			<FinancialSafety stockId={stockId} />,
			<CorporateValue stockId={stockId} />,
		]
		return components[index]
	}

	return (
		<div className='flex pt-6'>
			<Tabs
				value={selectedTabIndex}
				orientation='vertical'
				sx={{ width: '90px', borderRight: 1, borderColor: 'divider' }}
				TabIndicatorProps={{
					sx: {
						left: 0,
					},
				}}
				onChange={(e, index) => setSelectedTabIndex(index)}
				className='bg-white rounded dark:bg-zinc-800'
			>
				{['基本財報', '股利政策', '獲利能力', '公司成長', '財務安全', '企業價值'].map((tab, index) => (
					<Tab
						label={tab}
						sx={{ height: '24px', alignItems: 'flex-start', textAlign: 'left' }}
						className={`${
							selectedTabIndex === index ? 'dark:text-secondary_blue' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 mb-2 font-normal`}
						key={index}
					/>
				))}
			</Tabs>
			{renderTabContent(selectedTabIndex)}
		</div>
	)
}
