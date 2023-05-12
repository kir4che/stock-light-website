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
				date.setDate(date.getDate() - 1) // 設定昨天
				date.setUTCHours(13, 30, 0, 0) // 設定下午 1:30
				const yesterday = date
				date.setDate(date.getDate() - 1) // 設定前天，為了後續漲跌顏色。
				const twoDaysAgo = date
				const dataMap = new Map(data)
				const yesterdayTimestamp = yesterday.getTime()
				const yesterdayIndex = dataMap.get(yesterdayTimestamp)

				const twoDaysAgoTimestamp = twoDaysAgo.getTime()
				const twoDaysAgoIndex = dataMap.get(twoDaysAgoTimestamp)

				let titleColor = yesterdayIndex >= twoDaysAgoIndex ? '#EE3234' : '#05AA02'

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
						x: -10,
						y: 40,
						style: {
							fontSize: '1.45em',
							fontWeight: '500',
							color: '#252525',
						},
					},

					subtitle: {
						text: yesterdayIndex,
						align: 'left',
						x: 0,
						y: 92,
						style: {
							fontSize: '1.85em',
							fontWeight: '700',
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
						maskFill: '#4FBAFF15',
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

					navigation: {
						// 隱藏可下載圖表選項
						buttonOptions: {
							enabled: false,
						},
					},
				})
			})

		setIsLoading(false)
	}, [])

	return isLoading ? <ReactLoading type={'spin'} /> : <div className='w-full' ref={chartContainer}></div>
}
