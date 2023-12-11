export function multiLineOption(
	text,
	date,
	dataName,
	data,
	unit = {
		type: 'value',
		name: '%',
		alignTicks: true,
		axisLabel: {
			formatter: function (value) {
				return value.toLocaleString()
			},
		},
	}
) {
	if (!date) {
		console.error('date is required.')
		return {}
	} else if (!Array.isArray(data) || data.length === 0) {
		console.error('Invalid or empty data array.')
		return {}
	}

	const seriesData = data.map((item, index) => {
		if (Array.isArray(item) && item.length > 0) {
			return {
				name: dataName[index],
				type: 'line',
				data: item,
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
		yAxis: unit,
		series: seriesData,
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			valueFormatter: function (value) {
				return value.toLocaleString() + (unit.name === '%' ? '%' : unit.name === '千元' ? '元' : '次')
			},
		},
		grid: {
			top: '15%',
			left: '8%',
			right: '3%',
			height: '68%',
		},
		toolbox: {
			feature: {
				magicType: { show: true, type: ['line', 'bar'] },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
	}

	return option
}
