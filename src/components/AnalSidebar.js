export default function AnalSidebar() {
	const categories = [
		{
			id: 1,
			title: 'Ｋ線組合',
			icon: 'https://img.icons8.com/stickers/36/candle-sticks.png',
		},
		{
			id: 2,
			title: '天氣型態',
			icon: 'https://img.icons8.com/stickers/36/climate-change.png',
		},
		{
			id: 3,
			title: '月相預測',
			icon: 'https://img.icons8.com/cotton/36/moon-satellite.png',
		},
		{
			id: 4,
			title: '星體變化',
			icon: 'https://img.icons8.com/stickers/36/multiple-stars.png',
		},
		{
			id: 5,
			title: '潮汐現象',
			icon: 'https://img.icons8.com/stickers/36/sea-waves.png',
		},
	]

	return (
		<div className='bg-white rounded'>
			<div className='w-56 h-full'>
				<h4 className='flex items-center pl-6 font-medium border-b h-14'>股市預測</h4>
				<ul className='flex flex-col pt-4 pb-8 space-y-1.5'>
					{categories.map((category) => (
						<li key={category.id}>
							<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
								<img src={category.icon} alt={category.title}></img>
								<span className='tracking-wider'>{category.title}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
