import { calculateADL, calculateBias, calculateRSI, calculateWilliam } from '@/utils/technicalAnal'
import { ma, macd } from 'finmath'
import kdj from 'kdj'

export function macdOption(dateData, closePriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: '指數平滑異同移動平均線 MACD',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['MACD', 'DIF', 'D-M'],
			type: 'scroll',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				splitLine: { show: false },
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'MACD',
				type: 'line',
				symbol: 'none',
				data: macd(closePriceData).signal.map((value) => Math.round(value * 100) / 100),
				color: '#40B4FF',
			},
			{
				name: 'DIF',
				type: 'line',
				symbol: 'none',
				data: macd(closePriceData).MACD.map((value) => Math.round(value * 100) / 100),
				color: '#FFDE6B',
			},
			{
				name: 'D-M',
				type: 'bar',
				data: macd(closePriceData).histogram.map((value) => Math.round(value * 100) / 100),
				itemStyle: {
					normal: {
						color: function (params) {
							let colorList
							if (params.data >= 0) colorList = '#EB5554'
							else colorList = '#46B262'
							return colorList
						},
					},
				},
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}

export function kdOption(dateData, closePriceData, lowPriceData, highPriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: '隨機指標 KD',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['K', 'D'],
			type: 'scroll',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'K',
				type: 'line',
				symbol: 'none',
				data: kdj(closePriceData, lowPriceData, highPriceData).K.map((value) => Math.round(value * 100) / 100),
				color: '#40B4FF',
			},
			{
				name: 'D',
				type: 'line',
				symbol: 'none',
				data: kdj(closePriceData, lowPriceData, highPriceData).D.map((value) => Math.round(value * 100) / 100),
				color: '#FFDE6B',
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}

export function rsiOption(dateData, changeData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: '相對強弱指數 RSI',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['RSI5', 'RSI10'],
			type: 'scroll',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'RSI5',
				type: 'line',
				symbol: 'none',
				data: calculateRSI(changeData, 5),
				color: '#40B4FF',
			},
			{
				name: 'RSI10',
				type: 'line',
				symbol: 'none',
				data: calculateRSI(changeData, 10),
				color: '#FFDE6B',
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}

export function williamOption(dateData, closePriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: 'William %R',
			left: 'center',
			top: '2.5%',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'William',
				type: 'line',
				symbol: 'none',
				data: calculateWilliam(closePriceData),
				color: '#40B4FF',
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}

export function biasOption(dateData, closePriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: '乖離率 BIAS',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['BIAS10', 'BIAS20', 'B10-B20'],
			type: 'scroll',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'BIAS10',
				type: 'line',
				symbol: 'none',
				data: calculateBias(closePriceData, ma(closePriceData, 10), 10),
				color: '#40B4FF',
			},
			{
				name: 'BIAS20',
				type: 'line',
				symbol: 'none',
				data: calculateBias(closePriceData, ma(closePriceData, 20), 20),
				color: '#FFDE6B',
			},
			{
				name: 'B10-B20',
				type: 'bar',
				data: calculateBias(closePriceData, ma(closePriceData, 10), 10)
					.map((value, index) => value - calculateBias(closePriceData, ma(closePriceData, 20), 20)[index])
					.map((value) => Math.round(value * 100) / 100),
				itemStyle: {
					normal: {
						color: function (params) {
							let colorList
							if (params.data >= 0) colorList = '#EB5554'
							else colorList = '#71717a'
							return colorList
						},
					},
				},
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}

export function adlOption(
	dateData,
	closePriceData,
	lowPriceData,
	highPriceData,
	volumeData,
	dataZoomRange,
	handleDataZoomChange
) {
	const option = {
		title: {
			text: '騰落指標 ADL',
			left: 'center',
			top: '2.5%',
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
			},
		],
		yAxis: {
			type: 'value',
			scale: true,
		},
		series: [
			{
				name: 'ADL',
				type: 'line',
				symbol: 'none',
				data: calculateADL(closePriceData, lowPriceData, highPriceData, volumeData),
				color: '#40B4FF',
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
		},
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
		grid: [
			{
				top: '12%',
				left: '4.75%',
				right: '3%',
				height: '68%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}
