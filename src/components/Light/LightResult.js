'use client'

import LightTable from '@/components/Light/LightTable'

import Highcharts from 'highcharts/highstock'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import ReactLoading from 'react-loading'

export default function LightResult() {
	const router = useRouter()

	const [isLoading, setIsLoading] = useState(false)
	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		// 迴歸分析圖設定
		Highcharts.chart(chartContainer.current, {
			chart: {
				backgroundColor: null,
			},

			title: {
				text: '',
			},

			xAxis: {
				min: -0.5,
				max: 5.5,
				gridLineWidth: 1,
			},
			yAxis: {
				min: 0,
				gridLineWidth: 1,
			},

			// 移除圖例
			legend: {
				enabled: false,
			},

			series: [
				{
					type: 'line',
					name: 'Regression Line',
					data: [
						[0, 1.11],
						[5, 4.51],
					],
					color: '#4FBAFF',
					lineWidth: 1.5,
					marker: false,
				},
				{
					marker: {
						symbol: 'circle',
						radius: 4,
						fillColor: '#FFDC62',
					},
					type: 'scatter',
					name: 'Observations',
					data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
					color: '#FFDC62',
				},
			],

			// 移除浮水印
			credits: {
				enabled: false,
			},
		})

		setIsLoading(false)
	}, [])

	return (
		<div className='w-full px-3 pt-6 bg-white rounded-2xl pb-14'>
			<div className='flex items-start justify-between mb-4'>
				<div className='flex items-end space-x-2 tracking-wider'>
					<h3 className='pl-3 font-medium'>天氣型態</h3>
					<p className='text-sm opacity-80'>
						{new Date().getFullYear()}/{new Date().getMonth()}/{new Date().getDate()}
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
					<div className='px-5 mt-8 space-y-3'>
						<LightTable />
						<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
					</div>
					<button
						className='flex justify-center px-10 py-2 mx-auto text-sm font-medium transition-all duration-300 ease-out border-0 rounded-full cursor-pointer bg-primary_yellow focus:outline-none sm:mt-0 hover:ring-2 hover:ring-offset-2 hover:ring-primary_yellow'
						type='button'
					>
						保存結果
					</button>
				</>
			)}
		</div>
	)
}
