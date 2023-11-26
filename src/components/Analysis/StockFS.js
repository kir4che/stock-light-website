import { Tab, Tabs } from '@mui/material'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import { useEffect, useState } from 'react'

import Loading from '@/components/common/Loading'
import { getQuarterFromDate } from '@/utils/getQuarterFromDate'

export default function StockFS(stockId) {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedTabIndex, setSelectedTabIndex] = useState(0)

	const [fs, setFS] = useState({ bs: null, is: null, cf: null })
	const { bs, is, cf } = fs

	const handleTabSelect = (e, index) => setSelectedTabIndex(index)

	const fetchData = async (stockId, statementType) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/${statementType}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			return data.data[0]
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockData = async (stockId) => {
		const [bs, is, cf] = await Promise.all([
			fetchData(stockId, 'balance_sheet'),
			fetchData(stockId, 'income_statement'),
			fetchData(stockId, 'cash_flow_statement'),
		])
		setFS({ bs, is, cf })

		setIsLoading(false)
	}

	useEffect(() => {
		setIsLoading(true)
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
		<div className='flex gap-4 pt-6 xs:gap-8'>
			<Tabs value={selectedTabIndex} onChange={handleTabSelect} orientation='vertical'>
				{['損益表', '資產負債表', '現金流量表'].map((tab, index) => (
					<Tab
						label={tab}
						className={`${
							selectedTabIndex === index ? 'bg-secondary_blue/10 dark:text-secondary_blue' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 mb-2 [writing-mode:vertical-rl] xs:[writing-mode:unset]`}
						key={index}
					/>
				))}
			</Tabs>
			<div>
				{!isLoading ? (
					<>
						{selectedTabIndex === 0 && is && (
							<>
								<h4 className='flex items-center mb-8 space-x-1'>
									<span>損益表</span>
									<button className='px-2 py-0.5 text-sm font-normal rounded-full bg-primary_yellow'>
										{getQuarterFromDate(is.date)}
									</button>
								</h4>
								<TableContainer className='md:items-start md:gap-8 md:flex'>
									<Table>
										<TableBody>
											{renderTableRow('營業收入', is.income, is.income_ycp)}
											{renderTableRow('營業費用', is.operating_expenses, is.operating_expenses_ycp)}
											{renderTableRow('營業利益', is.net_income, is.net_income_ycp)}
											{renderTableRow('淨利率', is.net_income_rate, is.net_income_rate_ycp)}
											{renderTableRow('每股盈餘', is.eps, is.eps_ycp)}
											{renderTableRow('營業資金流動', is.operating_capital_flow, is.operating_capital_flow_ycp)}
											{renderTableRow('有效稅率', is.valid_tax_rate, is.valid_tax_rate_ycp)}
										</TableBody>
									</Table>
								</TableContainer>
							</>
						)}
						{selectedTabIndex === 1 && bs && (
							<>
								<h4 className='flex items-center mb-8 space-x-1'>
									<span>資產負債表</span>
									<button className='px-2 py-0.5 text-sm font-normal rounded-full bg-primary_yellow'>
										{getQuarterFromDate(bs.date)}
									</button>
								</h4>
								<TableContainer className='md:items-start md:gap-8 md:flex'>
									<Table>
										<TableBody>
											{renderTableRow(
												'現金及短期投資',
												bs.cash_and_short_term_investment,
												bs.cash_and_short_term_investment_ycp
											)}
											{renderTableRow('總資產', bs.total_assets, bs.total_assets_ycp)}
											{renderTableRow('總負債', bs.total_debts, bs.total_debts_ycp)}
											{renderTableRow('總權益', bs.total_equitys, bs.total_equitys_ycp)}
											{renderTableRow('流通股份', bs.tradable_shares, bs.tradable_shares_ycp)}
											{renderTableRow('股價淨值比', bs.pb_ratio, bs.pb_ratio_ycp)}
											{renderTableRow('資產報酬率', bs.roa, bs.roa_ycp)}
											{renderTableRow('資本報酬率', bs.roc, bs.roc_ycp)}
										</TableBody>
									</Table>
								</TableContainer>
							</>
						)}
						{selectedTabIndex === 2 && cf && (
							<>
								<h4 className='flex items-center mb-8 space-x-1'>
									<span>現金流量表</span>
									<button className='px-2 py-0.5 text-sm font-normal rounded-full bg-primary_yellow'>
										{getQuarterFromDate(cf.date)}
									</button>
								</h4>
								<TableContainer className='md:items-start md:gap-8 md:flex'>
									<Table>
										<TableBody>
											{renderTableRow('淨利', cf.net_income, cf.net_income_ycp)}
											{renderTableRow('營運現金', cf.operating_cash, cf.operating_cash_ycp)}
											{renderTableRow('投資現金', cf.investment_cash, cf.investment_cash_ycp)}
											{renderTableRow('融資現金', cf.financing_cash, cf.financing_cash_ycp)}
											{renderTableRow('現金變動淨額', cf.net_change_in_cash, cf.net_change_in_cash_ycp)}
											{renderTableRow('自由現金流', cf.free_cash_flow, cf.free_cash_flow_ycp)}
										</TableBody>
									</Table>
								</TableContainer>
							</>
						)}
					</>
				) : (
					<Loading />
				)}
			</div>
		</div>
	)
}
