import { Table, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import { fetchAssetStatement, fetchCashFlowStatement, fetchLiabilitiesEquity } from '@/utils/fetchStockFS'
import { DataRow, DateRow } from '@/utils/renderTableRow'

export default function FinancialSafety({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedChart, setSelectedChart] = useState(0)

	const [chartData, setChartData] = useState({
		dates: [],
		debtRatio: [],
		longTermLiabilitiesRatio: [],
		currentQuickRatio: [],
		interestCoverageRatio: [],
		operatingCashFlowRatio: [],
		operatingCashFlowToNetIncomeRatio: [],
		reinvestmentRate: [],
	})
	const {
		dates,
		debtRatio,
		longTermLiabilitiesRatio,
		currentQuickRatio,
		interestCoverageRatio,
		operatingCashFlowRatio,
		operatingCashFlowToNetIncomeRatio,
		reinvestmentRate,
	} = chartData

	useEffect(() => {
		setSelectedChart(0)
		const fetchData = async () => {
			const assetStatement = await fetchAssetStatement({ stockId, setIsLoading })
			const liabilityEquityStatement = await fetchLiabilitiesEquity({ stockId, setIsLoading })
			const cashFlowStatement = await fetchCashFlowStatement({ stockId, setIsLoading })

			const currentQuickRatioDataArray = assetStatement.map((item) => ({
				currentRatio: item.currentRatio,
				quickRatio: item.quickRatio,
			}))

			const operatingCashFlowRatioDataArray = cashFlowStatement.map((item) => ({
				operatingCashFlowToCurrentLiabilitiesRatio: item.operatingCashFlowToCurrentLiabilitiesRatio,
				operatingCashFlowToLiabilitiesRatio: item.operatingCashFlowToLiabilitiesRatio,
			}))

			setChartData({
				dates: assetStatement.map((item) => `${item.year} Q${item.quarter}`),
				debtRatio: liabilityEquityStatement.map((item) => parseFloat(item.debtRatio)),
				longTermLiabilitiesRatio: assetStatement.map((item) => parseFloat(item.longTermLiabilitiesRatio)),
				currentQuickRatio: Object.keys(currentQuickRatioDataArray[0]).map((metric) =>
					currentQuickRatioDataArray.map((item) => parseFloat(item[metric]))
				),
				interestCoverageRatio: cashFlowStatement.map((item) => parseFloat(item.interestCoverageRatio)),
				operatingCashFlowRatio: Object.keys(operatingCashFlowRatioDataArray[0]).map((metric) =>
					operatingCashFlowRatioDataArray.map((item) => parseFloat(item[metric]))
				),
				operatingCashFlowToNetIncomeRatio: cashFlowStatement.map((item) =>
					parseFloat(item.operatingCashFlowToNetIncomeRatio)
				),
				reinvestmentRate: liabilityEquityStatement.map((item) => parseFloat(item.reinvestmentRate)),
			})
		}

		fetchData()
	}, [stockId])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.財務結構比率 && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['負債比率', '長期資金佔固定資產比率'].map((label, index) => (
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
								selectedChart === 0 ? '負債比率' : '長期資金佔固定資產比率',
								dates,
								selectedChart === 0 ? ['負債比'] : ['長期資金佔固定資產比'],
								selectedChart === 0 ? [debtRatio] : [longTermLiabilitiesRatio]
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{DateRow(dates, selectedChart === 0 ? '105px' : '175px')}
									{DataRow(
										selectedChart === 0 ? '負債比' : '長期資金佔固定資產比',
										selectedChart === 0 ? debtRatio : longTermLiabilitiesRatio
									)}
								</TableBody>
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
								{DateRow(dates)}
								{DataRow('流動比率', currentQuickRatio[0])}
								{DataRow('速動比率', currentQuickRatio[1])}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.利息保障倍數 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption('利息保障倍數', dates, ['利息保障倍數'], [interestCoverageRatio])}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{DateRow(dates, '118px')}
								{DataRow('利息保障倍數', interestCoverageRatio)}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.現金流量分析 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption(
							'現金流量分析',
							dates,
							['營業現金對流動負債比', '營業現金對負債比'],
							operatingCashFlowRatio
						)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{DateRow(dates, '175px')}
								{DataRow('營業現金對流動負債比', operatingCashFlowRatio[0])}
								{DataRow('營業現金對負債比', operatingCashFlowRatio[1])}
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
							[operatingCashFlowToNetIncomeRatio]
						)}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{DateRow(dates, '175px')}
								{DataRow('營業現金對稅後淨利比', operatingCashFlowToNetIncomeRatio)}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
			{childOpen.盈餘再投資比率 && (
				<section className='space-y-4'>
					<Chart
						option={multiLineOption('盈餘再投資比率', dates, ['盈再率'], [reinvestmentRate])}
						customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
					/>
					<div className='overflow-x-auto'>
						<Table>
							<TableBody>
								{DateRow(dates, '132px')}
								{DataRow('盈餘再投資比率', reinvestmentRate)}
							</TableBody>
						</Table>
					</div>
				</section>
			)}
		</div>
	)
}
