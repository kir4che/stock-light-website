import { calculateADL, calculateRSI, calculateWilliam } from '@/utils/technicalAnal'
import { macd } from 'finmath'
import kdj from 'kdj'

export function macdOption(dateData, closePriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: 'MACD',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['MACD', 'DIF', 'D - M'],
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
							var colorList
							if (params.data >= 0) {
								colorList = '#EB5554'
							} else {
								colorList = '#46B262'
							}
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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

export function kdOption(dateData, closePriceData, lowPriceData, highPriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: 'KD',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['K', 'D'],
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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

export function rsiOption(dateData, closePriceData, dataZoomRange, handleDataZoomChange) {
	const option = {
		title: {
			text: 'RSI',
			left: 'center',
			top: '2.5%',
		},
		legend: {
			bottom: '2%',
			left: 'center',
			data: ['RSI5', 'RSI10'],
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
				data: calculateRSI(closePriceData, 5),
				color: '#40B4FF',
			},
			{
				name: 'RSI10',
				type: 'line',
				symbol: 'none',
				data: calculateRSI(closePriceData, 10),
				color: '#FFDE6B',
			},
		],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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
