import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const INDUSTY_LIST = [
	'光電業',
	'其他',
	'其他電子業',
	'化學工業',
	'半導體業',
	'塑膠工業',
	'居家生活',
	'建材營造',
	'數位雲端',
	'橡膠工業',
	'水泥工業',
	'汽車工業',
	'油電燃氣業',
	'玻璃陶瓷',
	'生技醫療業',
	'紡織纖維',
	'綠能環保',
	'航運業',
	'觀光餐旅',
	'貿易百貨',
	'資訊服務業',
	'通信網路業',
	'造紙工業',
	'運動休閒',
	'金融保險業',
	'鋼鐵工業',
	'電器電纜',
	'電子通路業',
	'電子零組件業',
	'電機機械',
	'電腦及週邊設備業',
	'食品工業',
]
export default function DropMenu({ handleSelect }) {
	const uuid = uuidv4()
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		<>
			<div className='flex justify-center'>
				<button
					onClick={() => setMenuOpen(!menuOpen)}
					className={`absolute w-32 text-zinc-900 bg-amber-100 rounded-b-xl ${menuOpen ? 'top-9' : 'top-1'}`}
				>
					{menuOpen ? (
						<ExpandLessIcon />
					) : (
						<p className='flex items-center justify-center py-1 space-x-1'>
							<span className='text-sm font-semibold'>選擇產業別</span>
							<ExpandMoreIcon />
						</p>
					)}
				</button>
			</div>
			{menuOpen ? (
				<ul className='absolute top-0 left-0 flex justify-center w-full py-3 space-x-4 overflow-x-auto text-sm duration-150 ease-in-out bg-amber-100'>
					{INDUSTY_LIST.map((industry) => (
						<li
							onMouseEnter={() => handleSelect(industry)}
							onMouseLeave={() => handleSelect('')}
							className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
							key={industry}
						>
							{industry}
						</li>
					))}
				</ul>
			) : (
				<div className='absolute top-0 right-0 w-full h-2 bg-amber-100'></div>
			)}
		</>
	)
}
