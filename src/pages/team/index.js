import { useState } from 'react'

export default function Team() {
	const members = [
		{ id: 1, name: '林禹辰', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 2, name: '葉柏賢', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 3, name: '翁智宏', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
		{ id: 4, name: '蘇昶諭', img: 'https://assets.codepen.io/152347/crooked-colours.jpg' },
	]

	const [activeId, setActiveId] = useState(null)

	return (
		<div className='container w-full mx-auto mt-12'>
			<div className='text-center'>
				<h3 className='mb-4 font-medium team-title'>開發團隊</h3>
				<p className='leading-7'>
					一群由臺北科技大學資訊與財金管理系的學生所組成的團隊
					<br />
					希望能夠藉由搜集台灣股市的歷史數據，分析各種可能性！
				</p>
			</div>
			<ul className='flex h-screen min-h-[750px] m-0 p-0 overflow-hidden w-full min-w-full flex-col lg:flex-row'>
				{members.map((member) => (
					<li class='flex w-[60vw] flex-row relative self-start'>
						<div class='flex flex-col'>
							<h3>{member.name}</h3>
							<p>
								We specialize in creating responsive designs that look great on desktop, tablet, and mobile devices,
								ensuring your site is accessible to all your visitors.
							</p>
						</div>
						<div class='visual'>
							<img
								src='https://images.unsplash.com/photo-1564460576398-ef55d99548b2?crop=entropy&cs=tinysrgb&fm=jpg&ixid=MnwzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NzgzMDU1NDY&ixlib=rb-4.0.3&q=80'
								alt=''
							/>
						</div>
					</li>
				))}
			</ul>
			<div className='text-center'>
				<h3 className='mb-4 font-medium '>本站所用技術</h3>
			</div>
		</div>
	)
}
