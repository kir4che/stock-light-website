'use client'

import SelectBox from '@/components/SelectBox'

import Highcharts from 'highcharts/highstock'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'

const tabsData = [
	{
		label: 'This Text',
		content: 'Ut irure mollit nulla eiusmod excepteur laboris elit sit anim magna tempor excepteur labore nulla.',
	},
	{
		label: 'That Text',
		content:
			'Fugiat dolor et quis in incididunt aute. Ullamco voluptate consectetur dolor officia sunt est dolor sint.',
	},
]

export default function AnalTabs() {
	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

	const tabsRef = useRef([])

	const [isLoading, setIsLoading] = useState(false)

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
			series: [
				{
					type: 'line',
					name: 'Regression Line',
					data: [
						[0, 1.11],
						[5, 4.51],
					],
					marker: {
						enabled: false,
					},
					states: {
						hover: {
							lineWidth: 0,
						},
					},
					enableMouseTracking: false,
				},
				{
					type: 'scatter',
					name: 'Observations',
					data: [1, 1.5, 2.8, 3.5, 3.9, 4.2],
					marker: {
						radius: 4,
					},
				},
			],
		})

		setIsLoading(false)
		return () => window.removeEventListener('resize', setTabPosition)
	}, [activeTabIndex])

	return (
		<div className='bg-white rounded'>
			<div className='relative'>
				<div className='flex items-center justify-between px-5 pt-3'>
					<div className='flex items-center space-x-5'>
						{tabsData.map((tab, idx) => {
							return (
								<button
									key={idx}
									ref={(el) => (tabsRef.current[idx] = el)}
									className='pb-2 '
									onClick={() => setActiveTabIndex(idx)}
								>
									{tab.label}
								</button>
							)
						})}
					</div>
					<SelectBox />
				</div>
				<span
					className='absolute bottom-0 block h-1 transition-all duration-300 bg-teal-500'
					style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
				/>
			</div>
			<div className='pt-8 pb-6'>
				{isLoading ? <ReactLoading type={'spin'} /> : <div ref={chartContainer}></div>}
				{/* <p>{tabsData[activeTabIndex].content}</p> */}
			</div>
		</div>
	)
}
