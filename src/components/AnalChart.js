'use client'

import AnalTable from '@/components/AnalTable'
import SelectBox from '@/components/SelectBox'
import Tooltip from '@/components/Tooltip'

import Highcharts from 'highcharts/highstock'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'

const tabsChart = [
	{
		label: '晴天',
		isExplain: true,
		explanation: '天空雲覆蓋率低於 40% 為晴天',
	},
	{
		label: '陰天',
		isExplain: true,
		explanation: '天空雲覆蓋率高於 90% 為陰天',
	},
	{
		label: '氣溫',
		isExplain: false,
		explanation: '',
	},
	{
		label: '降雨量',
		isExplain: false,
		explanation: '',
	},
	{
		label: '紫外線',
		isExplain: false,
		explanation: '',
	},
]

export default function AnalChart() {
	const [isLoading, setIsLoading] = useState(false)

	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

	const tabsRef = useRef([])

	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		function setTabPosition() {
			const currentTab = tabsRef.current[activeTabIndex]
			console.log(currentTab?.offsetLeft, currentTab?.clientWidth)
			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
		}

		setTabPosition()
		window.addEventListener('resize', setTabPosition)

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
		return () => window.removeEventListener('resize', setTabPosition)
	}, [activeTabIndex])

	return (
		<div className='px-3 pt-6 pb-24 bg-white rounded'>
			<h3 className='px-3 mb-3 font-medium tracking-wider'>天氣型態</h3>
			<div className='relative px-2'>
				<div className='flex items-center justify-between pt-3 mb-5'>
					<div className='flex items-center'>
						{tabsChart.map((tab, i) => {
							return (
								// 子類別選單
								<button
									className='flex items-center px-5 pb-2 space-x-1'
									key={i}
									ref={(el) => (tabsRef.current[i] = el)}
									onClick={() => setActiveTabIndex(i)}
								>
									<span>{tab.label}</span>
									<Tooltip isExplain={tab.isExplain} explanation={tab.explanation}>
										<svg
											className={`${tab.isExplain ? '' : 'hidden'}`}
											xmlns='http://www.w3.org/2000/svg'
											fill-opacity='65%'
											x='0'
											y='0'
											width='17'
											height='17'
											viewBox='0 0 48 48'
										>
											<path d='M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z'></path>
										</svg>
									</Tooltip>
								</button>
							)
						})}
					</div>
					<SelectBox />
				</div>
				<span
					className='absolute bottom-0 block h-1 transition-all duration-300 bg-secondary_blue'
					style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
				/>
			</div>
			{isLoading ? (
				<ReactLoading type={'spin'} color='#4FBAFF' width={80} height={80} />
			) : (
				<>
					<div ref={chartContainer}></div>
					<div className='px-5 mt-10 space-y-3'>
						<AnalTable />
						<p className='text-sm text-right opacity-70'>※ 所有結果皆來自歷史數據所反映</p>
					</div>
				</>
			)}
			{/* <p>{tabsChart[activeTabIndex].content}</p> */}
		</div>
	)
}
