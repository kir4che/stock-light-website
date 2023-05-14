import { useEffect, useRef, useState } from 'react'

import Highcharts from 'highcharts/highstock'
import HCAccessibility from 'highcharts/modules/accessibility'
import HCData from 'highcharts/modules/data'
import HCExportData from 'highcharts/modules/export-data'
import HCExporting from 'highcharts/modules/exporting'
import HCStockTools from 'highcharts/modules/stock-tools'
import ReactLoading from 'react-loading'

import data from 'src/pages/api/taiex.json'

HCExporting(Highcharts)
HCExportData(Highcharts)
HCAccessibility(Highcharts)
HCStockTools(Highcharts)
HCData(Highcharts)

export default function Taiex() {
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
		console.log('todayTimestamp', todayTimestamp)
		const todayIndex = dataMap.get(todayTimestamp)
		console.log('todayIndex', todayIndex)

		const yesterdayTimestamp = yesterday.getTime()
		const yesterdayIndex = dataMap.get(yesterdayTimestamp)

		let titleColor = yesterdayIndex >= todayIndex ? '#EE3234' : '#05AA02'

		// 建立 Highcharts 圖表
		Highcharts.stockChart(chartContainer.current, {
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
		})

		setIsLoading(false)
	}, [])

	return isLoading ? <ReactLoading type={'spin'} /> : <div className='w-full' ref={chartContainer}></div>
}
