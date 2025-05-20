import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'

export default function DividendPolicy({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [chartData, setChartData] = useState([])

	const fetchDividendPolicy = async () => {
		setIsLoading(true)
		try {
			const response = await fetch(`${process.env.DB_URL}/api/stock/history/dividend_policy/${stockId}`, {
				method: 'GET',
			})
			const data = await response.json()

			if (data.success) {
				setData(data.data.slice(1, data.data.length))

				const summary = data.data.reduce((acc, dividend) => {
					const year = dividend.announcedDate.substring(0, 4)

					if (!acc[year]) acc[year] = { year, cash: 0, stock: 0 }

					acc[year].cash += dividend.cashDividend
					acc[year].stock += dividend.stockDividend

					return acc
				}, {})

				const result = Object.values(summary).map(({ year, cash, stock }) => [
					year,
					parseFloat(cash.toFixed(2)),
					parseFloat(stock.toFixed(2)),
				])
				setChartData(result)

				setIsLoading(false)
			}
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchDividendPolicy()
	}, [stockId])

	const [windowWidth, setWindowWidth] = useState(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth)
			window.addEventListener("resize", () => setWindowWidth(window.innerWidth))
		}

		return () => {
			if (typeof window !== "undefined")
				window.removeEventListener("resize", () => setWindowWidth(window.innerWidth))
		}
	}, [])

	return (
		childOpen && (
			<section className='w-full space-y-4 overflow-x-auto'>
				<Chart
					option={{
						title: {
							text: '歷年股利政策及除權息一覽表',
							left: 'center',
							top: '4%',
						},
						dataset: {
							source: chartData,
						},
						xAxis: { type: 'category' },
						yAxis: {
							type: 'value',
							name: '元',
							alignTicks: true,
							axisLabel: {
								formatter: function (value) {
									return value.toLocaleString()
								},
							},
						},
						series: [
							{ type: 'bar', name: '現金股利' },
							{ type: 'bar', name: '股票股利' },
						],
						tooltip: {
							trigger: 'axis',
							axisPointer: {
								type: 'cross',
							},
							valueFormatter: function (value) {
								return value.toLocaleString() + '元'
							},
						},
						grid: {
							top: windowWidth > 768 ? '18%' : windowWidth > 576 ? '24%' : '26%',
							left: windowWidth > 768 ? '4%' : windowWidth > 576 ? '6%' : '7.2%',
							right: windowWidth > 768 ? '4%' : windowWidth > 576 ? '4%' : '5%',
							height: windowWidth > 768 ? '70%' : '62%',
						}
					}}
					customHeight='h-72 md:h-88 lg:h-[450px]'
				/>
				<Table size='medium'>
					<TableBody>
						<TableRow className='bg-secondary_blue/20 dark:bg-deep_blue'>
							{[
								'公告日',
								'現金股利',
								'股票股利',
								'除息日',
								'除權日',
								'現金股利發放日',
								'填息花費日數',
								'股利發放形式',
							].map((header) => (
								<TableCell
									sx={{
										width: '100%',
										minWidth:
											header === '現金股利發放日' || header === '填息花費日數' || header === '股利發放形式'
												? '132px'
												: '108px',
									}}
									className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
									key={header}
								>
									{header}
								</TableCell>
							))}
						</TableRow>
						{data.map((item) => (
							<TableRow key={item.id}>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.announcedDate}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.cashDividend}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.stockDividend}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.XDTradingDate}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.XRTradingDate}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.cashDividendPaidDate}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.XDPriceRecoveryDays}
								</TableCell>
								<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'>
									{item.payoutType}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</section>
		)
	)
}
