import AnalChart from '@/components/Analysis/AnalChart'
import AnalTable from '@/components/Analysis/AnalTable'

import SelectBox from '@/components/Analysis/SelectBox'
import Tooltip from '@/components/Analysis/Tooltip'
import { useEffect, useRef, useState } from 'react'

export default function AnalResult(props) {
	const event = props.event

	const [activeTabIndex, setActiveTabIndex] = useState(0)
	const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
	const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)

	const tabsRef = useRef([])

	useEffect(() => {
		function setTabPosition() {
			const currentTab = tabsRef.current[activeTabIndex]
			setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
			setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
		}

		setTabPosition()
		window.addEventListener('resize', setTabPosition)

		return () => window.removeEventListener('resize', setTabPosition)
	}, [activeTabIndex])

	return (
		<div className='px-3 pt-6 pb-16 mb-20 bg-white rounded w-[70vw]'>
			<div className='flex items-end mb-3 space-x-2 tracking-wider'>
				<h3 className='pl-3 font-medium'>{event.category}</h3>
				<p className='text-sm opacity-80'>
					{new Date().getFullYear()}/{new Date().getMonth() + 1}/{new Date().getDate()}
				</p>
			</div>
			<div className='relative px-2'>
				<div className='flex items-center justify-between pt-3 mb-4'>
					<div className='flex items-center'>
						{event.sub_category.map((tab, i) => {
							return (
								// 子類別選單
								<button
									className='flex items-center px-5 pb-2 space-x-1'
									key={i}
									ref={(el) => (tabsRef.current[i] = el)}
									onClick={() => setActiveTabIndex(i)}
								>
									<span>{tab.label}</span>
									<Tooltip isExplain={tab.isExplain} explanation={tab.explanation}>
										<svg
											className={`${tab.isExplain ? '' : 'hidden'}`}
											xmlns='http://www.w3.org/2000/svg'
											fill-opacity='65%'
											x='0'
											y='0'
											width='17'
											height='17'
											viewBox='0 0 48 48'
										>
											<path d='M 24 4 C 12.972066 4 4 12.972074 4 24 C 4 35.027926 12.972066 44 24 44 C 35.027934 44 44 35.027926 44 24 C 44 12.972074 35.027934 4 24 4 z M 24 7 C 33.406615 7 41 14.593391 41 24 C 41 33.406609 33.406615 41 24 41 C 14.593385 41 7 33.406609 7 24 C 7 14.593391 14.593385 7 24 7 z M 24 14 A 2 2 0 0 0 24 18 A 2 2 0 0 0 24 14 z M 23.976562 20.978516 A 1.50015 1.50015 0 0 0 22.5 22.5 L 22.5 33.5 A 1.50015 1.50015 0 1 0 25.5 33.5 L 25.5 22.5 A 1.50015 1.50015 0 0 0 23.976562 20.978516 z'></path>
										</svg>
									</Tooltip>
								</button>
							)
						})}
					</div>
					<SelectBox />
				</div>
				<span
					className='absolute bottom-0 block h-1 transition-all duration-300 bg-secondary_blue'
					style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
				/>
			</div>
			<AnalChart />
			<div className='px-5 mt-6 space-y-5'>
				<AnalTable />
				<p className='text-sm text-right opacity-80'>※ 所有結果皆來自歷史數據所反映</p>
			</div>
		</div>
	)
}
