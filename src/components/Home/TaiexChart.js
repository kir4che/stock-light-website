import { useEffect, useRef, useState } from 'react'

import Highcharts from 'highcharts/highstock'
import ReactLoading from 'react-loading'

import data from 'src/api/taiex.json'

export default function TaiexChart() {
	const [isLoading, setIsLoading] = useState(false)

	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)

		// 標題使用今日指數
		const date = new Date()
		date.setDate(date.getDate())
		const today = date
		today.setHours(8, 0, 0, 0)
		date.setDate(today.getDate() - 1)
		const yesterday = date

		const dataMap = new Map(data)

		const todayTimestamp = today.getTime()
		const todayIndex = dataMap.get(todayTimestamp)

		const yesterdayTimestamp = yesterday.getTime()
		const yesterdayIndex = dataMap.get(yesterdayTimestamp)

		let titleColor = yesterdayIndex >= todayIndex ? '#EE3234' : '#05AA02'

		// 建立 Highcharts 圖表
		Highcharts.stockChart(chartContainer.current, {
			chart: {
				height: 450,
				backgroundColor: null,
			},
			rangeSelector: {
				selected: 1,
				// 把日期區間選項靠右
				buttonPosition: {
					align: 'right',
					x: 0,
					y: 0,
				},
				// 關閉篩選日期區間
				inputEnabled: false,
			},

			title: {
				text: '台灣大盤指數',
				align: 'left',
				x: 0,
				y: 40,
				style: {
					fontSize: '1.4em',
					fontWeight: '500',
					color: '#252525',
				},
			},

			subtitle: {
				text: todayIndex,
				align: 'left',
				x: 0,
				y: 86,
				style: {
					fontSize: '1.8em',
					fontWeight: '600',
					color: titleColor,
				},
			},

			// 導覽列
			navigator: {
				series: {
					accessibility: {
						exposeAsGroupOnly: true,
					},
				},
				maskFill: '#FFDC6230',
			},

			series: [
				{
					name: '大盤指數',
					data: data,
					type: 'area',
					threshold: null,
					tooltip: {
						valueDecimals: 2,
					},
					color: '#4FBAFF', // 線條顏色
					// 面積顏色
					fillColor: {
						linearGradient: {
							x1: 0,
							y1: 0,
							x2: 0,
							y2: 1,
						},
						stops: [
							[0, '#7DCCFF'],
							[1, '#FFF0'],
						],
					},
					animation: {
						duration: 2000,
					},
				},
			],

			navigation: {
				// 隱藏可下載圖表選項
				buttonOptions: {
					enabled: false,
				},
			},

			// 移除浮水印
			credits: {
				enabled: false,
			},
		})

		setIsLoading(false)
	}, [])

	return isLoading ? (
		<ReactLoading type={'spin'} color='#4FBAFF' width={80} height={80} />
	) : (
		<div ref={chartContainer}></div>
	)
}
