import { MoonStarsFill, SunFill } from 'react-bootstrap-icons'
import { useDarkMode } from '../../../context/DarkModeContext'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { toggleDarkMode } = useDarkMode()

	return (
		<button className='hover:opacity-90' onClick={toggleDarkMode}>
			<div className='hidden dark:block'>
				<SunFill size={20} />
			</div>
			<div className='block dark:hidden'>
				<MoonStarsFill size={18} />
			</div>
		</button>
	)
}

export default DarkModeToggle
