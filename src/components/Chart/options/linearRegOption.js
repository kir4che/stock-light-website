import { useEffect, useState } from 'react'
import * as echarts from 'echarts'
import ecStat from 'echarts-stat'

// 線性迴歸
export function linearRegOption(stock, weather, weatherData, priceList) {
	const [windowWidth, setWindowWidth] = useState(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth)
			window.addEventListener("resize", () => setWindowWidth(window.innerWidth))
		}

		return () => {
			if (typeof window !== "undefined")
				window.removeEventListener("resize", () => setWindowWidth(window.innerWidth))
		}
	}, [])

	echarts.registerTransform(ecStat.transform.regression)

	const resultData = []
	// 合併成二維陣列
	for (let i = 0; i < Math.max(weatherData.length, priceList.length); i++) {
		const newWeatherData = i < weatherData.length ? weatherData[i] : null
		const newPriceList = i < priceList.length ? priceList[i] : null
		resultData.push([newWeatherData, newPriceList])
	}

	const option = {
		title: {
			text: `${stock}股價 (y) 與${weather} (x) 的相關性分析`,
			top: 18,
			left: 'center',
		},
		xAxis: {
			type: 'value',
			name: weather,
			scale: true,
		},
		yAxis: {
			type: 'value',
			name: '股價',
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
			top: windowWidth > 768 ? '15%' : windowWidth > 576 ? '18%' : '24%',
			left: windowWidth > 576 ? '5%' : '8%',
			right: windowWidth > 768 ? '7%' : windowWidth > 576 ? '9%' : '14%',
			height: windowWidth > 768 ? '76%' : windowWidth > 576 ? '72%' : '66%',
		},
	}

	return option
}
