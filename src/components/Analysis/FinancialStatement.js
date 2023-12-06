import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { groupedBarOption } from '@/components/Chart/options/groupedBarOption'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'

export default function FinancialStatement({ stockId, childOpen }) {
	const [selectedChart, setSelectedChart] = useState(0)

	const [FSData, setFSData] = useState({
		assetStatements: [],
		liabilityEquityStatements: [],
		cashFlowStatements: [],
		incomeStatements: [],
	})
	const [eReport, setEReport] = useState([])

	const [chartData, setChartData] = useState({
		dates: [],
		revenues: [],
		epss: [],
		epsT4Qs: [],
		navs: [],
		incomes: [],
		assets: [],
		currentAssets: [],
		liabilitiesEquities: [],
		liabilities: [],
		equities: [],
		cashFlows: [],
		cashFlowsByStock: [],
	})
	const {
		dates,
		revenues,
		epss,
		epsT4Qs,
		navs,
		incomes,
		assets,
		currentAssets,
		liabilitiesEquities,
		liabilities,
		equities,
		cashFlows,
		cashFlowsByStock,
	} = chartData

	const fetchFinancialStatement = async (endpoint, dataKey) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/financial/${endpoint}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			console.log('test: ', data)

			if (data.success === false) {
				console.error('Error: ', data.errorMessage)
				return
			}

			setFSData((prevData) => ({
				...prevData,
				[dataKey]: data.data.map((item, index) => ({ id: index, ...item })).reverse(),
			}))

			setChartData({ dates: data.data.map((item) => `${item.year} Q${item.quarter}`) })

			if (endpoint === 'incomeStatements') {
				const incomeDataArray = data.data.map((item) => ({
					revenue: item.revenue,
					grossProfit: item.grossProfit,
					operatingIncome: item.operatingIncome,
					profitBeforeTax: item.profitBeforeTax,
					netIncome: item.netIncome,
					netIncomeAttributableToOwners: item.netIncomeAttributableToOwnersOfTheParent,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					...parseFinancialData(data.data, 'revenues', 'revenue'),
					...parseFinancialData(data.data, 'epss', 'eps'),
					...parseFinancialData(data.data, 'epsT4Qs', 'epsT4Q'),
					incomes: Object.keys(incomeDataArray[0]).map((metric) => {
						return incomeDataArray.map((item) => item[metric])
					}),
				}))
			} else if (endpoint === 'assetStatements') {
				const assetDataArray = data.data.map((item) => ({
					currentAssets: item.currentAssets,
					longTermInvestment: item.longTermInvestment,
					fixedAssets: item.fixedAssets,
					assets: item.assets,
				}))

				const currentAssetsDataArray = data.data.map((item) => ({
					cashAndCashEquivalents: item.cashAndCashEquivalents,
					shortTermInvestment: item.shortTermInvestment,
					accountsAndNotesReceivable: item.accountsAndNotesReceivable,
					inventories: item.inventories,
					currentAssets: item.currentAssets,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					assets: Object.keys(assetDataArray[0]).map((metric) => {
						return assetDataArray.map((item) => item[metric])
					}),
					currentAssets: Object.keys(currentAssetsDataArray[0]).map((metric) => {
						return currentAssetsDataArray.map((item) => item[metric])
					}),
				}))
			} else if (endpoint === 'balanceSheetLiabilitiesEquity') {
				const liabilitiesEquityDataArray = data.data.map((item) => ({
					currentLiabilities: item.currentLiabilities,
					longTermLiabilities: item.longTermLiabilities,
					equity: item.equity,
				}))

				const liabilityDataArray = data.data.map((item) => ({
					shortTermBorrowings: item.shortTermBorrowings,
					shortTermNotesAndBillsPayable: item.shortTermNotesAndBillsPayable,
					accountsAndNotesPayable: item.accountsAndNotesPayable,
					advanceReceipts: item.advanceReceipts,
					longTermLiabilitiesCurrentPortion: item.longTermLiabilitiesCurrentPortion,
					longTermLiabilities: item.longTermLiabilities,
					liabilities: item.liabilities,
				}))

				const equityDataArray = data.data.map((item) => ({
					commonStocks: item.commonStocks,
					retainedEarnings: item.retainedEarnings,
					equity: item.equity,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					...parseFinancialData(data.data, 'navs', 'nav'),
					liabilitiesEquities: Object.keys(liabilitiesEquityDataArray[0]).map((metric) => {
						return liabilitiesEquityDataArray.map((item) => item[metric])
					}),
					liabilities: Object.keys(liabilityDataArray[0]).map((metric) => {
						return liabilityDataArray.map((item) => item[metric])
					}),
					equities: Object.keys(equityDataArray[0]).map((metric) => {
						return equityDataArray.map((item) => item[metric])
					}),
				}))
			} else if (endpoint === 'cashFlowStatement') {
				const cashFlowDataArray = data.data.map((item) => ({
					operatingCashFlow: item.operatingCashFlow,
					investingCashFlow: item.investingCashFlow,
					financingCashFlow: item.financingCashFlow,
					freeCashFlow: item.freeCashFlow,
					netCashFlow: item.netCashFlow,
				}))

				const cashFlowByStockDataArray = data.data.map((item) => ({
					operatingCashFlowPerShare: item.operatingCashFlowPerShare,
					investingCashFlowPerShare: item.investingCashFlowPerShare,
					financingCashFlowPerShare: item.financingCashFlowPerShare,
					freeCashFlowPerShare: item.freeCashFlowPerShare,
					netCashFlowPerShare: item.netCashFlowPerShare,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					cashFlows: Object.keys(cashFlowDataArray[0]).map((metric) => {
						return cashFlowDataArray.map((item) => item[metric])
					}),
					cashFlowsByStock: Object.keys(cashFlowByStockDataArray[0]).map((metric) => {
						return cashFlowByStockDataArray.map((item) => item[metric])
					}),
				}))
			} else return
		} catch (error) {
			console.error('Error fetching data: ', error)
		}
	}

	const fetchEReport = async () => {
		try {
			const responce = await fetch(`${process.env.DB_URL}/api/stock/history/financial_statement/${stockId}`, {
				method: 'GET',
			})
			const data = await responce.json()
			setEReport(data.data.reverse())
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		setSelectedChart(0)

		switch (true) {
			case childOpen.營收表:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.每股盈餘:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.每股淨值:
				fetchFinancialStatement('balanceSheetLiabilitiesEquity', 'liabilityEquityStatements')
				break
			case childOpen.損益表:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.總資產:
				fetchFinancialStatement('assetStatements', 'assetStatements')
				break
			case childOpen.負債和股東權益:
				fetchFinancialStatement('balanceSheetLiabilitiesEquity', 'liabilityEquityStatements')
				break
			case childOpen.現金流量表:
				fetchFinancialStatement('cashFlowStatement', 'cashFlowStatements')
				break
			case childOpen.電子書:
				fetchEReport()
				break
			default:
				break
		}
	}, [stockId, childOpen])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.營收表 && (
				<section className='space-y-4'>
					<Chart
						option={groupedBarOption('營業收入', revenues)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table size='medium'>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 '>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '102px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '87px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>營業收入</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.revenue).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.每股盈餘 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 0
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(0)}
						>
							單季
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							近四季
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={groupedBarOption('每股盈餘(EPS)', selectedChart === 0 ? epss : epsT4Qs)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 '>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '102px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
										>
											年度 / 季度
										</TableCell>
										{FSData.incomeStatements.map((item) => (
											<TableCell
												align='right'
												sx={{
													width: '100%',
													minWidth: '87px',
												}}
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>{`${item.year} Q${item.quarter}`}</TableCell>
										))}
									</TableRow>
									{selectedChart === 0 ? (
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>單季EPS</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{item.eps}
												</TableCell>
											))}
										</TableRow>
									) : (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													近四季EPS
												</TableCell>
												{FSData.incomeStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{item.epsT4Q}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell
													align='right'
													sx={{
														width: '100%',
														minWidth: '132px',
													}}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												>
													近四季平均EPS
												</TableCell>
												{FSData.incomeStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{item.epsT4QAvg}
													</TableCell>
												))}
											</TableRow>
										</>
									)}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.每股淨值 && (
				<section className='space-y-4'>
					<Chart option={groupedBarOption('每股淨值', navs)} customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]' />
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 '>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '102px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.liabilityEquityStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '87px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>每股淨值</TableCell>
									{FSData.liabilityEquityStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{item.nav}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.損益表 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'損益表',
							dates,
							['營收', '毛利', '營業利益', '稅前淨利', '稅後淨利', '母公司業主淨利'],
							incomes
						)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 '>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '102px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>營業收入</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.revenue).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>毛利</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.grossProfit).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>銷售費用</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.sellingExpenses).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>管理費用</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.administrativeExpenses).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>研發費用</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.researchAndDevelopmentExpenses).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>營業費用</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.operatingExpenses).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>營業利益</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.operatingIncome).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>稅前淨利</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.profitBeforeTax).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>稅後淨利</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.netIncome).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										母公司業主淨利
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseInt(item.netIncomeAttributableToOwners).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.總資產 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 0
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(0)}
						>
							資產項目
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							流動資產細項
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								selectedChart === 0 ? '資產表' : '流動資產表',
								dates,
								selectedChart === 0
									? ['流動資產', '長期投資', '固定資產', '總資產']
									: ['現金及約當現金', '短期投資', '應收帳款及票據', '存貨', '流動資產'],
								selectedChart === 0 ? assets : currentAssets
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 '>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '132px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
										>
											年度 / 季度
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>{`${item.year} Q${item.quarter}`}</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											現金及約當現金
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(item.cashAndCashEquivalents).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>短期投資</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(item.shortTermInvestment).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											應收帳款及票據
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(item.accountsAndNotesReceivable).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>存貨</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(item.inventories).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											其餘流動資產
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(
													item.currentAssets -
														item.cashAndCashEquivalents -
														item.shortTermInvestment -
														item.accountsAndNotesReceivable -
														item.inventories
												).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>流動資產</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseInt(item.currentAssets).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									{selectedChart === 0 && (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													長期投資
												</TableCell>
												{FSData.assetStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.longTermInvestment).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													固定資產
												</TableCell>
												{FSData.assetStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.fixedAssets).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													其餘資產
												</TableCell>
												{FSData.assetStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(
															item.assets - item.currentAssets - item.longTermInvestment - item.fixedAssets
														).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													總資產
												</TableCell>
												{FSData.assetStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.assets).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
										</>
									)}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.負債和股東權益 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 0
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(0)}
						>
							負債和股東權益
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							負債
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 2
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(2)}
						>
							股東權益
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								selectedChart === 0 ? '負債和股東權益表' : selectedChart === 1 ? '負債表' : '股東權益表',
								dates,
								selectedChart === 0
									? ['流動負債', '長期負債', '淨值']
									: selectedChart === 1
									? [
											'短期借款',
											'應付短期票券',
											'應付帳款及票據',
											'預收款項',
											'一年內到期長期負債',
											'長期負債',
											'總負債',
									  ]
									: ['普通股股本', '保留盈餘', '淨值'],
								selectedChart === 0 ? liabilitiesEquities : selectedChart === 1 ? liabilities : equities
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 '>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '132px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
										>
											年度 / 季度
										</TableCell>
										{FSData.liabilityEquityStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>{`${item.year} Q${item.quarter}`}</TableCell>
										))}
									</TableRow>
									{selectedChart === 0 || selectedChart === 1 ? (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													短期借款
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.shortTermBorrowings).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													應付短期票券
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.shortTermNotesAndBillsPayable).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													應付帳款及票據
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.accountsAndNotesPayable).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													預收款項
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.advanceReceipts).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													一年內到期長期負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.longTermLiabilitiesCurrentPortion).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													其餘流動負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(
															item.currentLiabilities -
																item.shortTermBorrowings -
																item.shortTermNotesAndBillsPayable -
																item.accountsAndNotesPayable -
																item.advanceReceipts -
																item.longTermLiabilitiesCurrentPortion
														).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													流動負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.currentLiabilities).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													長期負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.longTermLiabilities).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													其餘負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(
															item.liabilities - item.currentLiabilities - item.longTermLiabilities
														).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													總負債
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.liabilities).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
										</>
									) : null}
									{selectedChart === 2 && (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													普通股股本
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.commonStocks).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													保留盈餘
												</TableCell>
												{FSData.liabilityEquityStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.retainedEarnings).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
										</>
									)}
									{selectedChart === 0 || selectedChart === 2 ? (
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>淨值</TableCell>
											{FSData.liabilityEquityStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseInt(item.equity).toLocaleString()}
												</TableCell>
											))}
										</TableRow>
									) : null}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.現金流量表 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 0
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(0)}
						>
							現金流量表
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							每股現金流量表
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								selectedChart === 0 ? '現金流量表' : '每股現金流量表',
								dates,
								selectedChart === 0
									? ['營業現金流', '投資現金流', '融資現金流', '自由現金流', '淨現金流']
									: ['每股營業現金流入', '每股投資現金流出', '每股融資現金流入', '每股自由現金流入', '每股淨現金流入'],
								selectedChart === 0 ? cashFlows : cashFlowsByStock
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 '>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '132px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
										>
											年度 / 季度
										</TableCell>
										{FSData.cashFlowStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>{`${item.year} Q${item.quarter}`}</TableCell>
										))}
									</TableRow>
									{selectedChart === 0 ? (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>折舊</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.depreciation).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>攤銷</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.amortization).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													營業現金流
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.operatingCashFlow).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													投資現金流
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.investingCashFlow).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													融資現金流
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.financingCashFlow).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													資本支出
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.capex).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													自由現金流
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.freeCashFlow).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													淨現金流
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseInt(item.netCashFlow).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
										</>
									) : (
										<>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell
													sx={{
														width: '100%',
														minWidth: '146px',
													}}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												>
													每股營業現金流入
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseFloat(item.operatingCashFlowPerShare).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													每股投資現金流出
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseFloat(item.investingCashFlowPerShare).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													每股融資現金流入
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseFloat(item.financingCashFlowPerShare).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													每股自由現金流入
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseFloat(item.freeCashFlowPerShare).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
											<TableRow className='dark:bg-zinc-900/30'>
												<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
													每股淨現金流入
												</TableCell>
												{FSData.cashFlowStatements.map((item) => (
													<TableCell
														align='right'
														className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
														key={item.id}
													>
														{parseFloat(item.netCashFlowPerShare).toLocaleString()}
													</TableCell>
												))}
											</TableRow>
										</>
									)}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.電子書 && (
				<div className='ml-4 sm:ml-0'>
					<h3 className='mb-6 font-bold'>各年度財務報告</h3>
					<div className='grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4'>
						{eReport.map((report, index) => (
							<div className='w-full px-4 py-3 border shadow dark:bg-zinc-900/30' key={index}>
								<h2 className='mb-1 text-xl font-semibold'>
									{report.year} Q{report.season}
								</h2>
								<Link
									href={report.link}
									target='_blank'
									rel='noopener noreferrer'
									className='text-blue-500 hover:underline'
								>
									查看報告
								</Link>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}

const parseFinancialData = (data, key, valueExtractor) => {
	const parsedData = {}

	data.map((item) => {
		const { year, quarter, [valueExtractor]: value } = item

		if (!parsedData[year]) parsedData[year] = []

		switch (quarter) {
			case 1:
				parsedData[year][0] = parseFloat(value)
				break
			case 2:
				parsedData[year][1] = parseFloat(value)
				break
			case 3:
				parsedData[year][2] = parseFloat(value)
				break
			case 4:
				parsedData[year][3] = parseFloat(value)
				break
			default:
				break
		}
	})

	const quarters = ['季度', 'Q1', 'Q2', 'Q3', 'Q4']

	return {
		[key]: [quarters, ...Object.entries(parsedData).map(([year, dataArray]) => [year, ...dataArray])],
	}
}
