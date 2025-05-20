import { useEffect, useState } from 'react'

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
			top: windowWidth > 1024
				? '14%'
				: windowWidth > 576
				? '16%'
				: '18%',
			left: unit.name === '千元'
				? windowWidth > 1024
					? '7%'
					: windowWidth > 768
					? '10%'
					: windowWidth > 576
					? '12%'
					: windowWidth > 480
					? '16%'
					: windowWidth > 414
					? '19%'
					: '24%'
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
			height: windowWidth > 1024
				? '70%'
				: windowWidth > 768
				? '64%'
				: windowWidth > 414
				? '60%'
				: '58%',
		},
		toolbox: {
			feature: {
				magicType: { show: windowWidth > 576, type: ['line', 'bar'] },
				restore: { show: windowWidth > 576 },
				saveAsImage: { show: true },
			},
			top: '1.5%',
			right: '0.5%',
		},
	}

	return option
}
