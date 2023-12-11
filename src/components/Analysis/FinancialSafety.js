import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'

export default function FinancialSafety({ stockId, childOpen }) {
	const [selectedChart, setSelectedChart] = useState(0)

	const [FSData, setFSData] = useState({
		assetStatements: [],
		liabilityEquityStatements: [],
		cashFlowStatements: [],
		incomeStatements: [],
	})

	const [chartData, setChartData] = useState({
		dates: [],
		currentQuickRatio: [],
		cashFlow: [],
	})
	const { dates, currentQuickRatio, cashFlow } = chartData

	const fetchFinancialStatement = async (endpoint, dataKey) => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/financial/${endpoint}/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			if (data.success === false) {
				console.error('Error: ', data.errorMessage)
				return
			}

			setFSData((prevData) => ({
				...prevData,
				[dataKey]: data.data.map((item, index) => ({ id: index, ...item })).reverse(),
			}))

			setChartData({ dates: data.data.map((item) => `${item.year} Q${item.quarter}`) })

			if (endpoint === 'assetStatements') {
				const currentQuickRatioDataArray = data.data.map((item) => ({
					currentRatio: item.currentRatio,
					quickRatio: item.quickRatio,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					currentQuickRatio: Object.keys(currentQuickRatioDataArray[0]).map((metric) => {
						return currentQuickRatioDataArray.map((item) => item[metric])
					}),
				}))
			} else if (endpoint === 'cashFlowStatement') {
				const cashFlowDataArray = data.data.map((item) => ({
					operatingCashFlowToCurrentLiabilitiesRatio: item.operatingCashFlowToCurrentLiabilitiesRatio,
					operatingCashFlowToLiabilitiesRatio: item.operatingCashFlowToLiabilitiesRatio,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					cashFlow: Object.keys(cashFlowDataArray[0]).map((metric) => {
						return cashFlowDataArray.map((item) => item[metric])
					}),
				}))
			} else return
		} catch (error) {
			console.error('Error fetching data: ', error)
		}
	}

	useEffect(() => {
		setSelectedChart(0)

		switch (true) {
			case childOpen.財務結構比率:
				fetchFinancialStatement('balanceSheetLiabilitiesEquity', 'liabilityEquityStatements')
				fetchFinancialStatement('assetStatements', 'assetStatements')
				break
			case childOpen.流速動比率:
				fetchFinancialStatement('assetStatements', 'assetStatements')
				break
			case childOpen.利息保障倍數:
				fetchFinancialStatement('cashFlowStatement', 'cashFlowStatements')
				break
			case childOpen.現金流量分析:
				fetchFinancialStatement('cashFlowStatement', 'cashFlowStatements')
				break
			case childOpen.營業現金流對淨利比:
				fetchFinancialStatement('cashFlowStatement', 'cashFlowStatements')
				break
			case childOpen.盈餘再投資比率:
				fetchFinancialStatement('balanceSheetLiabilitiesEquity', 'liabilityEquityStatements')
				break
			default:
				break
		}
	}, [stockId, childOpen])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.財務結構比率 && (
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
							負債比率
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							長期資金佔固定資產比率
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								selectedChart === 0 ? '負債比率' : '長期資金佔固定資產比率',
								dates,
								selectedChart === 0 ? ['負債比'] : ['長期資金佔固定資產比'],
								selectedChart === 0
									? [FSData.liabilityEquityStatements.map((item) => parseFloat(item.debtRatio))]
									: [FSData.assetStatements.map((item) => parseFloat(item.longTermLiabilitiesRatio))]
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								{selectedChart === 0 ? (
									<TableBody>
										<TableRow className='bg-secondary_blue/20 '>
											<TableCell
												sx={{
													width: '100%',
													minWidth: '150px',
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
														minWidth: '90px',
													}}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>{`${item.year} Q${item.quarter}`}</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>負債比</TableCell>
											{FSData.liabilityEquityStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.debtRatio).toLocaleString()}
												</TableCell>
											))}
										</TableRow>
									</TableBody>
								) : (
									<TableBody>
										<TableRow className='bg-secondary_blue/20 '>
											<TableCell
												sx={{ width: '100%', minWidth: '175px' }}
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											>
												年度 / 季度
											</TableCell>
											{FSData.assetStatements.map((item) => (
												<TableCell
													align='right'
													sx={{ width: '100%', minWidth: '90px' }}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>{`${item.year} Q${item.quarter}`}</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
												長期資金佔固定資產比
											</TableCell>
											{FSData.assetStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.longTermLiabilitiesRatio).toLocaleString()}
												</TableCell>
											))}
										</TableRow>
									</TableBody>
								)}
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.流速動比率 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption('流動比率及速動比率', dates, ['流動比率', '速動比率'], currentQuickRatio)}
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
									{FSData.assetStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>流動比率</TableCell>
									{FSData.assetStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.currentRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>速動比率</TableCell>
									{FSData.assetStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.quickRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.利息保障倍數 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'利息保障倍數',
							dates,
							['利息保障倍數'],
							[FSData.cashFlowStatements.map((item) => parseFloat(item.interestCoverageRatio))]
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
											minWidth: '118px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										利息保障倍數
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.interestCoverageRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.現金流量分析 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption('現金流量分析', dates, ['營業現金對流動負債比', '營業現金對負債比'], cashFlow)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 '>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '175px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										營業現金對流動負債比
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.operatingCashFlowToCurrentLiabilitiesRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										營業現金對負債比
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.operatingCashFlowToLiabilitiesRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.營業現金流對淨利比 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'營業現金流對淨利比',
							dates,
							['營業現金對稅後淨利比'],
							[FSData.cashFlowStatements.map((item) => parseFloat(item.operatingCashFlowToNetIncomeRatio))]
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
											minWidth: '175px',
										}}
										className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									>
										年度 / 季度
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											sx={{
												width: '100%',
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										營業現金對稅後淨利比
									</TableCell>
									{FSData.cashFlowStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.operatingCashFlowToNetIncomeRatio).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.盈餘再投資比率 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'盈餘再投資比率',
							dates,
							['盈再率'],
							[FSData.liabilityEquityStatements.map((item) => parseFloat(item.reinvestmentRate).toLocaleString())]
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
											sx={{
												width: '100%',
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										盈餘再投資比率
									</TableCell>
									{FSData.liabilityEquityStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.reinvestmentRate).toLocaleString()}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
		</div>
	)
}
