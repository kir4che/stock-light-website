import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { industryList } from '@/data/constants'

export default function DropMenu({ user, handleHover }) {
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
					{industryList.map((industry) => (
						<li
							onMouseEnter={() => handleHover(industry)}
							onMouseLeave={() => handleHover(null)}
							className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
							key={industry}
						>
							<Link href={`/light/${industry}/checkout/${uuid}`}>{industry}</Link>
						</li>
					))}
				</ul>
			) : (
				<div className='absolute top-0 right-0 w-full h-2 bg-amber-100'></div>
			)}
		</>
	)
}
