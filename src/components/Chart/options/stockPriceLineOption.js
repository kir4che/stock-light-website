export function stockPriceLineOption(
	dateData,
	priceData,
	closePriceData,
	volumeData,
	dataZoomRange,
	handleDataZoomChange
) {
	const option = {
		legend: {
			data: [],
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
		series: [
			{
				name: '收盤價',
				type: 'line',
				symbol: 'none',
				data: closePriceData,
				color: '#4FBAFF',
				areaStyle: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [
							{
								offset: 0,
								color: '#4FBAFF',
							},
							{
								offset: 1,
								color: 'white',
							},
						],
					},
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
						var colorList = priceData.map((item) => (item[0] >= item[1] ? '#46B262' : '#EB5554'))
						return colorList[params.dataIndex]
					},
				},
			},
		],
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
				height: '66%',
			},
			{
				top: '76%',
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
				onZoom: handleDataZoomChange,
			},
			{
				xAxisIndex: [0, 1],
				type: 'inside',
				top: '85%',
				left: '4%',
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleDataZoomChange,
			},
		],
	}

	return option
}
