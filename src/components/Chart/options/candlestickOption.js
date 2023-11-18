import { calculateMA } from '@/utils/technicalAnalysis'

export function candlestickOption(dateData, closePriceData, priceData, volumeData, dataZoomRange, handleZoomChange) {
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
			borderWidth: 1,
			borderColor: '#ccc',
			padding: 10,
			textStyle: {
				color: '#000',
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
				name: '5MA',
				type: 'line',
				data: calculateMA(5, closePriceData),
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
				data: calculateMA(10, closePriceData),
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
				data: calculateMA(20, closePriceData),
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
				data: calculateMA(60, closePriceData),
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
				data: calculateMA(120, closePriceData),
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
				data: calculateMA(240, closePriceData),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
		],
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
