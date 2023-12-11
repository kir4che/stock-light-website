import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { barAndLineOption } from '@/components/Chart/options/barAndLineOption'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'

export default function Profitability({ stockId, childOpen }) {
	const [selectedChart, setSelectedChart] = useState(0)

	const [FSData, setFSData] = useState({
		assetStatements: [],
		liabilityEquityStatements: [],
		cashFlowStatements: [],
		incomeStatements: [],
	})

	const [chartData, setChartData] = useState({
		dates: [],
		profitRatio: [],
		opexRatio: [],
		opTurnover: [],
		faTurnover: [],
		assetTurnover: [],
	})
	const { dates, profitRatio, opexRatio, opTurnover, faTurnover, assetTurnover } = chartData

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

			if (endpoint === 'incomeStatements') {
				const profitRatioDataArray = data.data.map((item) => ({
					grossMargin: item.grossMargin,
					operatingMargin: item.operatingMargin,
					profitBeforeTaxMargin: item.profitBeforeTaxMargin,
					netIncomeMargin: item.netIncomeMargin,
				}))

				const opexRatioDataArray = data.data.map((item) => ({
					operatingExpenseRatio: item.operatingExpenseRatio,
					sellingExpensesToSalesRatio: item.sellingExpensesToSalesRatio,
					administrativeExpensesToSalesRatio: item.administrativeExpensesToSalesRatio,
					researchAndDevelopmentExpensesToSalesRatio: item.researchAndDevelopmentExpensesToSalesRatio,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					profitRatio: Object.keys(profitRatioDataArray[0]).map((metric) => {
						return profitRatioDataArray.map((item) => item[metric])
					}),
					opexRatio: Object.keys(opexRatioDataArray[0]).map((metric) => {
						return opexRatioDataArray.map((item) => item[metric])
					}),
				}))
			} else if (endpoint === 'assetStatements') {
				const opTurnoverDataArray = data.data.map((item) => ({
					accountsAndNotesReceivableTurnoverRatio: item.accountsAndNotesReceivableTurnoverRatio,
					inventoryTurnoverRatio: item.inventoryTurnoverRatio,
				}))
				const faTurnoverDataArray = data.data.map((item) => ({
					fixedAssets: item.fixedAssets,
					fixedAssetsTurnoverRatio: item.fixedAssetsTurnoverRatio,
				}))
				const assetTurnoverDataArray = data.data.map((item) => ({
					assets: item.assets,
					assetsTurnoverRatio: item.assetsTurnoverRatio,
				}))

				setChartData((prevChartData) => ({
					...prevChartData,
					opTurnover: Object.keys(opTurnoverDataArray[0]).map((metric) => {
						return opTurnoverDataArray.map((item) => item[metric])
					}),
					faTurnover: Object.keys(faTurnoverDataArray[0]).map((metric) => {
						return faTurnoverDataArray.map((item) => item[metric])
					}),
					assetTurnover: Object.keys(assetTurnoverDataArray[0]).map((metric) => {
						return assetTurnoverDataArray.map((item) => item[metric])
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
			case childOpen.財報三率:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.營業費用率:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.業外佔税前淨利比:
				fetchFinancialStatement('incomeStatements', 'incomeStatements')
				break
			case childOpen.ROE及ROA:
				fetchFinancialStatement('assetStatements', 'assetStatements')
				fetchFinancialStatement('balanceSheetLiabilitiesEquity', 'liabilityEquityStatements')
				break
			case childOpen.經營週轉能力:
				fetchFinancialStatement('assetStatements', 'assetStatements')
				break
			default:
				break
		}
	}, [stockId, childOpen])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.財報三率 && (
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
							利潤比率
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							所得稅佔税前淨利比
						</button>
					</section>
					{selectedChart === 0 ? (
						<section className='space-y-4'>
							<Chart
								option={multiLineOption(
									'財報三率',
									dates,
									['毛利率', '營業利益率', '稅前淨利率', '稅後淨利率'],
									profitRatio
								)}
								customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
							/>
							<div className='overflow-x-auto'>
								<Table>
									<TableBody>
										<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
											<TableCell
												sx={{
													width: '100%',
													minWidth: '105px',
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
														minWidth: '90px',
													}}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>{`${item.year} Q${item.quarter}`}</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>毛利率</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.grossMargin)}
												</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
												營業利益率
											</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.operatingMargin)}
												</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
												稅前淨利率
											</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.profitBeforeTaxMargin)}
												</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
												稅後淨利率
											</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.netIncomeMargin)}
												</TableCell>
											))}
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</section>
					) : (
						<section className='space-y-4'>
							<Chart
								option={multiLineOption(
									'所得稅佔稅前淨利比',
									dates,
									['所得稅佔稅前淨利比'],
									[FSData.incomeStatements.map((item) => item.incomeTaxToProfitBeforeTaxRatio)]
								)}
								customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
							/>
							<div className='overflow-x-auto'>
								<Table>
									<TableBody>
										<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
											<TableCell
												sx={{
													width: '100%',
													minWidth: '160px',
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
														minWidth: '90px',
													}}
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>{`${item.year} Q${item.quarter}`}</TableCell>
											))}
										</TableRow>
										<TableRow className='dark:bg-zinc-900/30'>
											<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
												所得稅佔稅前淨利比
											</TableCell>
											{FSData.incomeStatements.map((item) => (
												<TableCell
													align='right'
													className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
													key={item.id}
												>
													{parseFloat(item.incomeTaxToProfitBeforeTaxRatio)}
												</TableCell>
											))}
										</TableRow>
									</TableBody>
								</Table>
							</div>
						</section>
					)}
				</>
			)}
			{childOpen.營業費用率 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'營業費用',
							dates,
							['營業費用率', '銷售費用率', '管理費用率', '研發費用率'],
							opexRatio
						)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '105px',
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
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										{' '}
										營業費用率{' '}
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.operatingExpenseRatio)}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										{' '}
										銷售費用率{' '}
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.sellingExpensesToSalesRatio)}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										{' '}
										管理費用率{' '}
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.administrativeExpensesToSalesRatio)}
										</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										{' '}
										研發費用率{' '}
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.researchAndDevelopmentExpensesToSalesRatio)}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.業外佔税前淨利比 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'業外佔税前淨利比',
							dates,
							['業外佔税前淨利比'],
							[FSData.incomeStatements.map((item) => item.nonOperatingIncomeToProfitBeforeTax)]
						)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
									<TableCell
										sx={{
											width: '100%',
											minWidth: '150px',
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
												minWidth: '90px',
											}}
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>{`${item.year} Q${item.quarter}`}</TableCell>
									))}
								</TableRow>
								<TableRow className='dark:bg-zinc-900/30'>
									<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
										業外佔税前淨利比
									</TableCell>
									{FSData.incomeStatements.map((item) => (
										<TableCell
											align='right'
											className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
											key={item.id}
										>
											{parseFloat(item.nonOperatingIncomeToProfitBeforeTax)}
										</TableCell>
									))}
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.ROE及ROA && (
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
							option={multiLineOption(
								'ROE／ROA',
								dates,
								['ROE', 'ROA'],
								selectedChart === 0
									? [
											FSData.liabilityEquityStatements.map((item) => item.roe),
											FSData.assetStatements.map((item) => item.roa),
									  ]
									: [
											FSData.liabilityEquityStatements.map((item) => item.roeT4Q),
											FSData.assetStatements.map((item) => item.roaT4Q),
									  ]
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '105px',
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
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>ROE</TableCell>
										{FSData.liabilityEquityStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{selectedChart === 0 ? parseFloat(item.roe) : parseFloat(item.roeT4Q)}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>ROA</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{selectedChart === 0 ? parseFloat(item.roa) : parseFloat(item.roaT4Q)}
											</TableCell>
										))}
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.經營週轉能力 && (
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
							營運週轉
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							固定資產週轉
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 2
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(2)}
						>
							總資產週轉
						</button>
					</section>
					<section className='space-y-4'>
						<Chart
							option={
								selectedChart === 0
									? multiLineOption('經營週轉能力', dates, ['應收帳款週轉', '存貨週轉'], opTurnover, {
											type: 'value',
											name: '次',
											alignTicks: true,
											axisLabel: {
												formatter: function (value) {
													return value.toLocaleString()
												},
											},
									  })
									: barAndLineOption(
											'經營週轉能力',
											dates,
											selectedChart === 1 ? ['固定資產', '固定資產週轉'] : ['總資產', '總資產週轉'],
											selectedChart === 1 ? faTurnover : assetTurnover
									  )
							}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
										<TableCell
											sx={{
												width: '100%',
												minWidth: '118px',
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
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											{selectedChart === 0 ? '應收帳款週轉' : selectedChart === 1 ? '固定資產' : '總資產'}
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseFloat(
													selectedChart === 0
														? item.accountsAndNotesReceivableTurnoverRatio
														: selectedChart === 1
														? item.fixedAssets
														: item.assets
												).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											{selectedChart === 0 ? '存貨週轉' : selectedChart === 1 ? '固定資產週轉' : '總資產週轉'}
										</TableCell>
										{FSData.assetStatements.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{parseFloat(
													selectedChart === 0
														? item.inventoryTurnoverRatio
														: selectedChart === 1
														? item.fixedAssetsTurnoverRatio
														: item.assetsTurnoverRatio
												).toLocaleString()}
											</TableCell>
										))}
									</TableRow>
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
		</div>
	)
}
