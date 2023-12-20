'use client'

import { useSession } from 'next-auth/react'

import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'

export default function PrayBoard() {
	const { status } = useSession()

	return (
		<StarryBackground className='min-h-screen pt-16'>
			<LanternLayout>
				<button type='button'>
					<Lantern position='-top-2 -left-16' label='光電股' />
				</button>
				<button type='button'>
					<Lantern position='top-20 left-16 scale-[.65]' label='其他' />
				</button>
				<button type='button'>
					<Lantern position='top-48 -left-8' label='其他電子股' />
				</button>
				<button type='button'>
					<Lantern position='top-96 -left-20' label='化學工業股' />
				</button>
				<button type='button'>
					<Lantern position='top-80 left-28' label='塑膠股' />
				</button>
				<button type='button'>
					<Lantern position='top-[540px] left-0 scale-[.85]' label='半導體股' />
				</button>
				{/* --------- */}
				<button type='button'>
					<Lantern position='top-4 left-52' label='居家生活股' />
				</button>
				<button type='button'>
					<Lantern position='top-44 left-64' label='建材營造股' />
				</button>
				<button type='button'>
					<Lantern position='top-[420px] left-60 scale-[.6]' label='數位雲端股' />
				</button>
				<button type='button'>
					<Lantern position='top-[560px] left-48' label='食品股' />
				</button>
				<button type='button'>
					<Lantern position='-top-6 left-96' label='橡膠股' />
				</button>
				<button type='button'>
					<Lantern position='top-32 left-[420px]' label='電腦及週邊設備股' />
				</button>
				<button type='button'>
					<Lantern position='top-80 left-[400px]' label='水泥股' />
				</button>
				<button type='button'>
					<Lantern position='top-[525px] left-[360px]' label='汽車股' />
				</button>
				{/* --------------- */}
				<button type='button'>
					<Lantern position='-right-10 -top-2' label='油電燃氣股' />
				</button>
				<button type='button'>
					<Lantern position='-right-20 top-36' label='玻璃陶瓷股' />
				</button>
				<button type='button'>
					<Lantern position='-right-8 top-80' label='生技醫療股' />
				</button>
				<button type='button'>
					<Lantern position='right-0 top-[560px]' label='紡織纖維股' />
				</button>
				<button type='button'>
					<Lantern position='right-24 top-56' label='航運股' />
				</button>
				<button type='button'>
					<Lantern position='right-40 top-96' label='觀光餐旅股' />
				</button>
				<button type='button'>
					<Lantern position='right-52 top-[540px]' label='貿易百貨股' />
				</button>
				<button type='button'>
					<Lantern position='right-60 top-52 scale-[.65]' label='通信網路股' />
				</button>
				<button type='button'>
					<Lantern position='right-[370px] top-36 scale-[.75]' label='運動休閒股' />
				</button>
				<button type='button'>
					<Lantern position='right-[420px] top-80' label='金融保險股' />
				</button>
				<button type='button'>
					<Lantern position='right-[385px] top-[480px]' label='鋼鐵股' />
				</button>
				<button type='button'>
					<Lantern position='right-[525px] top-20 scale-[.65]' label='電器電纜股' />
				</button>
				<button type='button'>
					<Lantern position='right-[560px] top-60 scale-[.7]' label='電子通路股' />
				</button>
				<button type='button'>
					<Lantern position='right-[540px] top-[420px]' label='電子零組件股' />
				</button>
				<button type='button'>
					<Lantern position='right-[580px] top-[580px] scale-[.7]' label='電機機械股' />
				</button>
			</LanternLayout>
		</StarryBackground>
	)
}
