import ReactEcharts from 'echarts-for-react'

import { useDarkMode } from '@/providers/DarkModeProvider'

export default function Chart({ option, customHeight = 'h-88 xl:h-[540px]' }) {
	const { isDarkMode } = useDarkMode()

	return (
		<ReactEcharts
			className={`border rounded shadow-md dark:border-zinc-800 ${customHeight} pl-2 md:pl-0`}
			option={option}
			theme={isDarkMode ? 'dark' : 'light'}
			style={{
				height: '100%',
				width: '100%',
			}}
		/>
	)
}
