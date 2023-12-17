import { Table, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { barAndLineOption } from '@/components/Chart/options/barAndLineOption'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import { fetchAssetStatement, fetchIncomeStatement, fetchLiabilitiesEquity } from '@/utils/fetchStockFS'
import { DataRow, DateRow } from '@/utils/renderTableRow'

export default function Profitability({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedChart, setSelectedChart] = useState(0)

	const [chartData, setChartData] = useState({
		dates: [],
		profitRatio: [],
		taxToProfitRatio: [],
		opexRatio: [],
		nonOpexToProfit: [],
		roe: [],
		roa: [],
		roeT4Q: [],
		roaT4Q: [],
		opTurnover: [],
		faTurnover: [],
		assetTurnover: [],
	})
	const {
		dates,
		profitRatio,
		taxToProfitRatio,
		opexRatio,
		nonOpexToProfit,
		roe,
		roa,
		roeT4Q,
		roaT4Q,
		opTurnover,
		faTurnover,
		assetTurnover,
	} = chartData

	useEffect(() => {
		setSelectedChart(0)

		const fetchData = async () => {
			const assetStatement = await fetchAssetStatement({ stockId, setIsLoading })
			const liabilityEquityStatement = await fetchLiabilitiesEquity({ stockId, setIsLoading })
			const incomeStatement = await fetchIncomeStatement({ stockId, setIsLoading })

			const profitRatioDataArray = incomeStatement.map((item) => ({
				grossMargin: item.grossMargin,
				operatingMargin: item.operatingMargin,
				profitBeforeTaxMargin: item.profitBeforeTaxMargin,
				netIncomeMargin: item.netIncomeMargin,
			}))

			const opexRatioDataArray = incomeStatement.map((item) => ({
				operatingExpenseRatio: item.operatingExpenseRatio,
				sellingExpensesToSalesRatio: item.sellingExpensesToSalesRatio,
				administrativeExpensesToSalesRatio: item.administrativeExpensesToSalesRatio,
				researchAndDevelopmentExpensesToSalesRatio: item.researchAndDevelopmentExpensesToSalesRatio,
			}))

			const opTurnoverDataArray = assetStatement.map((item) => ({
				accountsAndNotesReceivableTurnoverRatio: item.accountsAndNotesReceivableTurnoverRatio,
				inventoryTurnoverRatio: item.inventoryTurnoverRatio,
			}))
			const faTurnoverDataArray = assetStatement.map((item) => ({
				fixedAssets: item.fixedAssets,
				fixedAssetsTurnoverRatio: item.fixedAssetsTurnoverRatio,
			}))
			const assetTurnoverDataArray = assetStatement.map((item) => ({
				assets: item.assets,
				assetsTurnoverRatio: item.assetsTurnoverRatio,
			}))

			setChartData({
				dates: incomeStatement.map((item) => `${item.year} Q${item.quarter}`),
				profitRatio: Object.keys(profitRatioDataArray[0]).map((metric) =>
					profitRatioDataArray.map((item) => parseFloat(item[metric]))
				),
				taxToProfitRatio: incomeStatement.map((item) => parseFloat(item.incomeTaxToProfitBeforeTaxRatio)),
				opexRatio: Object.keys(opexRatioDataArray[0]).map((metric) =>
					opexRatioDataArray.map((item) => parseFloat(item[metric]))
				),
				nonOpexToProfit: incomeStatement.map((item) => parseFloat(item.nonOperatingIncomeToProfitBeforeTax)),
				opTurnover: Object.keys(opTurnoverDataArray[0]).map((metric) =>
					opTurnoverDataArray.map((item) => parseFloat(item[metric]))
				),
				roe: liabilityEquityStatement.map((item) => parseFloat(item.roe)),
				roa: assetStatement.map((item) => parseFloat(item.roa)),
				roeT4Q: liabilityEquityStatement.map((item) => parseFloat(item.roeT4Q)),
				roaT4Q: assetStatement.map((item) => parseFloat(item.roaT4Q)),
				faTurnover: Object.keys(faTurnoverDataArray[0]).map((metric) =>
					faTurnoverDataArray.map((item) => parseFloat(item[metric]))
				),
				assetTurnover: Object.keys(assetTurnoverDataArray[0]).map((metric) =>
					assetTurnoverDataArray.map((item) => parseFloat(item[metric]))
				),
			})
		}

		fetchData()
	}, [stockId])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.財報三率 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['利潤比率', '所得稅佔税前淨利比'].map((label, index) => (
							<button
								key={index}
								className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
									selectedChart === index
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-primary_yellow dark:hover:bg-primary_yellow'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(index)}
							>
								{label}
							</button>
						))}
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								selectedChart === 0 ? '財報三率' : '所得稅佔税前淨利比',
								dates,
								selectedChart === 0 ? ['毛利率', '營業利益率', '稅前淨利率', '稅後淨利率'] : ['所得稅佔稅前淨利比'],
								selectedChart === 0 ? profitRatio : [taxToProfitRatio]
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{DateRow(dates, selectedChart === 0 ? '105px' : '160px')}
									{selectedChart === 0 ? (
										<>
											{profitRatio[0] && DataRow('毛利率', profitRatio[0])}
											{profitRatio[1] && DataRow('營業利益率', profitRatio[1])}
											{profitRatio[2] && DataRow('稅前淨利率', profitRatio[2])}
											{profitRatio[3] && DataRow('稅後淨利率', profitRatio[3])}
										</>
									) : (
										taxToProfitRatio && DataRow('所得稅佔稅前淨利比', taxToProfitRatio)
									)}
								</TableBody>
							</Table>
						</div>
					</section>
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
								{DateRow(dates)}
								{opexRatio[0] && DataRow('營業費用率', opexRatio[0])}
								{opexRatio[1] && DataRow('銷售費用率', opexRatio[1])}
								{opexRatio[2] && DataRow('管理費用率', opexRatio[2])}
								{opexRatio[3] && DataRow('研發費用率', opexRatio[3])}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.業外佔税前淨利比 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption('業外佔税前淨利比', dates, ['業外佔税前淨利比'], [nonOpexToProfit])}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{DateRow(dates, '150px')}
								{nonOpexToProfit && DataRow('業外佔税前淨利比', nonOpexToProfit)}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.ROE及ROA && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['單季', '近四季'].map((label, index) => (
							<button
								key={index}
								className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
									selectedChart === index
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-primary_yellow dark:hover:bg-primary_yellow'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(index)}
							>
								{label}
							</button>
						))}
					</section>
					<section className='space-y-4'>
						<Chart
							option={multiLineOption(
								'ROE／ROA',
								dates,
								['ROE', 'ROA'],
								selectedChart === 0 ? [roe, roa] : [roeT4Q, roaT4Q]
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{DateRow(dates)}
									{selectedChart === 0 ? (
										<>
											{roe && DataRow('ROE', roe)}
											{roa && DataRow('ROA', roa)}
										</>
									) : (
										<>
											{roeT4Q && DataRow('ROE', roeT4Q)}
											{roaT4Q && DataRow('ROA', roaT4Q)}
										</>
									)}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.經營週轉能力 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['營運週轉', '固定資產週轉', '總資產週轉'].map((label, index) => (
							<button
								key={index}
								className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
									selectedChart === index
										? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-primary_yellow dark:hover:bg-primary_yellow'
										: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
								}`}
								onClick={() => setSelectedChart(index)}
							>
								{label}
							</button>
						))}
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
									{DateRow(dates, '118px')}
									{selectedChart === 0
										? opTurnover[0] && DataRow('應收帳款週轉', opTurnover[0])
										: selectedChart === 1
										? faTurnover[0] && DataRow('固定資產', faTurnover[0])
										: assetTurnover[0] && DataRow('總資產', assetTurnover[0])}
									{selectedChart === 0
										? opTurnover[1] && DataRow('存貨週轉', opTurnover[1])
										: selectedChart === 1
										? faTurnover[1] && DataRow('固定資產週轉', faTurnover[1])
										: assetTurnover[1] && DataRow('總資產週轉', assetTurnover[1])}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
		</div>
	)
}
