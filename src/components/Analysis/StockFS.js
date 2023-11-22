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

	const [bs, setBS] = useState(null) // 資產負債表
	const [is, setIS] = useState(null) // 損益表
	const [cf, setCF] = useState(null) // 現金流量表

	const handleTabSelect = (e, index) => setSelectedTabIndex(index)

	const fetchData = async (stockId, statementType, setData) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/${statementType}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setData(data.data[0])
			setIsLoading(false)
		} catch (error) {
			console.error('error', error)
		}
	}

	const fetchStockData = async (stockId) => {
		setIsLoading(true)

		await Promise.all([
			fetchData(stockId, 'balance_sheet', setBS),
			fetchData(stockId, 'income_statement', setIS),
			fetchData(stockId, 'cash_flow_statement', setCF),
		])
	}

	useEffect(() => {
		fetchStockData(stockId.stockId)
	}, [stockId])

	return (
		<div className='flex gap-8 pt-6'>
			<Tabs value={selectedTabIndex} onChange={handleTabSelect} orientation='vertical'>
				{['損益表', '資產負債表', '現金流量表'].map((tab, index) => (
					<Tab
						label={tab}
						className={`${
							selectedTabIndex === index ? 'bg-secondary_blue/10 dark:text-secondary_blue' : 'dark:text-zinc-100'
						} hover:bg-sky-300/10 mb-2 `}
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
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													收益
												</TableCell>
												<TableCell align='right'>
													{is.income}
													<span
														className={`${
															parseFloat(is.income_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.income_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.income_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													營業費用
												</TableCell>
												<TableCell align='right'>
													{is.operating_expenses}
													<span
														className={`${
															parseFloat(is.operating_expenses_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.operating_expenses_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.operating_expenses_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													淨利
												</TableCell>
												<TableCell align='right'>
													{is.net_income}
													<span
														className={`${
															parseFloat(is.net_income_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.net_income_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.net_income_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													淨利潤率
												</TableCell>
												<TableCell align='right'>
													{is.net_income_rate}
													<span
														className={`${
															parseFloat(is.net_income_rate_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.net_income_rate_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.net_income_rate_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													每股盈餘
												</TableCell>
												<TableCell align='right'>
													{is.eps}
													<span
														className={`${
															parseFloat(is.eps_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.eps_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.eps_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													營業資金流動
												</TableCell>
												<TableCell align='right'>
													{is.operating_capital_flow}
													<span
														className={`${
															parseFloat(is.operating_capital_flow_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.operating_capital_flow_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.operating_capital_flow_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													有效稅率
												</TableCell>
												<TableCell align='right'>
													{is.valid_tax_rate}
													<span
														className={`${
															parseFloat(is.valid_tax_rate_ycp) > 0
																? 'text-stock_red'
																: parseFloat(is.valid_tax_rate_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{is.valid_tax_rate_ycp}）
													</span>
												</TableCell>
											</TableRow>
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
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													現金及短期投資
												</TableCell>
												<TableCell align='right'>
													{bs.cash_and_short_term_investment}
													<span
														className={`${
															parseFloat(bs.cash_and_short_term_investment_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.cash_and_short_term_investment_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.cash_and_short_term_investment_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													總資產
												</TableCell>
												<TableCell align='right'>
													{bs.total_assets}
													<span
														className={`${
															parseFloat(bs.total_assets_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.total_assets_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.total_assets_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													總負債
												</TableCell>
												<TableCell align='right'>
													{bs.total_debts}
													<span
														className={`${
															parseFloat(bs.total_debts_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.total_debts_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.total_debts_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													總權益
												</TableCell>
												<TableCell align='right'>
													{bs.total_equitys}
													<span
														className={`${
															parseFloat(bs.total_equitys_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.total_equitys_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.total_equitys_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													流通股份
												</TableCell>
												<TableCell align='right'>
													{bs.tradable_shares}
													<span
														className={`${
															parseFloat(bs.tradable_shares_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.tradable_shares_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.tradable_shares_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													股價淨值比
												</TableCell>
												<TableCell align='right'>
													{bs.pb_ratio}
													<span
														className={`${
															parseFloat(bs.pb_ratio_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.pb_ratio_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.pb_ratio_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													資產報酬率
												</TableCell>
												<TableCell align='right'>
													{bs.roa}
													<span
														className={`${
															parseFloat(bs.roa_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.roa_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.roa_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													資本報酬率
												</TableCell>
												<TableCell align='right'>
													{bs.roc}
													<span
														className={`${
															parseFloat(bs.roc_ycp) > 0
																? 'text-stock_red'
																: parseFloat(bs.roc_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{bs.roc_ycp}）
													</span>
												</TableCell>
											</TableRow>
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
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													淨利
												</TableCell>
												<TableCell align='right'>
													{cf.net_income}
													<span
														className={`${
															parseFloat(cf.net_income_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.net_income_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.net_income_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													營運現金
												</TableCell>
												<TableCell align='right'>
													{cf.operating_cash}
													<span
														className={`${
															parseFloat(cf.operating_cash_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.operating_cash_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.operating_cash_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													投資現金
												</TableCell>
												<TableCell align='right'>
													{cf.investment_cash}
													<span
														className={`${
															parseFloat(cf.investment_cash_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.investment_cash_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.investment_cash_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													融資現金
												</TableCell>
												<TableCell align='right'>
													{cf.financing_cash}
													<span
														className={`${
															parseFloat(cf.financing_cash_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.financing_cash_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.financing_cash_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													現金變動淨額
												</TableCell>
												<TableCell align='right'>
													{cf.net_change_in_cash}
													<span
														className={`${
															parseFloat(cf.net_change_in_cash_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.net_change_in_cash_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.net_change_in_cash_ycp}）
													</span>
												</TableCell>
											</TableRow>
											<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
												<TableCell component='th' scope='row' className='bg-primary_yellow/30'>
													自由現金流
												</TableCell>
												<TableCell align='right'>
													{cf.free_cash_flow}
													<span
														className={`${
															parseFloat(cf.free_cash_flow_ycp) > 0
																? 'text-stock_red'
																: parseFloat(cf.free_cash_flow_ycp) < 0
																? 'text-stock_green'
																: ''
														}`}
													>
														（{cf.free_cash_flow_ycp}）
													</span>
												</TableCell>
											</TableRow>
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
