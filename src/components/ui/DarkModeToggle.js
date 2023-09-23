import DarkModeIcon from '@mui/icons-material/DarkMode'
import WbSunnyIcon from '@mui/icons-material/WbSunny'

import { useDarkMode } from '@/providers/DarkModeProvider'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { toggleDarkMode } = useDarkMode()

	return (
		<button className='hover:opacity-90' onClick={toggleDarkMode}>
			<div className='hidden dark:block'>
				<WbSunnyIcon className='dark:text-white' />
			</div>
			<div className='block dark:hidden'>
				<DarkModeIcon />
			</div>
		</button>
	)
}

export default DarkModeToggle
