// 折線圖
export function lineOption(data) {
	return {
		xAxis: {
			type: 'category',
			data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		},
		yAxis: {
			type: 'value',
		},
		series: [
			{
				data: data,
				type: 'line',
			},
		],
	}
}
