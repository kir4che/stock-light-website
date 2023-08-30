// chartOptions.js
export const getLinearRegOption = (title, xData, yData, regressionMethod) => {
	return {
		backgroundColor: '',
		title: {
			text: title,
			top: 20,
			left: 'center',
			textStyle: {
				color: '#252525',
				fontSize: '1.2rem',
			},
		},
		dataset: [
			{
				source: [
					...xData.map((x, i) => {
						yData && [x, yData[i]]
					}),
				],
			},
			{
				transform: {
					type: 'ecStat:regression',
					config: { method: regressionMethod, formulaOn: 'end' },
				},
			},
		],
		tooltip: {
			trigger: 'axis',
		},
		xAxis: {
			type: 'value',
			scale: true,
		},
		yAxis: {
			type: 'value',
			name: '收盤價',
			scale: true,
		},
		series: [
			{
				name: '',
				type: 'scatter',
			},
			{
				name: 'line',
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
			x: 56,
			y: 72,
			x2: 24,
			y2: 45,
		},
	}
}
