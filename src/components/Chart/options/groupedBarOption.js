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
			top: window.innerWidth > 1024 ? '14%' : window.innerWidth > 576 ? '18%' : '20%',
			left:
				unit.name === '千元'
					? window.innerWidth > 1024
						? '8%'
						: window.innerWidth > 768
						? '10%'
						: window.innerWidth > 576
						? '12%'
						: window.innerWidth > 480
						? '14%'
						: window.innerWidth > 414
						? '18%'
						: '22%'
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
