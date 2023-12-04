'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import DropMenu from '@/components/Light/DropMenu'
import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function Light() {
	const { data: session, status } = useSession()
	const router = useRouter()

	const [hoveredIndustry, setHoveredIndustry] = useState(null)
	const handleIndustryHover = (industry) => setHoveredIndustry(industry)

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login')
	}, [session])
	return (
		<StarryBackground className='min-h-screen pt-16'>
			{session && <DropMenu user={session.user} handleHover={handleIndustryHover} />}
			{session && (
				<LanternLayout>
					<Link href={`/light/checkout?industry=光電業`}>
						<Lantern position='-top-2 -left-16' label='光電股' hovered={hoveredIndustry === '光電業' ? true : false} />
					</Link>
					<Link href={`/light/checkout?industry=其他`} className=''>
						<Lantern
							position='top-20 left-16 scale-[.65]'
							label='其他'
							hovered={hoveredIndustry === '其他' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=其他電子業`}>
						<Lantern
							position='top-48 -left-8'
							label='其他電子股'
							hovered={hoveredIndustry === '其他電子業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=化學工業`}>
						<Lantern
							position='top-96 -left-20'
							label='化學工業股'
							hovered={hoveredIndustry === '化學工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=塑膠工業`}>
						<Lantern position='top-80 left-28' label='塑膠股' hovered={hoveredIndustry === '塑膠工業' ? true : false} />
					</Link>
					<Link href={`/light/checkout?industry=半導體業`}>
						<Lantern
							position='top-[540px] left-0 scale-[.85]'
							label='半導體股'
							hovered={hoveredIndustry === '半導體業' ? true : false}
						/>
					</Link>
					{/* --------- */}
					<Link href={`/light/checkout?industry=居家生活`}>
						<Lantern
							position='top-4 left-52'
							label='居家生活股'
							hovered={hoveredIndustry === '居家生活' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=建材營造`}>
						<Lantern
							position='top-44 left-64'
							label='建材營造股'
							hovered={hoveredIndustry === '建材營造' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=數位雲端`}>
						<Lantern
							position='top-[420px] left-60 scale-[.6]'
							label='數位雲端股'
							hovered={hoveredIndustry === '數位雲端' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=食品工業`}>
						<Lantern
							position='top-[560px] left-48'
							label='食品股'
							hovered={hoveredIndustry === '食品工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=橡膠工業`}>
						<Lantern position='-top-6 left-96' label='橡膠股' hovered={hoveredIndustry === '橡膠工業' ? true : false} />
					</Link>
					<Link href={`/light/checkout?industry=電腦及週邊設備業`}>
						<Lantern
							position='top-32 left-[420px]'
							label='電腦及週邊設備股'
							hovered={hoveredIndustry === '電腦及週邊設備業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=水泥工業`}>
						<Lantern
							position='top-80 left-[400px]'
							label='水泥股'
							hovered={hoveredIndustry === '水泥工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=汽車工業`}>
						<Lantern
							position='top-[525px] left-[360px]'
							label='汽車股'
							hovered={hoveredIndustry === '汽車工業' ? true : false}
						/>
					</Link>
					{/* --------------- */}
					<Link href={`/light/checkout?industry=油電燃氣業`}>
						<Lantern
							position='-right-10 -top-2'
							label='油電燃氣股'
							hovered={hoveredIndustry === '油電燃氣業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=玻璃陶瓷`}>
						<Lantern
							position='-right-20 top-36'
							label='玻璃陶瓷股'
							hovered={hoveredIndustry === '玻璃陶瓷' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=生技醫療業`}>
						<Lantern
							position='-right-8 top-80'
							label='生技醫療股'
							hovered={hoveredIndustry === '生技醫療業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=紡織纖維`}>
						<Lantern
							position='right-0 top-[560px]'
							label='紡織纖維股'
							hovered={hoveredIndustry === '紡織纖維' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=綠能環保`}>
						<Lantern
							position='right-32 top-16'
							label='綠能環保股'
							hovered={hoveredIndustry === '綠能環保' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=航運業`}>
						<Lantern position='right-24 top-56' label='航運股' hovered={hoveredIndustry === '航運業' ? true : false} />
					</Link>
					<Link href={`/light/checkout?industry=觀光餐旅`}>
						<Lantern
							position='right-40 top-96'
							label='觀光餐旅股'
							hovered={hoveredIndustry === '觀光餐旅' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=貿易百貨`}>
						<Lantern
							position='right-52 top-[540px]'
							label='貿易百貨股'
							hovered={hoveredIndustry === '貿易百貨' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=資訊服務業`}>
						<Lantern
							position='right-64 top-0'
							label='資訊服務股'
							hovered={hoveredIndustry === '資訊服務業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=通信網路業`}>
						<Lantern
							position='right-60 top-52 scale-[.65]'
							label='通信網路股'
							hovered={hoveredIndustry === '通信網路業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=造紙工業`}>
						<Lantern
							position='right-[400px] -top-4'
							label='造紙股'
							hovered={hoveredIndustry === '造紙工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=運動休閒`}>
						<Lantern
							position='right-[370px] top-36 scale-[.75]'
							label='運動休閒股'
							hovered={hoveredIndustry === '運動休閒' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=金融保險業`}>
						<Lantern
							position='right-[420px] top-80'
							label='金融保險股'
							hovered={hoveredIndustry === '金融保險業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=鋼鐵工業`}>
						<Lantern
							position='right-[385px] top-[480px]'
							label='鋼鐵股'
							hovered={hoveredIndustry === '鋼鐵工業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=電器電纜`}>
						<Lantern
							position='right-[525px] top-20 scale-[.65]'
							label='電器電纜股'
							hovered={hoveredIndustry === '電器電纜' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=電子通路業`}>
						<Lantern
							position='right-[560px] top-60 scale-[.7]'
							label='電子通路股'
							hovered={hoveredIndustry === '電子通路業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=電子零組件業`}>
						<Lantern
							position='right-[540px] top-[420px]'
							label='電子零組件股'
							hovered={hoveredIndustry === '電子零組件業' ? true : false}
						/>
					</Link>
					<Link href={`/light/checkout?industry=電機機械`}>
						<Lantern
							position='right-[580px] top-[580px] scale-[.7]'
							label='電機機械股'
							hovered={hoveredIndustry === '電機機械' ? true : false}
						/>
					</Link>
				</LanternLayout>
			)}
		</StarryBackground>
	)
}
