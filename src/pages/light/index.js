import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

export async function getServerSideProps(ctx) {
	const session = await getServerAuthSession(ctx)
	if (!session) return { redirect: { destination: `/login`, permanent: false } }
	else return { props: { user: session.user } }
}

export default function Light({ user }) {
	const [menuOpen, setMenuOpen] = useState(false)
	const [hoveredCategory, setHoveredCategory] = useState(null)

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const handleCategoryHover = (category) => setHoveredCategory(category)

	return (
		<StarryBackground className={'pt-16 min-h-screen'}>
			<div className='flex justify-center'>
				<button
					onClick={toggleMenu}
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
				<ul className='absolute top-0 right-0 flex justify-center w-full py-3 space-x-8 text-sm duration-150 ease-in-out bg-amber-100'>
					<li
						onMouseEnter={() => handleCategoryHover('水泥')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=水泥`}>水泥</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('食品')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=食品`}>食品</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('塑膠')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>塑膠</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('化學')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=化學`}>化學</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('生技醫療')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>生技醫療</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('鋼鐵')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>鋼鐵</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('汽車')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=汽車`}>汽車</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('電機')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=電機`}>電機</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('半導體')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=半導體`}>半導體</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('光電')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=光電`}>光電</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('資訊服務')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>資訊服務</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('電子零件')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>電子零件</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('航運')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=航運`}>航運</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('金融')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=金融`}>金融</Link>
					</li>
					<li
						onMouseEnter={() => handleCategoryHover('綠能環保')}
						onMouseLeave={() => handleCategoryHover(null)}
						className='text-amber-500 hover:text-zinc-900'
					>
						<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>綠能環保</Link>
					</li>
				</ul>
			) : (
				<div className='absolute top-0 right-0 w-full h-2 bg-amber-100'></div>
			)}
			<LanternLayout>
				<Link href={`/light/checkout?id=${user.id}&category=水泥`}>
					<Lantern position={'top-96'} label={'水泥股'} hovered={hoveredCategory === '水泥' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=食品`}>
					<Lantern
						position={'left-[500px] top-72'}
						label={'食品股'}
						hovered={hoveredCategory === '食品' ? true : false}
					/>
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${user.id}&category=塑膠`}>
						<Lantern
							position={'left-[290px] top-64'}
							label={'塑膠股'}
							hovered={hoveredCategory === '塑膠' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=化學`}>
					<Lantern position={'right-0 top-32'} label={'化學股'} hovered={hoveredCategory === '化學' ? true : false} />
				</Link>
				<div className='scale-75'>
					<Link href={`/light/checkout?id=${user.id}&category=生技醫療`}>
						<Lantern
							position={'right-40 top-4'}
							label={'生技醫療股'}
							hovered={hoveredCategory === '生技醫療' ? true : false}
						/>
					</Link>
				</div>
				<div className='scale-[85%]'>
					<Link href={`/light/checkout?id=${user.id}&category=鋼鐵`}>
						<Lantern
							position={'right-80 top-[460px]'}
							label={'鋼鐵股'}
							hovered={hoveredCategory === '鋼鐵' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=汽車`}>
					<Lantern
						position={'right-56 top-[530px]'}
						label={'汽車股'}
						hovered={hoveredCategory === '汽車' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=電機`}>
					<Lantern position={'left-12 top-40'} label={'電機股'} hovered={hoveredCategory === '電機' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=半導體`}>
					<Lantern
						position={'right-[420px] top-36'}
						label={'半導體股'}
						hovered={hoveredCategory === '半導體' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=光電`}>
					<Lantern
						position={'left-[430px] top-[485px]'}
						label={'光電股'}
						hovered={hoveredCategory === '光電' ? true : false}
					/>
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${user.id}&category=資訊服務`}>
						<Lantern
							position={'left-48 top-10'}
							label={'資訊服務股'}
							hovered={hoveredCategory === '資訊服務' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${user.id}&category=電子零件`}>
					<Lantern
						position={'left-48 top-[550px]'}
						label={'電子零件股'}
						hovered={hoveredCategory === '電子零件' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=航運`}>
					<Lantern position={'right-20 top-80'} label={'航運股'} hovered={hoveredCategory === '航運' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${user.id}&category=金融`}>
					<Lantern
						position={'-right-12 top-[500px]'}
						label={'金融股'}
						hovered={hoveredCategory === '金融' ? true : false}
					/>
				</Link>
				<div className='scale-[80%]'>
					<Link href={`/light/checkout?id=${user.id}&category=綠能環保`}>
						<Lantern
							position={'-left-56 top-20'}
							label={'綠能環保股'}
							hovered={hoveredCategory === '綠能環保' ? true : false}
						/>
					</Link>
				</div>
			</LanternLayout>
		</StarryBackground>
	)
}
