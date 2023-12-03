'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import DropMenu from '@/components/Light/DropMenu'
import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function Light() {
	const { data: session } = useSession()
	const router = useRouter()

	const uuid = uuidv4()

	const [hoveredCategory, setHoveredCategory] = useState(null)
	const handleCategoryHover = (category) => setHoveredCategory(category)

	useEffect(() => {
		if (!session) router.push('/login')
	}, [session])
	return (
		<StarryBackground className='min-h-screen pt-16'>
			{session && <DropMenu user={session.user} handleHover={handleCategoryHover} />}
			{session && (
				<LanternLayout>
					<Link href={`/light/光電業/checkout/${uuid}`}>
						<Lantern position='-top-2 -left-16' label='光電股' hovered={hoveredCategory === '光電業' ? true : false} />
					</Link>
					<Link href={`/light/其他/checkout/${uuid}`} className=''>
						<Lantern
							position='top-20 left-16 scale-[.65]'
							label='其他'
							hovered={hoveredCategory === '其他' ? true : false}
						/>
					</Link>
					<Link href={`/light/其他電子業/checkout/${uuid}`}>
						<Lantern
							position='top-48 -left-8'
							label='其他電子股'
							hovered={hoveredCategory === '其他電子業' ? true : false}
						/>
					</Link>
					<Link href={`/light/化學工業/checkout/${uuid}`}>
						<Lantern
							position='top-96 -left-20'
							label='化學工業股'
							hovered={hoveredCategory === '化學工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/塑膠工業/checkout/${uuid}`}>
						<Lantern position='top-80 left-28' label='塑膠股' hovered={hoveredCategory === '塑膠工業' ? true : false} />
					</Link>
					<Link href={`/light/半導體業/checkout/${uuid}`}>
						<Lantern
							position='top-[540px] left-0 scale-[.85]'
							label='半導體股'
							hovered={hoveredCategory === '半導體業' ? true : false}
						/>
					</Link>
					{/* --------- */}
					<Link href={`/light/居家生活/checkout/${uuid}`}>
						<Lantern
							position='top-4 left-52'
							label='居家生活股'
							hovered={hoveredCategory === '居家生活' ? true : false}
						/>
					</Link>
					<Link href={`/light/建材營造/checkout/${uuid}`}>
						<Lantern
							position='top-44 left-64'
							label='建材營造股'
							hovered={hoveredCategory === '建材營造' ? true : false}
						/>
					</Link>
					<Link href={`/light/數位雲端/checkout/${uuid}`}>
						<Lantern
							position='top-[420px] left-60 scale-[.6]'
							label='數位雲端股'
							hovered={hoveredCategory === '數位雲端' ? true : false}
						/>
					</Link>
					<Link href={`/light/食品工業/checkout/${uuid}`}>
						<Lantern
							position='top-[560px] left-48'
							label='食品股'
							hovered={hoveredCategory === '食品工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/橡膠工業/checkout/${uuid}`}>
						<Lantern position='-top-6 left-96' label='橡膠股' hovered={hoveredCategory === '橡膠工業' ? true : false} />
					</Link>
					<Link href={`/light/電腦及週邊設備業/checkout/${uuid}`}>
						<Lantern
							position='top-32 left-[420px]'
							label='電腦及週邊設備股'
							hovered={hoveredCategory === '電腦及週邊設備業' ? true : false}
						/>
					</Link>
					<Link href={`/light/水泥工業/checkout/${uuid}`}>
						<Lantern
							position='top-80 left-[400px]'
							label='水泥股'
							hovered={hoveredCategory === '水泥工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/汽車工業/checkout/${uuid}`}>
						<Lantern
							position='top-[525px] left-[360px]'
							label='汽車股'
							hovered={hoveredCategory === '汽車工業' ? true : false}
						/>
					</Link>
					{/* --------------- */}
					<Link href={`/light/油電燃氣業/checkout/${uuid}`}>
						<Lantern
							position='-right-10 -top-2'
							label='油電燃氣股'
							hovered={hoveredCategory === '油電燃氣業' ? true : false}
						/>
					</Link>
					<Link href={`/light/玻璃陶瓷/checkout/${uuid}`}>
						<Lantern
							position='-right-20 top-36'
							label='玻璃陶瓷股'
							hovered={hoveredCategory === '玻璃陶瓷' ? true : false}
						/>
					</Link>
					<Link href={`/light/生技醫療業/checkout/${uuid}`}>
						<Lantern
							position='-right-8 top-80'
							label='生技醫療股'
							hovered={hoveredCategory === '生技醫療業' ? true : false}
						/>
					</Link>
					<Link href={`/light/紡織纖維/checkout/${uuid}`}>
						<Lantern
							position='right-0 top-[560px]'
							label='紡織纖維股'
							hovered={hoveredCategory === '紡織纖維' ? true : false}
						/>
					</Link>
					<Link href={`/light/綠能環保/checkout/${uuid}`}>
						<Lantern
							position='right-32 top-16'
							label='綠能環保股'
							hovered={hoveredCategory === '綠能環保' ? true : false}
						/>
					</Link>
					<Link href={`/light/航運業/checkout/${uuid}`}>
						<Lantern position='right-24 top-56' label='航運股' hovered={hoveredCategory === '航運業' ? true : false} />
					</Link>
					<Link href={`/light/觀光餐旅/checkout/${uuid}`}>
						<Lantern
							position='right-40 top-96'
							label='觀光餐旅股'
							hovered={hoveredCategory === '觀光餐旅' ? true : false}
						/>
					</Link>
					<Link href={`/light/貿易百貨/checkout/${uuid}`}>
						<Lantern
							position='right-52 top-[540px]'
							label='貿易百貨股'
							hovered={hoveredCategory === '貿易百貨' ? true : false}
						/>
					</Link>
					<Link href={`/light/資訊服務業/checkout/${uuid}`}>
						<Lantern
							position='right-64 top-0'
							label='資訊服務股'
							hovered={hoveredCategory === '資訊服務業' ? true : false}
						/>
					</Link>
					<Link href={`/light/通信網路業/checkout/${uuid}`}>
						<Lantern
							position='right-60 top-52 scale-[.65]'
							label='通信網路股'
							hovered={hoveredCategory === '通信網路業' ? true : false}
						/>
					</Link>
					<Link href={`/light/造紙工業/checkout/${uuid}`}>
						<Lantern
							position='right-[400px] -top-4'
							label='造紙股'
							hovered={hoveredCategory === '造紙工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/運動休閒/checkout/${uuid}`}>
						<Lantern
							position='right-[370px] top-36 scale-[.75]'
							label='運動休閒股'
							hovered={hoveredCategory === '運動休閒' ? true : false}
						/>
					</Link>
					<Link href={`/light/金融保險業/checkout/${uuid}`}>
						<Lantern
							position='right-[420px] top-80'
							label='金融保險股'
							hovered={hoveredCategory === '金融保險業' ? true : false}
						/>
					</Link>
					<Link href={`/light/鋼鐵工業/checkout/${uuid}`}>
						<Lantern
							position='right-[385px] top-[480px]'
							label='鋼鐵股'
							hovered={hoveredCategory === '鋼鐵工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/電器電纜/checkout/${uuid}`}>
						<Lantern
							position='right-[525px] top-20 scale-[.65]'
							label='電器電纜股'
							hovered={hoveredCategory === '電器電纜' ? true : false}
						/>
					</Link>
					<Link href={`/light/電子通路業/checkout/${uuid}`}>
						<Lantern
							position='right-[560px] top-60 scale-[.7]'
							label='電子通路股'
							hovered={hoveredCategory === '電子通路業' ? true : false}
						/>
					</Link>
					<Link href={`/light/電子零組件業/checkout/${uuid}`}>
						<Lantern
							position='right-[540px] top-[420px]'
							label='電子零組件股'
							hovered={hoveredCategory === '電子零組件業' ? true : false}
						/>
					</Link>
					<Link href={`/light/電機機械/checkout/${uuid}`}>
						<Lantern
							position='right-[580px] top-[580px] scale-[.7]'
							label='電機機械股'
							hovered={hoveredCategory === '電機機械' ? true : false}
						/>
					</Link>
				</LanternLayout>
			)}
		</StarryBackground>
	)
}
