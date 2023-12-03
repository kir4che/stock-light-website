import { Tab, Tabs } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

export default function StockFS(stockId) {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)
	const [selectedChildTabIndex, setSelectedChildTabIndex] = useState(0)

	const [fs, setFS] = useState({ assets: null, liabilitiesEquity: null, is: null, cf: null })
	const { assets, liabilitiesEquity, is, cf } = fs

	const fetchData = async (stockId, statementType) => {
		setIsLoading(true)

		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/financial/${statementType}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			console.log('data', data)

			if (data.success) setIsLoading(false)

			return data.data[0]
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockData = async (stockId) => {
		const [assets, liabilitiesEquity, is, cf] = await Promise.all([
			fetchData(stockId, 'assetStatements'),
			fetchData(stockId, 'balanceSheetLiabilitiesEquity'),
			fetchData(stockId, 'cashFlowStatement'),
			fetchData(stockId, 'incomeStatements'),
		])
		setFS({ assets, liabilitiesEquity, is, cf })
	}

	useEffect(() => {
		fetchStockData(stockId.stockId)
	}, [stockId])

	const renderTableRow = (label, value, ycp) => {
		return (
			<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
					{label}
				</TableCell>
				<TableCell align='right'>
					{value}
					<span className={`${parseFloat(ycp) > 0 ? 'text-stock_red' : parseFloat(ycp) < 0 ? 'text-stock_green' : ''}`}>
						（{ycp}）
					</span>
				</TableCell>
			</TableRow>
		)
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
			>
				{['基本財報', '股利政策', '獲利能力', '公司成長', '財務安全', '企業價值'].map((tab, index) => (
					<Tab
						label={tab}
						sx={{ height: '24px' }}
						className={`${
							selectedTabIndex === index ? 'dark:text-secondary_blue' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 mb-2`}
						key={index}
					/>
				))}
			</Tabs>
			<div>
				{/* 基本財報 */}
				{selectedTabIndex === 0 && (
					<>
						<Tabs
							value={selectedChildTabIndex}
							orientation='vertical'
							variant='scrollable'
							scrollButtons='auto'
							sx={{ width: '100px', borderRight: 1, borderColor: 'divider' }}
							TabIndicatorProps={{
								sx: {
									left: 0,
								},
							}}
							onChange={(e, index) => setSelectedChildTabIndex(index)}
						>
							{['營收表', '每股盈餘', '每股淨值', '損益表', '總資產', '負債和股東權益', '現金流量表', '電子書'].map(
								(tab, index) => (
									<Tab
										label={tab}
										sx={{ height: '24px' }}
										className={`${
											selectedChildTabIndex === index ? ' dark:text-secondary_blue' : 'dark:text-zinc-100'
										} hover:bg-sky-300/10 mb-0.5`}
										key={index}
									/>
								)
							)}
						</Tabs>
					</>
				)}
				{/* 股利政策 */}
				{selectedTabIndex === 1 && <></>}
				{/* 獲利能力 */}
				{selectedTabIndex === 2 && <></>}
				{/* 公司成長 */}
				{selectedTabIndex === 3 && <></>}
				{/* 財務安全 */}
				{selectedTabIndex === 4 && <></>}
				{/* 企業價值 */}
				{selectedTabIndex === 5 && <></>}
			</div>
		</div>
	)
}
