import { Table, TableBody } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { groupedBarOption } from '@/components/Chart/options/groupedBarOption'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import fetchEReport from '@/utils/fetchEReport'
import {
	fetchAssetStatement,
	fetchCashFlowStatement,
	fetchIncomeStatement,
	fetchLiabilitiesEquity,
} from '@/utils/fetchStockFS'
import { renderDataRow, renderDateRow } from '@/utils/renderTableRow'

export default function FinancialStatement({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(true)
	const [selectedChart, setSelectedChart] = useState(0)

	const [chartData, setChartData] = useState({
		dates: [],
		revenue: [],
		eps: [],
		epsT4Q: [],
		nav: [],
		income: [],
		opex: [],
		asset: [],
		otherAsset: [],
		otherCurrentAsset: [],
		currentAsset: [],
		liabilityEquity: [],
		liability: [],
		equity: [],
		depreciation: [],
		amortization: [],
		cashFlow: [],
		capex: [],
		cashFlowsByStock: [],
	})
	const {
		dates,
		revenue,
		eps,
		epsT4Q,
		nav,
		income,
		opex,
		asset,
		otherAsset,
		otherCurrentAsset,
		currentAsset,
		liabilityEquity,
		liability,
		otherLiability,
		otherCurrentLiability,
		equity,
		depreciation,
		amortization,
		cashFlow,
		capex,
		cashFlowsByStock,
	} = chartData
	const [eReport, setEReport] = useState([])

	useEffect(() => {
		setSelectedChart(0)

		const fetchData = async () => {
			const assetStatement = await fetchAssetStatement({ stockId, setIsLoading })
			const liabilityEquityStatement = await fetchLiabilitiesEquity({ stockId, setIsLoading })
			const incomeStatement = await fetchIncomeStatement({ stockId, setIsLoading })
			const cashFlowStatement = await fetchCashFlowStatement({ stockId, setIsLoading })

			const assetDataArray = assetStatement.map((item) => ({
				currentAssets: item.currentAssets,
				longTermInvestment: item.longTermInvestment,
				fixedAssets: item.fixedAssets,
				assets: item.assets,
			}))

			const currentAssetsDataArray = assetStatement.map((item) => ({
				cashAndCashEquivalents: item.cashAndCashEquivalents,
				shortTermInvestment: item.shortTermInvestment,
				accountsAndNotesReceivable: item.accountsAndNotesReceivable,
				inventories: item.inventories,
				currentAssets: item.currentAssets,
			}))

			const liabilityEquityDataArray = liabilityEquityStatement.map((item) => ({
				currentLiabilities: item.currentLiabilities,
				longTermLiabilities: item.longTermLiabilities,
				liabilities: item.liabilities,
				equity: item.equity,
			}))

			const liabilityDataArray = liabilityEquityStatement.map((item) => ({
				shortTermBorrowings: item.shortTermBorrowings,
				shortTermNotesAndBillsPayable: item.shortTermNotesAndBillsPayable,
				accountsAndNotesPayable: item.accountsAndNotesPayable,
				advanceReceipts: item.advanceReceipts,
				longTermLiabilitiesCurrentPortion: item.longTermLiabilitiesCurrentPortion,
			}))

			const equityDataArray = liabilityEquityStatement.map((item) => ({
				commonStocks: item.commonStocks,
				retainedEarnings: item.retainedEarnings,
				equity: item.equity,
			}))

			const incomeDataArray = incomeStatement.map((item) => ({
				revenue: item.revenue,
				grossProfit: item.grossProfit,
				operatingIncome: item.operatingIncome,
				profitBeforeTax: item.profitBeforeTax,
				netIncome: item.netIncome,
				netIncomeAttributableToOwners: item.netIncomeAttributableToOwnersOfTheParent,
			}))

			const opexDataArray = incomeStatement.map((item) => ({
				sellingExpenses: item.sellingExpenses,
				administrativeExpenses: item.administrativeExpenses,
				researchAndDevelopmentExpenses: item.researchAndDevelopmentExpenses,
				operatingExpenses: item.operatingExpenses,
			}))

			const epsT4QDataArray = incomeStatement.map((item) => ({
				epsT4Q: item.epsT4Q,
				epsT4QAvg: item.epsT4QAvg,
			}))

			const cashFlowDataArray = cashFlowStatement.map((item) => ({
				operatingCashFlow: item.operatingCashFlow,
				investingCashFlow: item.investingCashFlow,
				financingCashFlow: item.financingCashFlow,
				freeCashFlow: item.freeCashFlow,
				netCashFlow: item.netCashFlow,
			}))

			const cashFlowByStockDataArray = cashFlowStatement.map((item) => ({
				operatingCashFlowPerShare: item.operatingCashFlowPerShare,
				investingCashFlowPerShare: item.investingCashFlowPerShare,
				financingCashFlowPerShare: item.financingCashFlowPerShare,
				freeCashFlowPerShare: item.freeCashFlowPerShare,
				netCashFlowPerShare: item.netCashFlowPerShare,
			}))

			setChartData({
				dates: assetStatement.map((item) => `${item.year} Q${item.quarter}`),
				revenue: incomeStatement.map((item) => parseFloat(item.revenue)),
				eps: incomeStatement.map((item) => parseFloat(item.eps)),
				epsT4Q: Object.keys(epsT4QDataArray[0]).map((metric) =>
					epsT4QDataArray.map((item) => parseFloat(item[metric]))
				),
				nav: liabilityEquityStatement.map((item) => parseFloat(item.nav)),
				income: Object.keys(incomeDataArray[0]).map((metric) =>
					incomeDataArray.map((item) => parseFloat(item[metric]))
				),
				opex: Object.keys(opexDataArray[0]).map((metric) => opexDataArray.map((item) => parseFloat(item[metric]))),
				asset: Object.keys(assetDataArray[0]).map((metric) => assetDataArray.map((item) => parseFloat(item[metric]))),
				otherAsset: assetStatement.map((item) =>
					parseFloat(item.assets - item.currentAssets - item.longTermInvestment - item.fixedAssets)
				),
				currentAsset: Object.keys(currentAssetsDataArray[0]).map((metric) =>
					currentAssetsDataArray.map((item) => parseFloat(item[metric]))
				),
				otherCurrentAsset: assetStatement.map((item) =>
					parseFloat(
						item.currentAssets -
							item.cashAndCashEquivalents -
							item.shortTermInvestment -
							item.accountsAndNotesReceivable -
							item.inventories
					)
				),
				liabilityEquity: Object.keys(liabilityEquityDataArray[0]).map((metric) =>
					liabilityEquityDataArray.map((item) => parseFloat(item[metric]))
				),
				liability: Object.keys(liabilityDataArray[0]).map((metric) =>
					liabilityDataArray.map((item) => parseFloat(item[metric]))
				),
				otherLiability: liabilityEquityStatement.map((item) =>
					parseFloat(item.liabilities - item.currentLiabilities - item.longTermLiabilities)
				),
				otherCurrentLiability: liabilityEquityStatement.map((item) =>
					parseFloat(
						item.currentLiabilities -
							item.shortTermBorrowings -
							item.shortTermNotesAndBillsPayable -
							item.accountsAndNotesPayable -
							item.advanceReceipts -
							item.longTermLiabilitiesCurrentPortion
					)
				),
				equity: Object.keys(equityDataArray[0]).map((metric) =>
					equityDataArray.map((item) => parseFloat(item[metric]))
				),
				depreciation: cashFlowStatement.map((item) => parseFloat(item.depreciation)),
				amortization: cashFlowStatement.map((item) => parseFloat(item.amortization)),
				cashFlow: Object.keys(cashFlowDataArray[0]).map((metric) =>
					cashFlowDataArray.map((item) => parseFloat(item[metric]))
				),
				capex: cashFlowStatement.map((item) => parseFloat(item.capex)),
				cashFlowsByStock: Object.keys(cashFlowByStockDataArray[0]).map((metric) =>
					cashFlowByStockDataArray.map((item) => parseFloat(item[metric]))
				),
			})

			setEReport(await fetchEReport({ stockId, setIsLoading }))
		}

		fetchData()
	}, [stockId])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.營收表 && revenue && (
				<section className='space-y-4'>
					{(() => {
						const revenueByYear = Array.from({ length: Math.ceil(revenue.length / 4) }, (_, index) => {
							const year = 2019 + index
							return [year, ...revenue.slice(index * 4, index * 4 + 4)]
						})

						return (
							<>
								<Chart
									option={groupedBarOption('營業收入', [['季度', 'Q1', 'Q2', 'Q3', 'Q4'], ...revenueByYear], {
										type: 'value',
										name: '千元',
										alignTicks: true,
										axisLabel: {
											formatter: function (value) {
												return (value / 1000).toLocaleString()
											},
										},
									})}
									customHeight='h-80 sm:h-88 lg:h-[420px] xl:h-[520px]'
								/>
								<div className='overflow-x-auto'>
									<Table size='medium'>
										<TableBody>
											{renderDateRow(dates)}
											{renderDataRow('營業收入', revenue)}
										</TableBody>
									</Table>
								</div>
							</>
						)
					})()}
				</section>
			)}
			{childOpen.每股盈餘 && eps && epsT4Q && (
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
					{(() => {
						const epsByYear = Array.from({ length: Math.ceil(eps.length / 4) }, (_, index) => {
							const year = 2019 + index
							return [year, ...eps.slice(index * 4, index * 4 + 4)]
						})

						const epsT4QByYear = Array.from({ length: Math.ceil(epsT4Q[0].length / 4) }, (_, index) => {
							const year = 2019 + index
							return [year, ...epsT4Q[0].slice(index * 4, index * 4 + 4)]
						})

						return (
							<section className='space-y-4'>
								<Chart
									option={groupedBarOption(
										'每股盈餘(EPS)',
										[['季度', 'Q1', 'Q2', 'Q3', 'Q4'], ...(selectedChart === 0 ? epsByYear : epsT4QByYear)],
										{
											type: 'value',
											name: '元',
											alignTicks: true,
											axisLabel: {
												formatter: function (value) {
													return value.toLocaleString()
												},
											},
										}
									)}
									customHeight='h-80 sm:h-88 lg:h-[420px] xl:h-[520px]'
								/>
								<div className='overflow-x-auto'>
									<Table>
										<TableBody>
											{renderDateRow(dates)}
											{selectedChart === 0 ? (
												renderDataRow('單季EPS', eps)
											) : (
												<>
													{renderDataRow('近四季EPS', epsT4Q[0])}
													{renderDataRow('近四季平均EPS', epsT4Q[1])}
												</>
											)}
										</TableBody>
									</Table>
								</div>
							</section>
						)
					})()}
				</>
			)}
			{childOpen.每股淨值 &&
				nav &&
				(() => {
					const navByYear = Array.from({ length: Math.ceil(nav.length / 4) }, (_, index) => {
						const year = 2019 + index
						return [year, ...nav.slice(index * 4, index * 4 + 4)]
					})
					return (
						<section className='space-y-4'>
							<Chart
								option={groupedBarOption('每股淨值', [['季度', 'Q1', 'Q2', 'Q3', 'Q4'], ...navByYear], {
									type: 'value',
									name: '元',
									alignTicks: true,
									axisLabel: {
										formatter: function (value) {
											return value.toLocaleString()
										},
									},
								})}
								customHeight='h-80 sm:h-88 lg:h-[420px] xl:h-[520px]'
							/>
							<div className='overflow-x-auto'>
								<Table>
									<TableBody>
										{renderDateRow(dates)}
										{renderDataRow('每股淨值', nav)}
									</TableBody>
								</Table>
							</div>
						</section>
					)
				})()}
			{childOpen.損益表 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'損益表',
							dates,
							['營收', '毛利', '營業利益', '稅前淨利', '稅後淨利', '母公司業主淨利'],
							income,
							{
								type: 'value',
								name: '千元',
								alignTicks: true,
								axisLabel: {
									formatter: function (value) {
										return (value / 1000).toLocaleString()
									},
								},
							}
						)}
						customHeight='h-80 sm:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{renderDateRow(dates, '132px')}
								{income[0] && renderDataRow('營業收入', income[0])}
								{income[1] && renderDataRow('毛利', income[1])}
								{opex[0] && renderDataRow('銷售費用', opex[0])}
								{opex[1] && renderDataRow('管理費用', opex[1])}
								{opex[2] && renderDataRow('研發費用', opex[2])}
								{opex[3] && renderDataRow('營業費用', opex[3])}
								{income[2] && renderDataRow('營業利益', income[2])}
								{income[3] && renderDataRow('稅前淨利', income[3])}
								{income[4] && renderDataRow('稅後淨利', income[4])}
								{income[5] && renderDataRow('母公司業主淨利', income[5])}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.總資產 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['資產項目', '流動資產細項'].map((label, index) => (
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
								selectedChart === 0 ? '資產表' : '流動資產表',
								dates,
								selectedChart === 0
									? ['流動資產', '長期投資', '固定資產', '總資產']
									: ['現金及約當現金', '短期投資', '應收帳款及票據', '存貨', '流動資產'],
								selectedChart === 0 ? asset : currentAsset,
								{
									type: 'value',
									name: '千元',
									alignTicks: true,
									axisLabel: {
										formatter: function (value) {
											return (value / 1000).toLocaleString()
										},
									},
								}
							)}
							customHeight='h-72 sm:h-80 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{renderDateRow(dates, '132px')}
									{currentAsset[0] && renderDataRow('現金及約當現金', currentAsset[0])}
									{currentAsset[1] && renderDataRow('短期投資', currentAsset[1])}
									{currentAsset[2] && renderDataRow('應收帳款及票據', currentAsset[2])}
									{currentAsset[3] && renderDataRow('存貨', currentAsset[3])}
									{otherCurrentAsset && renderDataRow('其餘流動資產', otherCurrentAsset)}
									{renderDataRow('流動資產', currentAsset[4])}
									{selectedChart === 0 && (
										<>
											{asset[1] && renderDataRow('長期投資', asset[1])}
											{asset[2] && renderDataRow('固定資產', asset[2])}
											{otherAsset && renderDataRow('其餘資產', otherAsset)}
											{asset[3] && renderDataRow('總資產', asset[3])}
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
						{['負債和股東權益', '負債', '股東權益'].map((label, index) => (
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
								selectedChart === 0 ? liabilityEquity : selectedChart === 1 ? liability : equity,
								{
									type: 'value',
									name: '千元',
									alignTicks: true,
									axisLabel: {
										formatter: function (value) {
											return (value / 1000).toLocaleString()
										},
									},
								}
							)}
							customHeight='h-72 sm:h-80 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{renderDateRow(dates, '132px')}
									{selectedChart === 0 || selectedChart === 1 ? (
										<>
											{liability[0] && renderDataRow('短期借款', liability[0])}
											{liability[1] && renderDataRow('應付短期票券', liability[1])}
											{liability[2] && renderDataRow('應付帳款及票據', liability[2])}
											{liability[3] && renderDataRow('預收款項', liability[3])}
											{liability[4] && renderDataRow('一年內到期長期負債', liability[4])}
											{otherCurrentLiability && renderDataRow('其餘流動負債', otherCurrentLiability)}
											{liabilityEquity[0] && renderDataRow('流動負債', liabilityEquity[0])}
											{liabilityEquity[1] && renderDataRow('長期負債', liabilityEquity[1])}
											{otherLiability && renderDataRow('其餘負債', otherLiability)}
											{liabilityEquity[2] && renderDataRow('總負債', liabilityEquity[2])}
										</>
									) : null}
									{selectedChart === 2 && (
										<>
											{equity[0] && renderDataRow('普通股股本', equity[0])}
											{equity[1] && renderDataRow('保留盈餘', equity[1])}
										</>
									)}
									{selectedChart === 0 || selectedChart === 2 ? equity[2] && renderDataRow('淨值', equity[2]) : null}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
			{childOpen.現金流量表 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['現金流量表', '每股現金流量表'].map((label, index) => (
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
								selectedChart === 0 ? '現金流量表' : '每股現金流量表',
								dates,
								selectedChart === 0
									? ['營業現金流', '投資現金流', '融資現金流', '自由現金流', '淨現金流']
									: ['每股營業現金流入', '每股投資現金流出', '每股融資現金流入', '每股自由現金流入', '每股淨現金流入'],
								selectedChart === 0 ? cashFlow : cashFlowsByStock,
								{
									type: 'value',
									name: selectedChart === 0 ? '千元' : '元',
									alignTicks: true,
									axisLabel: {
										formatter: function (value) {
											return selectedChart === 0 ? (value / 1000).toLocaleString() : value.toLocaleString()
										},
									},
								}
							)}
							customHeight='h-80 sm:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{renderDateRow(dates, '148px')}
									{selectedChart === 0 ? (
										<>
											{depreciation && renderDataRow('折舊', depreciation)}
											{amortization && renderDataRow('攤銷', amortization)}
											{cashFlow[0] && renderDataRow('營業現金流', cashFlow[0])}
											{cashFlow[1] && renderDataRow('投資現金流', cashFlow[1])}
											{cashFlow[2] && renderDataRow('融資現金流', cashFlow[2])}
											{capex && renderDataRow('資本支出', capex)}
											{cashFlow[3] && renderDataRow('自由現金流', cashFlow[3])}
											{cashFlow[4] && renderDataRow('淨現金流', cashFlow[4])}
										</>
									) : (
										<>
											{cashFlowsByStock[0] && renderDataRow('每股營業現金流入', cashFlowsByStock[0])}
											{cashFlowsByStock[1] && renderDataRow('每股投資現金流出', cashFlowsByStock[1])}
											{cashFlowsByStock[2] && renderDataRow('每股融資現金流入', cashFlowsByStock[2])}
											{cashFlowsByStock[3] && renderDataRow('每股自由現金流入', cashFlowsByStock[3])}
											{cashFlowsByStock[4] && renderDataRow('每股淨現金流入', cashFlowsByStock[4])}
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
