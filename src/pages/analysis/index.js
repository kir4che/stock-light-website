import { useState } from 'react'

import AnalResult from '@/components/Analysis/AnalResult'

export default function Analysis() {
	const analEvent = [
		{
			id: 1,
			category: '股票分析',
			icon: 'https://img.icons8.com/stickers/36/candle-sticks.png',
			tabs: [
				{
					label: '基本面－財務指標技術雷達',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '本益比成長',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '類股漲跌幅',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '策略部位旭日圖',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '技術面－獲取最新股市資訊',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: 'ＫＤ指標',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: 'ＲＳＩ模型',
					isExplain: false,
					explanation: '',
					data: [],
				},
			],
		},
		{
			id: 2,
			category: '天氣型態',
			icon: 'https://img.icons8.com/stickers/36/climate-change.png',
			tabs: [
				{
					label: '晴天',
					isExplain: true,
					explanation: '天空雲覆蓋率低於 40% 為晴天',
					data: [],
				},
				{
					label: '陰天',
					isExplain: true,
					explanation: '天空雲覆蓋率高於 90% 為陰天',
					data: [],
				},
				{
					label: '氣溫',
					isExplain: false,
					explanation: '',
					data: [
						24.2, 23.7, 23, 22.9, 23.4, 22.5, 29.1, 26.3, 29, 29.5, 27.8, 22.9, 22.2, 25.1, 26.6, 28.8, 29.4, 26.1,
						26.2, 28.2, 30.1, 29.2, 30.1, 29.3, 27.4, 29, 29.8, 29.9, 30.7, 30.2, 28.4, 27.6, 29.4, 29.2, 30.4, 31.6,
						31.3, 30.8, 31.2, 31.7, 31.1, 29.7, 29.4, 31.7, 32.6, 32, 30.9, 31.3, 30.7, 30.5, 30, 27.4, 29.5, 29.3, 30,
						31.1, 31.2, 30.9, 30.8, 30.5, 30.9, 30.3, 30.8, 30.2, 30.3, 32.1, 31.8, 31.6, 29.1, 30.9, 30.5, 30.8, 30.5,
						28, 26.6, 29.5, 27.2, 27.7, 27.5, 26, 26, 27.4, 27.5, 27.9, 27.8, 26.4, 25.9, 26.2, 26, 28.3, 28.9, 29.6,
						30, 29.6, 30.4, 29.4, 26.7, 25.5, 25.2, 21.2, 22.1, 23.1, 23.7, 23.1, 19.2, 21.2, 22.9, 24.4, 22.4, 22.1,
						23.9, 24.7, 23.8, 22.3, 20.9, 21.9, 23.4, 21.4, 22.7, 22.8, 26.1, 25.9, 26.1, 24.2, 25.5, 23.3, 24.3, 25.1,
						24.3, 25.8, 22.2, 20.8, 22.1, 25.5, 26.5, 19.6, 17.9, 19, 19.2, 17.6, 19.1, 18.7, 18.7, 16.4, 15.7, 14.7,
						16.6, 18.7, 14.8, 19.4, 15.8, 14.3, 12.1, 15.1, 16.5, 16.9, 16.4, 16.5, 16.1, 16.3, 19.3, 18.2, 20.3, 19.8,
						20.7, 21.5, 23.2, 12.8, 15.2, 14.7, 16.5, 17.6, 17.5, 17.5, 17.6, 18.8, 19.4, 18.5, 18.2, 20.8, 13.9, 12.8,
						15.9, 19, 15.3, 14.1, 16.3, 18.8, 17.3, 18.6, 16.7, 17.2, 18.9, 20.5, 20.3, 20, 21.6, 14.7, 18.8, 20.7,
						22.3, 22.3, 21.5, 24, 26.4, 25.1, 22.1, 17.1, 18, 20.7, 19.1, 18.6, 23.4, 17.6, 22.7, 24.4, 23.5, 25.8,
						25.8, 26.1, 27.1, 25.5, 22.9, 21.2, 21.2, 20, 18.8, 22.2, 25.1, 26.6, 28, 28.3, 29.4, 19.9, 20.7, 22.4,
						24.3, 24.7, 25.1, 26.9, 28.3, 29.9, 24.1,
					],
				},
				{
					label: '降雨量',
					isExplain: false,
					explanation: '',
					data: [],
				},
			],
		},
		{
			id: 3,
			category: '天文現象',
			icon: 'https://img.icons8.com/cotton/36/moon-satellite.png',
			tabs: [
				{
					label: '月相',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '星象',
					isExplain: false,
					explanation: '',
					data: [],
				},
			],
		},
		{
			id: 4,
			category: '人口結構',
			icon: 'https://img.icons8.com/stickers/36/crowd-skin-type-1.png',
			tabs: [
				{
					label: '新生兒',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '高齡人口',
					isExplain: false,
					explanation: '',
					data: [],
				},
			],
		},
		{
			id: 5,
			category: '節假日',
			icon: 'https://img.icons8.com/external-filled-outline-lima-studio/34/external-holiday-calendar-filled-outline-lima-studio.png',
			tabs: [
				{
					label: '元旦',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '清明節',
					isExplain: false,
					explanation: '',
					data: [],
				},
				{
					label: '端午節',
					isExplain: false,
					explanation: '',
					data: [],
				},
			],
		},
	]

	const [active, setActive] = useState(1) // 最低設定 1

	const handleClickActive = (eventId) => {
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
								<li key={event.id}>
									<button
										className={
											'flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-yellow-200/20 hover:border-primary_yellow ' +
											(active === event.id ? `bg-yellow-200/20 border-primary_yellow` : ``)
										}
										onClick={() => handleClickActive(event.id)}
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
