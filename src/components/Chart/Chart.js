import ReactEcharts from 'echarts-for-react'
import { useEffect, useState } from 'react'

export default function Chart({ stockSymbol, tab, option, customHeight = 'h-72 sm:h-88 xl:h-[480px]' }) {
	const [chartOption, setChartOption] = useState(null)

	useEffect(() => {
		setChartOption(option)
	}, [stockSymbol, tab, option])

	return (
		chartOption && (
			<ReactEcharts
				className={`pb-4 bg-white border rounded shadow-md dark:border-none dark:bg-zinc-900/60 ${customHeight}`}
				option={chartOption}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		)
	)
}
