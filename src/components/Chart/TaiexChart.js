import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import { useEffect, useState } from 'react'

import Chart from '@/components/Chart/Chart'
import Loading from '@/components/common/Loading'
import { calculatePriceChange } from '@/utils/calculatePriceChange'
import { convertDateTime } from '@/utils/convertDateTime'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function TaiexChart() {
	const [isLoading, setIsLoading] = useState(true)
	const [closeIndex, setCloseIndex] = useState([])
	const [data, setData] = useState({ dates: [], indexs: [] })
	const { dates, indexs } = data

	const fetchTaiex = async () => {
		setIsLoading(true)

		try {
			const response = await fetch(`${process.env.DB_URL}/api/taiex/all`, { method: 'GET' })
			let data = await response.json()

			const closingIndexs = data.map((item) => item.closing_index)
			setCloseIndex(closingIndexs.reverse())

			const dates = data.map((item) => item.date.split('T')[0]).reverse()
			const indexs = data
				.reverse()
				.map(({ closing_index, opening_index, lowest_index, highest_index }) => [
					opening_index,
					closing_index,
					lowest_index,
					highest_index,
				])

			setData({ dates, indexs, closingIndexs })

			if (response.ok) setIsLoading(false)
		} catch (error) {
			console.error('Error: ', error)
		}
	}

	useEffect(() => {
		fetchTaiex()
	}, [])

	return (
		<>
			<div className='items-baseline mt-4 xs:space-x-3 xs:flex xs:mt-0'>
				<h4 className='mt-6 mb-3'>台股大盤加權指數走勢</h4>
				<p className='text-xs font-medium tracking-wide opacity-70'>
					{dates.length ? convertDateTime(dates[dates.length - 1]) : getCurrentDate()} 更新
				</p>
			</div>
			{closeIndex ? (
				<section className='flex items-baseline mb-4 space-x-1 tracking-wide'>
					<p
						className={`text-4xl font-bold ${
							closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] > 0
								? 'text-stock_red'
								: closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] < 0
								? 'text-stock_green'
								: ''
						} `}
					>
						{closeIndex[closeIndex.length - 1]}
					</p>
					<div
						className={`flex items-baseline text-xl font-medium space-x-1 ${
							closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] > 0
								? 'text-stock_red'
								: closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] < 0
								? 'text-stock_green'
								: ''
						}`}
					>
						<p>
							<span>
								{closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] > 0 ? (
									<ArrowDropUpIcon />
								) : closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2] < 0 ? (
									<ArrowDropDownIcon />
								) : (
									''
								)}
							</span>
							<span>{Math.abs(closeIndex[closeIndex.length - 1] - closeIndex[closeIndex.length - 2]).toFixed(2)}</span>
						</p>
						<p>
							({calculatePriceChange(closeIndex[closeIndex.length - 2], closeIndex[closeIndex.length - 1]).toFixed(2)}
							%)
						</p>
					</div>
				</section>
			) : null}
			{!isLoading && data ? (
				<Chart
					option={{
						xAxis: {
							type: 'category',
							data: dates,
							boundaryGap: true,
							axisLine: {
								onZero: false,
							},
							axisLabel: {
								rotate: 45,

								formatter: function (value, index) {
									if (index % 2 === 0) return value
									else return ''
								},
							},
							splitLine: { show: false },
						},
						yAxis: {
							type: 'value',
							scale: true,
							splitArea: {
								show: true,
							},
						},
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
						axisPointer: {
							link: [
								{
									xAxisIndex: 'all',
								},
							],
							label: {
								backgroundColor: '#777',
							},
						},
						series: [
							{
								name: '指數',
								type: 'candlestick',
								data: indexs,
								itemStyle: {
									color: '#EB5554',
									color0: '#46B262',
									borderColor: '#EB5554',
									borderColor0: '#46B262',
								},
							},
						],
						toolbox: {
							feature: {
								saveAsImage: { show: true },
							},
						},
						grid: {
							top: '6%',
							left: '6%',
							right: '3%',
							height: '80%',
						},
					}}
					customHeight='h-72 md:h-[400px] xl:h-[520px]'
				/>
			) : (
				<Loading />
			)}
		</>
	)
}
