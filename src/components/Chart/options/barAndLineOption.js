export function barAndLineOption(text, date, dataName, data) {
	if (!Array.isArray(data) || data.length === 0) {
		console.error('Invalid or empty data array.')
		return {}
	}

	const seriesData = data.map((item, index) => {
		if (Array.isArray(item) && item.length > 0) {
			return {
				name: dataName[index],
				type: index === 0 ? 'bar' : 'line',
				data: item,
				yAxisIndex: index === 0 ? 1 : 0,
			}
		} else {
			console.error(`Invalid data for ${dataName[index]}.`)
			return {}
		}
	})

	const option = {
		title: {
			text: text,
			left: 'center',
			top: '4%',
		},
		legend: {
			data: dataName,
			bottom: '4%',
		},
		xAxis: {
			type: 'category',
			data: date,
			axisLabel: {
				formatter: function (value) {
					return value.slice(0, 4)
				},
				interval: 3,
			},
		},
		yAxis: [
			{
				type: 'value',
				name: '次',
				alignTicks: true,
				axisLabel: {
					formatter: function (value) {
						return value.toLocaleString()
					},
				},
			},
			{
				type: 'value',
				name: '千元',
				alignTicks: true,
				axisLabel: {
					formatter: function (value) {
						return (value / 1000).toLocaleString()
					},
				},
			},
		],
		series: seriesData,
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
			left: '6%',
			right: '8%',
			height: '68%',
		},
	}

	return option
}
