'use client'

import Highcharts from 'highcharts/highstock'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'

export default function AnalChart() {
	const [isLoading, setIsLoading] = useState(false)

	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

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
	}, [])

	return isLoading ? <ReactLoading type={'spin'} /> : <div ref={chartContainer}></div>
}
