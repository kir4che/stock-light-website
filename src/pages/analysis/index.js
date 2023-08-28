import { useState } from 'react'
import AnalResult from '../../components/Analysis/AnalResult'
import Sidebar from '../../components/Analysis/Sidebar/Sidebar'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import { analEvent } from '../../data/analEvent.js'

export default function Analysis() {
	// 預設選單中的第一個選項
	const [active, setActive] = useState(1)

	const handleClickActive = (id) => setActive(id)

	return (
		<StarryBackground className='flex justify-between w-full gap-8 pb-20 pt-14 lg:gap-12'>
			<Sidebar active={active} handleClickActive={handleClickActive} />
			<AnalResult event={analEvent[active - 1]} />
		</StarryBackground>
	)
}
