export default function Anal_Sidebar() {
	return (
		<div className='rounded bg-gray-50'>
			<div className='w-56 h-full'>
				<h4 className='flex items-center pl-6 font-medium border-b h-14'>股市預測</h4>
				<ul className='flex flex-col pt-4 pb-8 space-y-1.5'>
					<li>
						<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
							<img src='https://img.icons8.com/stickers/36/candle-sticks.png' alt='candle'></img>
							<span className='tracking-wider'>Ｋ線組合</span>
						</button>
					</li>
					<li>
						<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
							<img src='https://img.icons8.com/stickers/36/climate-change.png' alt='climate'></img>
							<span className='tracking-wider'>天氣型態</span>
						</button>
					</li>
					<li>
						<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
							<img src='https://img.icons8.com/cotton/36/moon-satellite.png' alt='moon'></img>
							<span className='tracking-wider'>月相預測</span>
						</button>
					</li>
					<li>
						<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
							<img src='https://img.icons8.com/stickers/36/multiple-stars.png' alt='star'></img>
							<span className='tracking-wider'>星體變化</span>
						</button>
					</li>
					<li>
						<button className='flex items-center w-full py-1.5 pl-4 space-x-2 border-l-4 border-transparent hover:bg-secondary_blue/10 hover:border-secondary_blue'>
							<img src='https://img.icons8.com/stickers/36/sea-waves.png' alt='sea-wave'></img>
							<span className='tracking-wider'>潮汐現象</span>
						</button>
					</li>
				</ul>
			</div>
		</div>
	)
}
