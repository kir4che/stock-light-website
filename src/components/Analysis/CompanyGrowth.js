import { Table, TableBody } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'
import { fetchIncomeStatement } from '@/utils/fetchStockFS'
import { renderDataRow, renderDateRow } from '@/utils/renderTableRow'

export default function CompanyGrowth({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(false)
	const [selectedChart, setSelectedChart] = useState(0)
	const [chartData, setChartData] = useState({
		dates: [],
		epsYOYs: [],
		epsQOQs: [],
	})
	const { dates, epsYOYs, epsQOQs } = chartData

	useEffect(() => {
		setSelectedChart(0)

		const fetchData = async () => {
			const incomeStatement = await fetchIncomeStatement({ stockId, setIsLoading })
			const mapEpsData = (metric) =>
				incomeStatement.map((item) => ({
					[metric]: item[metric],
					[`epsT4Q${metric.slice(3, 6)}`]: item[`epsT4Q${metric.slice(3, 6)}`],
				}))

			const epsYOYsDataArray = mapEpsData('epsYOY')
			const epsQOQsDataArray = mapEpsData('epsQOQ')

			setChartData({
				dates: incomeStatement.map((item) => `${item.year} Q${item.quarter}`),
				epsYOYs: Object.keys(epsYOYsDataArray[0]).map((metric) =>
					epsYOYsDataArray.map((item) => parseFloat(item[metric]))
				),
				epsQOQs: Object.keys(epsQOQsDataArray[0]).map((metric) =>
					epsQOQsDataArray.map((item) => parseFloat(item[metric]))
				),
			})
		}

		fetchData()
	}, [stockId])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen && chartData && (
				<>
					<section className='mb-2 space-x-1 text-sm'>
						{['年增率', '季增率'].map((label, index) => (
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
								selectedChart === 0 ? 'EPS 年增率' : 'EPS 季增率',
								dates,
								selectedChart === 0 ? ['單季EPS年增率', '近四季EPS年增率'] : ['單季EPS季增率', '近四季EPS季增率'],
								selectedChart === 0 ? epsYOYs : epsQOQs
							)}
							customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]'
						/>
						<div className='overflow-x-auto'>
							<Table>
								<TableBody>
									{renderDateRow(dates, '150px')}
									{selectedChart === 0
										? ['單季', '近四季'].map(
												(label, index) => epsYOYs[index] && renderDataRow(`${label}EPS年增率`, epsYOYs[index])
										  )
										: ['單季', '近四季'].map(
												(label, index) => epsQOQs[index] && renderDataRow(`${label}EPS季增率`, epsQOQs[index])
										  )}
								</TableBody>
							</Table>
						</div>
					</section>
				</>
			)}
		</div>
	)
}
