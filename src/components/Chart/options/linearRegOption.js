import * as echarts from 'echarts'
import ecStat from 'echarts-stat'

// 線性迴歸
export function linearRegOption(stockSymbol, tab) {
	echarts.registerTransform(ecStat.transform.regression)

	const data = []
	const stockPriceList = []

	let resultData = [
		[8.80, 17.30],[2.00, 20.40],[6.30,21.70],[9.00,20.90],[10.00,17.30],
		[10.00,17.10],[10.00,18.00],[10.00,17.70],[3.50,11.60],
	]
	const maxLength = Math.max(data.length, stockPriceList.length)

	// 合併成二維陣列
	for (let i = 0; i < maxLength; i++) {
		const newData = i < data.length ? data[i] : null
		const newStockPrice = i < stockPriceList.length ? stockPriceList[i] : null

		resultData.push([newData, newStockPrice])
	}

	return {
		// 大標題
		title: {
			text: `${stockSymbol}股價的與${tab}相關性分析`,
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
			name: '係數',
			scale: true,
		},
		// y軸
		yAxis: {
			type: 'value',
			name: '狀態',
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
		tooltip: {
			order: 'valueDesc',
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#40B4FF',
				},
			},
			valueFormatter: (value) => value.toFixed(4),
		},
		// 圖表位置
		grid: {
			x: 68, // 左側間距
			y: 80, // 上側間距
			x2: 48, // 右側間距
			y2: 50, // 下側間距
		},
	}
}
