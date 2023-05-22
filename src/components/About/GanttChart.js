'use client'
import { useEffect, useRef, useState } from 'react'

import Highcharts from 'highcharts/highcharts-gantt'
import ReactLoading from 'react-loading'

export default function GanttChart() {
	const [isLoading, setIsLoading] = useState(false)

	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		let today = new Date()

		// 任務
		const data = [
			{
				name: 'Project 1',
				data: [
					{
						name: 'Planning',
						id: 'planning',
						start: Date.UTC(2023, 5 - 1, 2),
						end: Date.UTC(2023, 5 - 1, 12),
					},
					{
						name: 'Layout',
						id: 'layout',
						start: Date.UTC(2023, 5 - 1, 7),
						end: Date.UTC(2023, 5 - 1, 25),
					},
					{
						name: 'Develop',
						id: 'develop',
						start: Date.UTC(2023, 6 - 1, 1),
						end: Date.UTC(2023, 7 - 1, 2),
					},
					{
						name: 'Implement',
						id: 'implement',
						start: Date.UTC(2023, 6 - 1, 16),
						end: Date.UTC(2023, 7 - 1, 23),
					},
				],
			},
		]

		Highcharts.ganttChart(chartContainer.current, {
			// x 軸：月份
			xAxis: [
				{
					tickInterval: 1000 * 60 * 60 * 24 * 30,
				},
			],
			// 任務資訊的日期格式
			tooltip: {
				xDateFormat: '%Y/%m/%d',
			},
			series: data,
		})

		setIsLoading(false)
	}, [])

	return isLoading ? <ReactLoading type={'spin'} /> : <div className='w-full' ref={chartContainer}></div>
}
