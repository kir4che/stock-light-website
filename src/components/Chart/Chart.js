import { useDarkMode } from '@/providers/DarkModeProvider'
import ReactEcharts from 'echarts-for-react'

export default function Chart({ option, customHeight = 'h-88 xl:h-[540px]' }) {
	const { isDarkMode } = useDarkMode()
	return (
		<ReactEcharts
			id='echart'
			className={`border rounded shadow-md dark:border-zinc-800 ${customHeight} pl-2 md:pl-0`}
			option={option}
			theme={isDarkMode ? 'dark' : 'light'}
			style={{
				height: '100%',
				width: '100%',
			}}
			notMerge={true}
			lazyUpdate={false}
		/>
	)
}
