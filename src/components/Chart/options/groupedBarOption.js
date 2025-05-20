import { useEffect, useState } from 'react'

export function groupedBarOption(text, data, unit = { type: 'value' }) {
	const [windowWidth, setWindowWidth] = useState(0)

	useEffect(() => {
		if (typeof window !== "undefined") {
			setWindowWidth(window.innerWidth)
			window.addEventListener("resize", () => setWindowWidth(window.innerWidth))
		}

		return () => {
			if (typeof window !== "undefined")
				window.removeEventListener("resize", () => setWindowWidth(window.innerWidth))
		}
	}, [])
	
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
			top: windowWidth > 1024 ? '14%' : windowWidth > 576 ? '18%' : '20%',
			left:
				unit.name === '千元'
					? windowWidth > 1024
						? '8%'
						: windowWidth > 768
						? '10%'
						: windowWidth > 576
						? '12%'
						: windowWidth > 480
						? '14%'
						: windowWidth > 414
						? '18%'
						: '22%'
					: windowWidth > 1024
					? '5%'
					: windowWidth > 768
					? '6%'
					: windowWidth > 576
					? '8%'
					: windowWidth > 480
					? '10%'
					: windowWidth > 414
					? '12%'
					: '14%',
			right: windowWidth > 576 ? '3%' : '4%',
			height: windowWidth > 1024 ? '76%' : windowWidth > 768 ? '70%' : '68%',
		},
		toolbox: {
			feature: {
				magicType: { show: typeof window !== "undefined" && window.innerWidth > 576, type: ['line', 'bar'] },
				restore: { show: typeof window !== "undefined" && window.innerWidth > 576 },
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
	}

	return option
}
