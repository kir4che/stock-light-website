import ReactEcharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

export default function Chart({ stockSymbol, tab, option }) {
	const [chartOption, setChartOption] = useState(null)

	useEffect(() => {
		setChartOption(option)
	}, [stockSymbol, tab, option])

	return (
		chartOption && (
			<ReactEcharts
				className='bg-white pb-4 h-72 sm:h-88 xl:h-[480px] border rounded dark:border-none shadow-md dark:bg-zinc-900/60'
				option={chartOption}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		)
	)
}
