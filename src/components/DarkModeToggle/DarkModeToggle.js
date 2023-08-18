'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useDarkMode } from '../../context/DarkModeContext'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { toggleDarkMode } = useDarkMode()

	return (
		<button className='p-1 rounded-full hover:bg-gray-500/10 dark:hover:hover:bg-white/10' onClick={toggleDarkMode}>
			<div className='hidden dark:block'>
				<WbSunnyIcon />
			</div>
			<div className='block dark:hidden'>
				<DarkModeIcon />
			</div>
		</button>
	)
}

export default DarkModeToggle
