import Highcharts from 'highcharts/highstock'
import { useEffect, useRef, useState } from 'react'

export default function AnalChart() {
	const [isLoading, setIsLoading] = useState(false)
	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		// 迴歸分析圖設定
		Highcharts.chart(chartContainer.current, {
			chart: {
				height: 450,
				backgroundColor: null,
			},

			title: {
				text: '2330 台積電的股價與氣溫的相關性分析',
			},
			subtitle: {
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
		<>
			{isLoading ? (
				<ReactLoading type={'spin'} color='#4FBAFF' width={80} height={80} />
			) : (
				<div ref={chartContainer}></div>
			)}
		</>
	)
}
