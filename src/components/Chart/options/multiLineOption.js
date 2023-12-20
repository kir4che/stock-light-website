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
			bottom: '3%',
			type: 'scroll',
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
				return isNaN(value)
					? '－'
					: parseFloat(value).toLocaleString() +
							(unit.name === '%' ? '%' : unit.name === '千元' || unit.name === '元' ? '元' : '次')
			},
		},
		grid: {
			top: window.innerWidth > 1024 ? '14%' : window.innerWidth > 576 ? '16%' : '18%',
			left:
				unit.name === '千元'
					? window.innerWidth > 1024
						? '7%'
						: window.innerWidth > 768
						? '10%'
						: window.innerWidth > 576
						? '12%'
						: window.innerWidth > 480
						? '16%'
						: window.innerWidth > 414
						? '19%'
						: '24%'
					: window.innerWidth > 1024
					? '5%'
					: window.innerWidth > 768
					? '6%'
					: window.innerWidth > 576
					? '8%'
					: window.innerWidth > 480
					? '10%'
					: window.innerWidth > 414
					? '12%'
					: '14%',
			right: window.innerWidth > 576 ? '3%' : '4%',
			height:
				window.innerWidth > 1024 ? '70%' : window.innerWidth > 768 ? '64%' : window.innerWidth > 414 ? '60%' : '58%',
		},
		toolbox: {
			feature: {
				magicType: { show: window.innerWidth > 576, type: ['line', 'bar'] },
				restore: { show: window.innerWidth > 576 },
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
	}

	return option
}
