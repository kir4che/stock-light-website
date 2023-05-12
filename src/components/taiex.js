import Date_Range from '@/components/date-range'
import Highcharts from 'highcharts'
import HCExporting from 'highcharts/modules/exporting'
import { useEffect, useRef, useState } from 'react'
import ReactLoading from 'react-loading'

// 匯入需要使用的 Highcharts 模組
HCExporting(Highcharts)

export default function Taiex() {
	const [isLoading, setIsLoading] = useState(false)

	const chartContainer = useRef(null)

	useEffect(() => {
		setIsLoading(true)
		// 取得 JSON 資料
		const url = 'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v10.3.3/samples/data/usdeur.json'
		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				// 建立 Highcharts 圖表
				Highcharts.chart(chartContainer.current, {
					chart: {
						zoomType: 'x',
					},
					title: {
						text: 'USD to EUR exchange rate over time',
						align: 'left',
					},
					xAxis: {
						type: 'datetime',
					},
					yAxis: {
						title: {
							text: 'Exchange rate',
						},
					},
					legend: {
						enabled: false,
					},
					plotOptions: {
						area: {
							fillColor: {
								linearGradient: {
									x1: 0,
									y1: 0,
									x2: 0,
									y2: 1,
								},
								stops: [
									[0, Highcharts.getOptions().colors[0]],
									[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')],
								],
							},
							marker: {
								radius: 2,
							},
							lineWidth: 1,
							states: {
								hover: {
									lineWidth: 1,
								},
							},
							threshold: null,
						},
					},
					series: [
						{
							type: 'area',
							name: 'USD to EUR',
							data: data,
						},
					],
				})
			})

		setIsLoading(false)
	}, [])

	return (
		<>
			<Date_Range />
			{isLoading ? <ReactLoading type={'spin'} /> : <div className='w-full' ref={chartContainer}></div>}
		</>
	)
}
