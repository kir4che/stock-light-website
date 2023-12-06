export function groupedBarOption(text, data) {
	if (!data) {
		console.error('data is required.')
		return {}
	}

	const option = {
		title: {
			text: text,
			left: 'center',
			top: '4%',
		},
		dataset: {
			source: data,
		},
		xAxis: [{ type: 'category' }, { type: 'category' }],
		yAxis: {
			type: 'value',
		},
		series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
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
		grid: {
			top: '15%',
			left: '8%',
			right: '3%',
			height: '75%',
		},
	}

	return option
}
