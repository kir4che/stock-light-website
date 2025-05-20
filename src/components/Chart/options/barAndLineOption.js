import { useState, useEffect } from 'react'

export function barAndLineOption(text, date, dataName, data) {
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
			top: windowWidth > 1024 ? '14%' : windowWidth > 576 ? '18%' : '20%',
			left: windowWidth > 1024
				? '8%'
				: windowWidth > 768
				? '10%'
				: windowWidth > 576
				? '12%'
				: windowWidth > 480
				? '14%'
				: windowWidth > 414
				? '18%'
				: '22%',
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
