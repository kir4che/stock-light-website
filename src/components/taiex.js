import { useEffect, useRef, useState } from 'react'

import Highcharts from 'highcharts/highstock'
import HCAccessibility from 'highcharts/modules/accessibility'
import HCData from 'highcharts/modules/data'
import HCExportData from 'highcharts/modules/export-data'
import HCExporting from 'highcharts/modules/exporting'
import HCStockTools from 'highcharts/modules/stock-tools'
import ReactLoading from 'react-loading'

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

		// 取得 JSON 資料
		const url = 'https://demo-live-data.highcharts.com/aapl-c.json'
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				// 標題使用今日指數
				const date = new Date()
				date.setDate(date.getDate() - 1) // 設定為昨天
				date.setUTCHours(13, 30, 0, 0) // 設定為下午 1:30
				const timestamp = date.getTime()
				const dataMap = new Map(data)
				const yesterdayIndex = dataMap.get(timestamp)

				// 建立 Highcharts 圖表
				Highcharts.stockChart(chartContainer.current, {
					rangeSelector: {
						selected: 1,
					},

					title: {
						text: yesterdayIndex,
						align: 'left',
					},

					// 下面的導覽列
					navigator: {
						series: {
							accessibility: {
								exposeAsGroupOnly: true,
							},
						},
					},

					series: [
						{
							name: '加權股價指數',
							data: data,
							type: 'area',
							threshold: null,
							tooltip: {
								valueDecimals: 2,
							},
							color: '#FFDC62', // 線條顏色
							// 面積顏色
							fillColor: {
								linearGradient: {
									x1: 0,
									y1: 0,
									x2: 0,
									y2: 1,
								},
								stops: [
									[0, '#FFDC62'],
									[1, '#FFF0'],
								],
							},
							animation: {
								duration: 2000,
							},
						},
					],
				})
			})

		setIsLoading(false)
	}, [])

	return isLoading ? <ReactLoading type={'spin'} /> : <div className='w-full' ref={chartContainer}></div>
}
