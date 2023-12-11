'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import DropMenu from '@/components/Light/DropMenu'
import StarryBackground from '@/components/common/StarryBackground'
import { Lantern, LanternLayout } from '@/components/ui/Lantern'
import { getCurrentDate } from '@/utils/getCurrentDate'

export default function Light() {
	const { data: session, status } = useSession()
	const router = useRouter()
	const uuid = uuidv4()

	const [selectedIndustry, setSelectedIndustry] = useState('')
	const [success, setSuccess] = useState(false)

	const handleLightUp = (industry) => {
		setSelectedIndustry(industry)
		setSuccess(true)
	}

	useEffect(() => {
		if (status === 'unauthenticated') router.push('/login')
	}, [session])

	useEffect(() => {
		success &&
			setTimeout(() => {
				router.push(`/light/resultDashboard?industry=${selectedIndustry}&id=${uuid}&date=${getCurrentDate()}`)
			}, 3000)
	}, [success])

	return (
		<StarryBackground className='min-h-screen pt-16'>
			{success ? (
				<div className='glowing-circle-container'>
					<div className='glowing-circle' />
				</div>
			) : (
				<>
					{session && <DropMenu handleSelect={handleLightUp} />}
					{session && (
						<LanternLayout>
							<button type='button' onClick={() => handleLightUp('光電業')}>
								<Lantern
									position='-top-2 -left-16'
									label='光電股'
									hovered={selectedIndustry === '光電業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('其他')}>
								<Lantern
									position='top-20 left-16 scale-[.65]'
									label='其他'
									hovered={selectedIndustry === '其他' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('其他電子業')}>
								<Lantern
									position='top-48 -left-8'
									label='其他電子股'
									hovered={selectedIndustry === '其他電子業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('化學工業')}>
								<Lantern
									position='top-96 -left-20'
									label='化學工業股'
									hovered={selectedIndustry === '化學工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('塑膠工業')}>
								<Lantern
									position='top-80 left-28'
									label='塑膠股'
									hovered={selectedIndustry === '塑膠工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('半導體業')}>
								<Lantern
									position='top-[540px] left-0 scale-[.85]'
									label='半導體股'
									hovered={selectedIndustry === '半導體業' ? true : false}
								/>
							</button>
							{/* --------- */}
							<button type='button' onClick={() => handleLightUp('居家生活')}>
								<Lantern
									position='top-4 left-52'
									label='居家生活股'
									hovered={selectedIndustry === '居家生活' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('建材營造')}>
								<Lantern
									position='top-44 left-64'
									label='建材營造股'
									hovered={selectedIndustry === '建材營造' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('數位雲端')}>
								<Lantern
									position='top-[420px] left-60 scale-[.6]'
									label='數位雲端股'
									hovered={selectedIndustry === '數位雲端' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('食品工業')}>
								<Lantern
									position='top-[560px] left-48'
									label='食品股'
									hovered={selectedIndustry === '食品工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('橡膠工業')}>
								<Lantern
									position='-top-6 left-96'
									label='橡膠股'
									hovered={selectedIndustry === '橡膠工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('電腦及週邊設備業')}>
								<Lantern
									position='top-32 left-[420px]'
									label='電腦及週邊設備股'
									hovered={selectedIndustry === '電腦及週邊設備業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('水泥工業')}>
								<Lantern
									position='top-80 left-[400px]'
									label='水泥股'
									hovered={selectedIndustry === '水泥工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('汽車工業')}>
								<Lantern
									position='top-[525px] left-[360px]'
									label='汽車股'
									hovered={selectedIndustry === '汽車工業' ? true : false}
								/>
							</button>
							{/* --------------- */}
							<button type='button' onClick={() => handleLightUp('油電燃氣業')}>
								<Lantern
									position='-right-10 -top-2'
									label='油電燃氣股'
									hovered={selectedIndustry === '油電燃氣業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('玻璃陶瓷')}>
								<Lantern
									position='-right-20 top-36'
									label='玻璃陶瓷股'
									hovered={selectedIndustry === '玻璃陶瓷' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('生技醫療業')}>
								<Lantern
									position='-right-8 top-80'
									label='生技醫療股'
									hovered={selectedIndustry === '生技醫療業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('紡織纖維')}>
								<Lantern
									position='right-0 top-[560px]'
									label='紡織纖維股'
									hovered={selectedIndustry === '紡織纖維' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('航運業')}>
								<Lantern
									position='right-24 top-56'
									label='航運股'
									hovered={selectedIndustry === '航運業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('觀光餐旅')}>
								<Lantern
									position='right-40 top-96'
									label='觀光餐旅股'
									hovered={selectedIndustry === '觀光餐旅' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('貿易百貨')}>
								<Lantern
									position='right-52 top-[540px]'
									label='貿易百貨股'
									hovered={selectedIndustry === '貿易百貨' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('通信網路業')}>
								<Lantern
									position='right-60 top-52 scale-[.65]'
									label='通信網路股'
									hovered={selectedIndustry === '通信網路業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('運動休閒')}>
								<Lantern
									position='right-[370px] top-36 scale-[.75]'
									label='運動休閒股'
									hovered={selectedIndustry === '運動休閒' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('金融保險業')}>
								<Lantern
									position='right-[420px] top-80'
									label='金融保險股'
									hovered={selectedIndustry === '金融保險業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('鋼鐵工業')}>
								<Lantern
									position='right-[385px] top-[480px]'
									label='鋼鐵股'
									hovered={selectedIndustry === '鋼鐵工業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('電器電纜')}>
								<Lantern
									position='right-[525px] top-20 scale-[.65]'
									label='電器電纜股'
									hovered={selectedIndustry === '電器電纜' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('電子通路業')}>
								<Lantern
									position='right-[560px] top-60 scale-[.7]'
									label='電子通路股'
									hovered={selectedIndustry === '電子通路業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('電子零組件業')}>
								<Lantern
									position='right-[540px] top-[420px]'
									label='電子零組件股'
									hovered={selectedIndustry === '電子零組件業' ? true : false}
								/>
							</button>
							<button type='button' onClick={() => handleLightUp('電機機械')}>
								<Lantern
									position='right-[580px] top-[580px] scale-[.7]'
									label='電機機械股'
									hovered={selectedIndustry === '電機機械' ? true : false}
								/>
							</button>
						</LanternLayout>
					)}
				</>
			)}
		</StarryBackground>
	)
}
