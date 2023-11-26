import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useState } from 'react'

export default function DropMenu({ user, handleHover }) {
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
				<ul className='absolute top-0 left-0 flex justify-center w-full py-3 pr-3 space-x-4 overflow-x-auto text-sm duration-150 ease-in-out md:space-x-8 bg-amber-100'>
					<li
						onMouseEnter={() => handleHover('水泥')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 pl-[100vw] xs:pl-[64vw] sm:pl-[28vw] lg:pl-0 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=水泥`}>水泥</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('食品')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=食品`}>食品</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('塑膠')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>塑膠</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('化學')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=化學`}>化學</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('生技醫療')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>生技醫療</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('鋼鐵')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>鋼鐵</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('汽車')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=汽車`}>汽車</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('電機')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=電機`}>電機</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('半導體')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=半導體`}>半導體</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('光電')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=光電`}>光電</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('資訊服務')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>資訊服務</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('電子零件')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>電子零件</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('航運')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=航運`}>航運</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('金融')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=金融`}>金融</Link>
					</li>
					<li
						onMouseEnter={() => handleHover('綠能環保')}
						onMouseLeave={() => handleHover(null)}
						className='whitespace-nowrap text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>綠能環保</Link>
					</li>
				</ul>
			) : (
				<div className='absolute top-0 right-0 w-full h-2 bg-amber-100'></div>
			)}
		</>
	)
}
