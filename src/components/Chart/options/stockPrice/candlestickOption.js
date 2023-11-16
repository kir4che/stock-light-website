// K線圖
export function candlestickOption(dateData, priceData, volumeData, dataZoomRange, handleDataZoomChange) {
	function calculateMA(dayCount, data) {
		var result = []
		for (var i = 0, len = data.length; i < len; i++) {
			if (i < dayCount) {
				result.push('-')
				continue
			}
			var sum = 0
			for (var j = 0; j < dayCount; j++) {
				sum += data[i - j][1]
			}
			result.push(Math.round((sum / dayCount) * 100) / 100)
		}
		return result
	}

	function calculateEMA(dayCount, data) {
		var result = []
		var multiplier = 2 / (dayCount + 1)
		var sum = 0

		for (var i = 0, len = data.length; i < len; i++) {
			if (i < dayCount - 1) {
				result.push('-')
				sum += data[i][1]
				continue
			}

			if (i === dayCount - 1) {
				sum += data[i][1]
				result.push(sum / dayCount)
			} else {
				var ema = (data[i][1] - result[i - 1]) * multiplier + result[i - 1]
				result.push(ema)
			}
		}

		return result
	}

	const option = {
		legend: {
			bottom: '1%',
			left: 'center',
			data: ['MA5', 'MA10', 'MA20', 'MA60', 'MA240', 'EMA5'],
		},
		xAxis: [
			{
				type: 'category',
				data: dateData,
				boundaryGap: true,
				axisLine: { onZero: false },
				splitLine: { show: false },
				min: 'dataMin',
				max: 'dataMax',
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
				name: 'MA5',
				type: 'line',
				data: calculateMA(5, priceData),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: 'MA10',
				type: 'line',
				data: calculateMA(10, priceData),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: 'MA20',
				type: 'line',
				data: calculateMA(20, priceData),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: 'MA60',
				type: 'line',
				data: calculateMA(60, priceData),
				showSymbol: false,
				smooth: true,
				lineStyle: {
					width: 1.25,
					opacity: 1,
				},
			},
			{
				name: 'MA240',
				type: 'line',
				data: calculateMA(240, priceData),
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
				onZoom: handleDataZoomChange,
			},
			{
				show: true,
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
