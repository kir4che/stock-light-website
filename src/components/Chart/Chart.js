import * as echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import ecStat from 'echarts-stat'
import { useEffect, useState } from 'react'
import { stockPrice } from '../../data/stockPrice'

// 線性迴歸
export default function Chart({ stock, tab }) {
	const [option, setOption] = useState(null)

	useEffect(() => {
		echarts.registerTransform(ecStat.transform.regression)

		const data = tab.data.length > 0 ? tab.data : Array.from({ length: 243 }, () => Math.random() * 45)

		let resultData = []
		data.forEach((item, i) => {
			let dataTemp = []
			let price = stockPrice.find((item) => item.id === stock)
			dataTemp.push(item)
			dataTemp.push(price.data[i])
			resultData.push(dataTemp)
		})

		const option = {
			// 大標題
			title: {
				text: `${stock} 股價與${tab.label}的相關性分析`,
				top: 20,
				left: 'center',
			},
			dataset: [
				// 資料源
				{
					source: resultData,
				},
				// 資料類型轉換
				{
					transform: {
						type: 'ecStat:regression',
						config: { method: 'linear', formulaOn: 'end' },
					},
				},
			],
			// x軸
			xAxis: {
				type: 'value',
				scale: true,
			},
			// y軸
			yAxis: {
				type: 'value',
				name: '收盤價',
				scale: true,
			},
			// 圖表配置
			series: [
				{
					type: 'scatter',
				},
				{
					type: 'line',
					datasetIndex: 1,
					symbolSize: 0.1,
					symbol: 'circle',
					label: { show: true, fontSize: 16 },
					labelLayout: { dx: -20 },
					encode: { label: 2, tooltip: 1 },
				},
			],
			// 圖表位置
			grid: {
				x: 60, // 左側間距
				y: 80, // 上側間距
				x2: 32, // 右側間距
				y2: 45, // 下側間距
			},
		}

		setOption(option)
	}, [tab, stock])

	return (
		<>
			<h5 className='mb-3'>今日最佳預測趨勢</h5>
			{option && (
				<ReactEcharts
					className='bg-white pb-4 h-72 sm:h-88 xl:h-[480px] border rounded dark:border-none shadow-md dark:bg-zinc-900/60'
					option={option}
					style={{
						height: '100%',
						width: '100%',
					}}
				/>
			)}
		</>
	)
}
