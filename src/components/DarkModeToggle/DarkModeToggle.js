'use client'

import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { useDarkMode } from '../../context/DarkModeContext'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { toggleDarkMode } = useDarkMode()

	return (
		<button className='hover:opacity-90' onClick={toggleDarkMode}>
			<div className='hidden dark:block'>
				<WbSunnyIcon fontSize='small' />
			</div>
			<div className='block dark:hidden'>
				<DarkModeIcon fontSize='small' />
			</div>
		</button>
	)
}

export default DarkModeToggle
