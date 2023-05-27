import ResultTable from '@/components/Light/ResultTable'

import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import Highcharts from 'highcharts'
import ReactLoading from 'react-loading'

export default function LightResult() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		// 多條折線圖

		Highcharts.chart(chartContainer.current, {
			chart: {
				height: 450,
				backgroundColor: null,
			},

			title: {
				text: '',
			},

			yAxis: {
				title: {
					text: '股價',
				},
			},

			plotOptions: {
				series: {
					label: {
						connectorAllowed: false,
					},
					pointStart: 2010,
				},
			},

			series: [
				{
					name: 'Installation & Developers',
					data: [43934, 48656, 65165, 81827, 112143, 142383, 171533, 165174, 155157, 161454, 154610],
				},
				{
					name: 'Manufacturing',
					data: [24916, 37941, 29742, 29851, 32490, 30282, 38121, 36885, 33726, 34243, 31050],
				},
				{
					name: 'Sales & Distribution',
					data: [11744, 30000, 16005, 19771, 20185, 24377, 32147, 30912, 29243, 29213, 25663],
				},
				{
					name: 'Operations & Maintenance',
					data: [null, null, null, null, null, null, null, null, 11164, 11218, 10077],
				},
				{
					name: 'Other',
					data: [21908, 5548, 8105, 11248, 8989, 11816, 18274, 17300, 13053, 11906, 10073],
				},
			],

			responsive: {
				rules: [
					{
						condition: {
							maxWidth: 500,
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom',
							},
						},
					},
				],
			},

			// 移除浮水印
			credits: {
				enabled: false,
			},
		})

		setIsLoading(false)
	}, [])

	return (
		<div className='w-full p-10 bg-white rounded-2xl'>
			<div className='flex items-start justify-between mb-4'>
				<div className='flex items-end mb-6 space-x-2 tracking-wider'>
					<h3 className='font-medium '>天氣型態</h3>
					<p className='text-sm opacity-80'>
						{new Date().getFullYear()}/{new Date().getMonth() + 1}/{new Date().getDate()}
					</p>
				</div>
				<button
					type='button'
					onClick={() => router.push('/light')}
					className='inline-flex items-center justify-center mr-4 text-gray-700 rounded-full'
				>
					<svg
						className='w-6 h-6'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						aria-hidden='true'
					>
						<path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18L18 6M6 6l12 12' />
					</svg>
				</button>
			</div>
			{isLoading ? (
				<ReactLoading type={'spin'} color='#4FBAFF' width={80} height={80} />
			) : (
				<>
					<div ref={chartContainer}></div>
					<div className='px-6 mb-4 space-y-5'>
						<ResultTable />
						<p className='text-sm opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
					</div>
					<button
						className='flex justify-center px-16 py-2.5 mx-auto mb-8 text-sm font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow focus:outline-none sm:mt-0 hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
						type='button'
					>
						保存結果
					</button>
				</>
			)}
		</div>
	)
}
