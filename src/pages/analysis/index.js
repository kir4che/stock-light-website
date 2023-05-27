import AnalResult from '@/components/Analysis/AnalResult'

import { useState } from 'react'

const analEvent = [
	{
		id: 1,
		category: 'Ｋ線組合',
		icon: 'https://img.icons8.com/stickers/36/candle-sticks.png',
		sub_category: [],
	},
	{
		id: 2,
		category: '天氣型態',
		icon: 'https://img.icons8.com/stickers/36/climate-change.png',
		sub_category: [
			{
				label: '晴天',
				isExplain: true,
				explanation: '天空雲覆蓋率低於 40% 為晴天',
			},
			{
				label: '陰天',
				isExplain: true,
				explanation: '天空雲覆蓋率高於 90% 為陰天',
			},
			{
				label: '氣溫',
				isExplain: false,
				explanation: '',
			},
			{
				label: '降雨量',
				isExplain: false,
				explanation: '',
			},
			{
				label: '紫外線',
				isExplain: false,
				explanation: '',
			},
		],
	},
	{
		id: 3,
		category: '天文現象',
		icon: 'https://img.icons8.com/cotton/36/moon-satellite.png',
		sub_category: [
			{
				label: '月相',
				isExplain: false,
				explanation: '',
			},
			{
				label: '星象',
				isExplain: false,
				explanation: '',
			},
		],
	},
	{
		id: 4,
		category: '人口成長',
		icon: 'https://img.icons8.com/stickers/36/crowd-skin-type-1.png',
		sub_category: [],
	},
	{
		id: 5,
		category: '節假日',
		icon: 'https://img.icons8.com/external-filled-outline-lima-studio/34/external-holiday-calendar-filled-outline-lima-studio.png',
		sub_category: [],
	},
]

export default function Analysis() {
	const [active, setActive] = useState(2)

	const handleClick = (eventId) => {
		setActive(eventId)
	}

	return (
		<div id='stars-background-container'>
			<div className='container flex w-full pt-20 mx-auto space-x-6 pb-36'>
				<div>
					<div className='w-56 bg-white rounded'>
						<h4 className='flex items-center pl-6 font-medium border-b h-14'>股市預測</h4>
						<ul className='flex flex-col pt-4 pb-8 space-y-1.5'>
							{analEvent.map((event) => (
								<li key={event.id} className=''>
									<button
										className={
											'flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-yellow-200/20 hover:border-primary_yellow ' +
											(active === event.id ? `bg-yellow-200/20 border-primary_yellow` : ``)
										}
										onClick={() => handleClick(event.id)}
									>
										<img src={event.icon} alt={event.category}></img>
										<span className='tracking-wider'>{event.category}</span>
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
				<AnalResult event={analEvent[active - 1]} />
			</div>
			<div className='stars'></div>
			<div className='twinkling'></div>
			<div className='clouds'></div>
		</div>
	)
}
