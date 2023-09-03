// 面積折線圖
export function areaLineOption(data) {
	return {
		backgroundColor: '',
		dataset: {
			source: data,
		},
		xAxis: {
			type: 'time',
		},
		yAxis: {
			type: 'value',
			name: '指數',
			min: function (value) {
				return Math.floor((value.min - 100) / 100) * 100
			},
		},
		series: [
			{
				type: 'line',
				color: '#4FBAFF',
				symbol: 'none',
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
		],
		grid: {
			x: 64, // 左側間距
			y: 42, // 上側間距
			x2: 32, // 右側間距
			y2: 98, // 下側間距
		},
		dataZoom: [
			{
				type: 'slider',
				height: 45,
				bottom: 20,
			},
		],
	}
}
