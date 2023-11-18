// 折線圖
export function lineOption(data, dateData, dataZoomRange, handleZoomChange) {
	return {
		xAxis: {
			type: 'category',
			data: dateData,
		},
		yAxis: {
			type: 'value',
			min: 'dataMin',
			max: 'dataMax',
		},
		series: [
			{
				type: 'line',
				data: data,
				showSymbol: false,
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
		dataZoom: [
			{
				type: 'inside',
				xAxisIndex: [0, 1],
				start: dataZoomRange[0],
				end: dataZoomRange[1],
				onZoom: handleZoomChange,
			},
		],
	}
}
