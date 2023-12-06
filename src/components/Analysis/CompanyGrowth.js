import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import { multiLineOption } from '@/components/Chart/options/multiLineOption'

export default function CompanyGrowth({ stockId, childOpen }) {
	const [selectedChart, setSelectedChart] = useState(0)

	const [incomeData, setIncomeData] = useState()
	const [chartData, setChartData] = useState({
		dates: [],
		epsYOYs: [],
		epsQOQs: [],
	})
	const { dates, epsYOYs, epsQOQs } = chartData

	const fetchIncomeData = async () => {
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/financial/incomeStatements/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()
			setIncomeData(data.data.reverse())

			if (data.success === false) {
				console.error('Error: ', data.errorMessage)
				return
			}

			setChartData({ dates: data.data.map((item) => `${item.year} Q${item.quarter}`) })

			const epsYOYsDataArray = data.data.map((item) => ({
				epsYOY: item.epsYOY,
				epsT4QYOY: item.epsT4QYOY,
			}))

			const epsQOQsDataArray = data.data.map((item) => ({
				epsQOQ: item.epsQOQ,
				epsT4QQOQ: item.epsT4QQOQ,
			}))

			setChartData((prevChartData) => ({
				...prevChartData,
				epsYOYs: Object.keys(epsYOYsDataArray[0]).map((metric) => {
					return epsYOYsDataArray.map((item) => item[metric])
				}),
				epsQOQs: Object.keys(epsQOQsDataArray[0]).map((metric) => {
					return epsQOQsDataArray.map((item) => item[metric])
				}),
			}))
		} catch (error) {
			console.error('Error fetching data: ', error)
		}
	}

	useEffect(() => {
		setSelectedChart(0)
		fetchIncomeData()
	}, [stockId, childOpen])

	return (
		<div className='w-full overflow-hidden'>
			{childOpen.每股盈餘成長率 && incomeData && (
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
							年增率
						</button>
						<button
							className={`px-4 py-1 dark:border-zinc-400 border rounded-full ${
								selectedChart === 1
									? 'bg-amber-200 dark:text-zinc-800 border-none hover:bg-amber-200'
									: 'hover:bg-zinc-100/50 dark:hover:bg-zinc-900/60'
							}`}
							onClick={() => setSelectedChart(1)}
						>
							季增率
						</button>
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
										{incomeData.map((item) => (
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
											{selectedChart === 0 ? '單季EPS年增率' : '單季EPS季增率'}
										</TableCell>
										{incomeData.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{selectedChart === 0
													? parseFloat(item.epsYOY) || item.epsYOY
													: parseFloat(item.epsQOQ) || item.epsQOQ}
											</TableCell>
										))}
									</TableRow>
									<TableRow className='dark:bg-zinc-900/30'>
										<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
											{selectedChart === 0 ? '近四季EPS年增率' : '近四季EPS季增率'}
										</TableCell>
										{incomeData.map((item) => (
											<TableCell
												align='right'
												className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
												key={item.id}
											>
												{selectedChart === 0
													? parseFloat(item.epsT4QYOY) || item.epsT4QYOY
													: parseFloat(item.epsT4QQOQ) || item.epsT4QQOQ}
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
