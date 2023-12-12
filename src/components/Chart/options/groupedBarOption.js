export function groupedBarOption(text, data, unit = { type: 'value' }) {
	if (!data) {
		console.error('data is required.')
		return {}
	}

	// 最後一年度尚無第四季度資料，補上空值
	if (data[data.length - 1].length < 5) data[data.length - 1].push('-')

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
		yAxis: unit,
		series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			valueFormatter: function (value) {
				return value?.toLocaleString() + '元'
			},
		},
		grid: {
			top: '15%',
			left: '8%',
			right: '3%',
			height: '75%',
		},
		toolbox: {
			feature: {
				magicType: { show: true, type: ['line', 'bar'] },
				restore: { show: true },
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
	}

	return option
}
