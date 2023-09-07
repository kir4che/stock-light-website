import ReactEcharts from 'echarts-for-react'
import { useDarkMode } from '../../providers/DarkModeProvider'

export default function Chart({ option, customHeight = 'h-72 sm:h-88 xl:h-[520px]' }) {
	const { isDarkMode } = useDarkMode()

	return (
		<ReactEcharts
			className={`border rounded shadow-md dark:border-zinc-800 ${customHeight}`}
			option={option}
			theme={isDarkMode ? 'dark' : 'light'}
			style={{
				height: '100%',
				width: '100%',
			}}
		/>
	)
}
