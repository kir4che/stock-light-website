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
		},
		grid: {
			top: window.innerWidth > 1024 ? '14%' : window.innerWidth > 576 ? '18%' : '20%',
			left:
				window.innerWidth > 1024
					? '8%'
					: window.innerWidth > 768
					? '10%'
					: window.innerWidth > 576
					? '12%'
					: window.innerWidth > 480
					? '14%'
					: window.innerWidth > 414
					? '18%'
					: '22%',
			right: window.innerWidth > 576 ? '3%' : '4%',
			height: window.innerWidth > 1024 ? '76%' : window.innerWidth > 768 ? '70%' : '68%',
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
