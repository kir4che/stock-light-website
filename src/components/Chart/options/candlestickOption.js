import { boll, ema, ma } from 'finmath'

export function candlestickOptionByMA(
	dateData,
	closePriceData,
	priceData,
	volumeData,
	dataZoomRange,
	handleZoomChange
) {
	const option = {
		legend: {
			bottom: '1%',
			left: 'center',
			data: ['5MA', '10MA', '20MA', '60MA', '120MA', '240MA'],
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				splitLine: { show: false },
				axisPointer: {
					z: 100,
				},
			},
			{
				type: 'category',
				gridIndex: 1,
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				min: 'dataMin',
				max: 'dataMax',
			},
		],
		yAxis: [
			{
				scale: true,
				splitArea: {
					show: true,
					areaStyle: {
						color: ['', 'rgba(140,177,235,0.1)'],
					},
				},
			},
			{
				scale: true,
				gridIndex: 1,
				splitNumber: 2,
				axisLabel: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
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
				dataZoom: {
					yAxisIndex: false,
				},
				brush: {
					type: ['lineX', 'clear'],
				},
			},
		},
		brush: {
			xAxisIndex: 'all',
			brushLink: 'all',
			outOfBrush: {
				colorAlpha: 0.1,
			},
		},
		axisPointer: {
			link: [
				{
					xAxisIndex: 'all',
				},
			],
			label: {
				backgroundColor: '#777',
			},
		},
		series: [
			{
				name: '日K',
				type: 'candlestick',
				data: priceData,
				itemStyle: {
					color: '#46B262',
					color0: '#EB5554',
					borderColor: '#46B262',
					borderColor0: '#EB5554',
				},
			},
			{
				name: '成交量',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: volumeData,
				itemStyle: {
					color: function (params) {
						var colorList = priceData.map((item) => (item[0] >= item[1] ? '#EB5554' : '#46B262'))
						return colorList[params.dataIndex]
					},
				},
			},
			{
				name: '5MA',
				type: 'line',
				data: ma(closePriceData, 5).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '10MA',
				type: 'line',
				data: ma(closePriceData, 10).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '20MA',
				type: 'line',
				data: ma(closePriceData, 20).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '60MA',
				type: 'line',
				data: ma(closePriceData, 60).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '120MA',
				type: 'line',
				data: ma(closePriceData, 120).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '240MA',
				type: 'line',
				data: ma(closePriceData, 240).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
		],
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
		},
		grid: [
			{
				top: '6%',
				left: '4.75%',
				right: '3%',
				height: '60%',
			},
			{
				top: '72%',
				left: '4.5%',
				right: '3%',
				height: '18%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
			{
				show: true,
				xAxisIndex: [0, 1],
				type: 'inside',
				top: '85%',
				left: '4%',
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
		],
	}

	return option
}

export function candlestickOptionByEMA(
	dateData,
	closePriceData,
	priceData,
	volumeData,
	dataZoomRange,
	handleZoomChange
) {
	const option = {
		legend: {
			bottom: '1%',
			left: 'center',
			data: ['5EMA', '10EMA', '20EMA', '60EMA', '120EMA', '240EMA'],
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				splitLine: { show: false },
				axisPointer: {
					z: 100,
				},
			},
			{
				type: 'category',
				gridIndex: 1,
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				min: 'dataMin',
				max: 'dataMax',
			},
		],
		yAxis: [
			{
				scale: true,
				splitArea: {
					show: true,
					areaStyle: {
						color: ['', 'rgba(140,177,235,0.1)'],
					},
				},
			},
			{
				scale: true,
				gridIndex: 1,
				splitNumber: 2,
				axisLabel: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
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
				dataZoom: {
					yAxisIndex: false,
				},
				brush: {
					type: ['lineX', 'clear'],
				},
			},
		},
		brush: {
			xAxisIndex: 'all',
			brushLink: 'all',
			outOfBrush: {
				colorAlpha: 0.1,
			},
		},
		axisPointer: {
			link: [
				{
					xAxisIndex: 'all',
				},
			],
			label: {
				backgroundColor: '#777',
			},
		},
		series: [
			{
				name: '日K',
				type: 'candlestick',
				data: priceData,
				itemStyle: {
					color: '#46B262',
					color0: '#EB5554',
					borderColor: '#46B262',
					borderColor0: '#EB5554',
				},
			},
			{
				name: '成交量',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: volumeData,
				itemStyle: {
					color: function (params) {
						var colorList = priceData.map((item) => (item[0] >= item[1] ? '#EB5554' : '#46B262'))
						return colorList[params.dataIndex]
					},
				},
			},
			{
				name: '5EMA',
				type: 'line',
				data: ema(closePriceData, 5).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '10EMA',
				type: 'line',
				data: ema(closePriceData, 10).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '20EMA',
				type: 'line',
				data: ema(closePriceData, 20).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '60EMA',
				type: 'line',
				data: ema(closePriceData, 60).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '120EMA',
				type: 'line',
				data: ema(closePriceData, 120).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '240EMA',
				type: 'line',
				data: ema(closePriceData, 240).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
		],
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
		},
		grid: [
			{
				top: '6%',
				left: '4.75%',
				right: '3%',
				height: '60%',
			},
			{
				top: '72%',
				left: '4.5%',
				right: '3%',
				height: '18%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
			{
				show: true,
				xAxisIndex: [0, 1],
				type: 'inside',
				top: '85%',
				left: '4%',
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
		],
	}

	return option
}

export function candlestickOptionByBoll(
	dateData,
	closePriceData,
	priceData,
	volumeData,
	dataZoomRange,
	handleZoomChange
) {
	const option = {
		legend: {
			bottom: '1%',
			left: 'center',
			data: ['上', '20MA', '下'],
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				splitLine: { show: false },
				axisPointer: {
					z: 100,
				},
			},
			{
				type: 'category',
				gridIndex: 1,
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				axisTick: { show: false },
				splitLine: { show: false },
				axisLabel: { show: false },
				min: 'dataMin',
				max: 'dataMax',
			},
		],
		yAxis: [
			{
				scale: true,
				splitArea: {
					show: true,
					areaStyle: {
						color: ['', 'rgba(140,177,235,0.1)'],
					},
				},
			},
			{
				scale: true,
				gridIndex: 1,
				splitNumber: 2,
				axisLabel: { show: false },
				axisLine: { show: false },
				axisTick: { show: false },
				splitLine: { show: false },
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
				dataZoom: {
					yAxisIndex: false,
				},
				brush: {
					type: ['lineX', 'clear'],
				},
			},
		},
		brush: {
			xAxisIndex: 'all',
			brushLink: 'all',
			outOfBrush: {
				colorAlpha: 0.1,
			},
		},
		axisPointer: {
			link: [
				{
					xAxisIndex: 'all',
				},
			],
			label: {
				backgroundColor: '#777',
			},
		},
		visualMap: {
			show: false,
			seriesIndex: 5,
			dimension: 2,
			pieces: [
				{
					value: 1,
					color: '#EC0000',
				},
				{
					value: -1,
					color: '#00DA3C',
				},
			],
		},
		series: [
			{
				name: '日K',
				type: 'candlestick',
				data: priceData,
			},
			{
				name: '成交量',
				type: 'bar',
				xAxisIndex: 1,
				yAxisIndex: 1,
				data: volumeData,
				itemStyle: {
					color: function (params) {
						var colorList = priceData.map((item) => (item[0] >= item[1] ? '#46B262' : '#EB5554'))
						return colorList[params.dataIndex]
					},
				},
			},
			{
				name: '上',
				type: 'line',
				data: boll(ma(closePriceData, 20)).upper.map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '20MA',
				type: 'line',
				data: ma(closePriceData, 20).map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: '下',
				type: 'line',
				data: boll(ma(closePriceData, 20)).lower.map((value) => Math.round(value * 100) / 100),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
		],
		toolbox: {
			feature: {
				saveAsImage: { show: true },
			},
		},
		grid: [
			{
				top: '6%',
				left: '4.75%',
				right: '3%',
				height: '60%',
			},
			{
				top: '72%',
				left: '4.5%',
				right: '3%',
				height: '18%',
			},
		],
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
			{
				show: true,
				xAxisIndex: [0, 1],
				type: 'inside',
				top: '85%',
				left: '4%',
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
		],
	}

	return option
}
