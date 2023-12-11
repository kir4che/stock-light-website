import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useState } from 'react'

import stock100 from '@/data/stock100.json'

export default function DropMenu({ handleSelect }) {
	const industries = Array.from(new Set(stock100.map((stock) => stock.industry)))
	const [menuOpen, setMenuOpen] = useState(false)

	return (
		industries && (
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
					<ul className='absolute top-0 left-0 inline-flex w-full pt-2.5 pb-3 pl-3 pr-5 space-x-4 overflow-x-auto text-sm duration-150 bg-amber-100'>
						{industries.map((industry) => (
							<li
								onMouseDown={() => handleSelect(industry)}
								className='cursor-pointer whitespace-nowrap text-amber-600 hover:underline'
								key={industry}
							>
								{industry}
							</li>
						))}
					</ul>
				) : (
					<div className='absolute top-0 right-0 w-full h-2 bg-amber-100' />
				)}
			</>
		)
	)
}
