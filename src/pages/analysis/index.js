import { useState } from 'react'
import Result from '../../components/Analysis/Result/Result'
import Sidebar from '../../components/Analysis/Sidebar/Sidebar'
import StarryBackground from '../../components/StarryBackground/StarryBackground'
import { analEvent } from '../../data/analEvent.js'
import '../../styles/Analysis.css'

export default function Analysis() {
	// 預設選單中的第一個選項
	const [active, setActive] = useState(1)

	const handleClickActive = (tabIndex) => setActive(tabIndex)

	return (
		<StarryBackground className={'w-full pt-8 pb-12 md:pb-20 md:gap-8 md:flex md:justify-between md:pt-14 lg:gap-12'}>
			<Sidebar active={active} handleClickActive={handleClickActive} />
			<Result event={analEvent[active - 1]} />
		</StarryBackground>
	)
}
