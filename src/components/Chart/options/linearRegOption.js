import * as echarts from 'echarts'
import ecStat from 'echarts-stat'

// 線性迴歸
export function linearRegOption(stock, weather, weatherData, priceList) {
	echarts.registerTransform(ecStat.transform.regression)

	const resultData = []
	// 合併成二維陣列
	for (let i = 0; i < Math.max(weatherData.length, priceList.length); i++) {
		const newWeatherData = i < weatherData.length ? weatherData[i] : null
		const newPriceList = i < priceList.length ? priceList[i] : null
		resultData.push([newWeatherData, newPriceList])
	}

	return {
		title: {
			text: `${stock}股價與${weather}的相關性分析`,
			top: 18,
			left: 'center',
		},
		xAxis: {
			type: 'value',
			name: '係數',
			scale: true,
		},
		yAxis: {
			type: 'value',
			name: weather,
			scale: true,
		},
		dataset: [
			{
				source: resultData,
			},
			{
				transform: {
					type: 'ecStat:regression',
					config: { method: 'linear', formulaOn: 'end' },
				},
			},
		],
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
		grid: {
			top: '15%',
			left: '5%',
			right: '6%',
			height: '75%',
		},
	}
}
