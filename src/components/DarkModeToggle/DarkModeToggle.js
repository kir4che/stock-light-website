'use client'

import Image from 'next/image'
import { useDarkMode } from '../../context/DarkModeContext'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { isDarkMode, toggleDarkMode } = useDarkMode()

	return (
		<button className='p-1 rounded-full hover:bg-gray-500/10 dark:hover:hover:bg-white/10' onClick={toggleDarkMode}>
			{isDarkMode ? (
				<Image src='https://img.icons8.com/ios-filled/50/FFFFFF/sun--v1.png' width={20} height={20} alt='light icon' />
			) : (
				<Image
					src='https://img.icons8.com/sf-regular-filled/48/moon-symbol.png'
					width={20}
					height={20}
					alt='dark icon'
				/>
			)}
		</button>
	)
}

export default DarkModeToggle
