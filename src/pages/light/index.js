'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import DropMenu from '@/components/Light/DropMenu'
import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function Light() {
	const { data: session } = useSession()
	const router = useRouter()

	const [hoveredCategory, setHoveredCategory] = useState(null)
	const handleCategoryHover = (category) => setHoveredCategory(category)

	useEffect(() => {
		if (!session) router.push('/login')
	}, [session])

	return (
		<StarryBackground className={'pt-16 min-h-screen'}>
			<DropMenu user={session.user} handleHover={handleCategoryHover} />
			<LanternLayout>
				<Link href={`/light/checkout?id=${session.user.id}&category=水泥`}>
					<Lantern position={'top-96'} label={'水泥股'} hovered={hoveredCategory === '水泥' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=食品`}>
					<Lantern
						position={'left-[500px] top-72'}
						label={'食品股'}
						hovered={hoveredCategory === '食品' ? true : false}
					/>
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${session.user.id}&category=塑膠`}>
						<Lantern
							position={'left-[290px] top-64'}
							label={'塑膠股'}
							hovered={hoveredCategory === '塑膠' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${session.user.id}&category=化學`}>
					<Lantern position={'right-0 top-32'} label={'化學股'} hovered={hoveredCategory === '化學' ? true : false} />
				</Link>
				<div className='scale-75'>
					<Link href={`/light/checkout?id=${session.user.id}&category=生技醫療`}>
						<Lantern
							position={'right-40 top-4'}
							label={'生技醫療股'}
							hovered={hoveredCategory === '生技醫療' ? true : false}
						/>
					</Link>
				</div>
				<div className='scale-[85%]'>
					<Link href={`/light/checkout?id=${session.user.id}&category=鋼鐵`}>
						<Lantern
							position={'right-80 top-[460px]'}
							label={'鋼鐵股'}
							hovered={hoveredCategory === '鋼鐵' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${session.user.id}&category=汽車`}>
					<Lantern
						position={'right-56 top-[530px]'}
						label={'汽車股'}
						hovered={hoveredCategory === '汽車' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=電機`}>
					<Lantern position={'left-20 top-40'} label={'電機股'} hovered={hoveredCategory === '電機' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=半導體`}>
					<Lantern
						position={'right-[420px] top-36'}
						label={'半導體股'}
						hovered={hoveredCategory === '半導體' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=光電`}>
					<Lantern
						position={'left-[430px] top-[485px]'}
						label={'光電股'}
						hovered={hoveredCategory === '光電' ? true : false}
					/>
				</Link>
				<div className='scale-90'>
					<Link href={`/light/checkout?id=${session.user.id}&category=資訊服務`}>
						<Lantern
							position={'left-48 top-10'}
							label={'資訊服務股'}
							hovered={hoveredCategory === '資訊服務' ? true : false}
						/>
					</Link>
				</div>
				<Link href={`/light/checkout?id=${session.user.id}&category=電子零件`}>
					<Lantern
						position={'left-48 top-[550px]'}
						label={'電子零件股'}
						hovered={hoveredCategory === '電子零件' ? true : false}
					/>
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=航運`}>
					<Lantern position={'right-20 top-80'} label={'航運股'} hovered={hoveredCategory === '航運' ? true : false} />
				</Link>
				<Link href={`/light/checkout?id=${session.user.id}&category=金融`}>
					<Lantern
						position={'-right-12 top-[500px]'}
						label={'金融股'}
						hovered={hoveredCategory === '金融' ? true : false}
					/>
				</Link>
				<div className='scale-[80%]'>
					<Link href={`/light/checkout?id=${session.user.id}&category=綠能環保`}>
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
