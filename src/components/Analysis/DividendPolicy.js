import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import Loading from '@/components/common/Loading'

export default function DividendPolicy({ stockId, childOpen }) {
	const [isLoading, setIsLoading] = useState(true)
	const [data, setData] = useState([])
	const [chartData, setChartData] = useState([])

	const option = {
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
			},
		},
		grid: {
			top: '15%',
			left: '5%',
			right: '3%',
			height: '72%',
		},
	}

	const fetchDividendPolicy = async () => {
		setIsLoading(true)
		try {
			const responce = await fetch(`${process.env.DB_URL}/api/stock/history/dividend_policy/${stockId}`, {
				method: 'GET',
			})
			const data = await responce.json()
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
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchDividendPolicy()
	}, [stockId, childOpen])

	return !isLoading && childOpen ? (
		<section className='w-full space-y-4 overflow-x-auto'>
			<Chart option={option} customHeight='h-60 md:h-88 lg:h-[420px] xl:h-[520px]' />
			<Table size='medium'>
				<TableBody>
					<TableRow className='bg-secondary_blue/20 '>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '108px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							公告日
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '90px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							現金股利
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '90px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							股票股利
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '108px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							除息日
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '108px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							除權日
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '132px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							現金股利發放日
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '118px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							填息花費日數
						</TableCell>
						<TableCell
							sx={{
								width: '100%',
								minWidth: '120px',
							}}
							className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600'
						>
							股利發放形式
						</TableCell>
					</TableRow>
					{data.map((item) => (
						<TableRow>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.announcedDate}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.cashDividend}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.stockDividend}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.XDTradingDate}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.XRTradingDate}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.cashDividendPaidDate}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.XDPriceRecoveryDays}
							</TableCell>
							<TableCell className='dark:text-zinc-100 border-zinc-200 dark:border-zinc-600' key={item.id}>
								{item.payoutType}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</section>
	) : (
		<Loading />
	)
}
